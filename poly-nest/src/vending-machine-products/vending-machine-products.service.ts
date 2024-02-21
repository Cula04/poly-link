import { Injectable, Logger } from '@nestjs/common';
import {
  addDays,
  addHours,
  formatDateToISO,
} from 'src/common/dates/format-date';
import { VendingMachineProductEntity } from './entities';
import { VendingMachineProduct } from './types';
import { VendingMachineProductCategory } from './types/vending-machine-product-category.type';
import { VendingMachineProductsRepository } from './vending-machine-products.repository';

const MAX_AMOUNT = 200;
const THRESHOLD_VALUES = [7, 15];
@Injectable({})
export class VendingMachineProductsService {
  logger = new Logger('VendingMachineProductsService');
  constructor(
    private readonly vendingMachineProductsRepository: VendingMachineProductsRepository,
  ) {}

  async getVendingMachineProducts(
    productType: VendingMachineProductCategory,
    threshold: number,
  ): Promise<VendingMachineProduct[]> {
    const entity =
      await this.vendingMachineProductsRepository.getVendingMachineProducts(
        productType,
        threshold,
      );
    return entity.map((e) => e.props);
  }

  async addVendingMachineProduct(
    product: VendingMachineProductEntity,
  ): Promise<VendingMachineProduct> {
    const entity =
      await this.vendingMachineProductsRepository.addVendingMachineProduct(
        product,
      );
    return entity.props;
  }

  async prefillDBWithNoAIData(
    startDate: Date,
    endDate: Date,
    productTypes: VendingMachineProductCategory[],
  ): Promise<void> {
    const indexShift = THRESHOLD_VALUES.length;
    for (const productType of productTypes) {
      try {
        // Initialize current amount to MAX_AMOUNT for the first day
        const products: VendingMachineProductEntity[] = [];
        let currentProductIndex = 0;
        let currentAmount: number = MAX_AMOUNT;
        let changedOnWeekend: boolean = false;
        let changedOnFirstWeek: boolean = false;

        // Iterate over each day in the date range
        for (
          let currentDate = addHours(startDate, 12);
          currentDate <= endDate;
          currentDate = addDays(currentDate, 1)
        ) {
          // Randomly generate change
          const result = this.#calculateProductSold(
            currentDate,
            changedOnWeekend,
            changedOnFirstWeek,
          );
          changedOnWeekend = result.changedOnWeekend;
          changedOnFirstWeek = result.changedOnFirstWeek;

          for (const threshold of THRESHOLD_VALUES) {
            // Check if the previous day's data exists
            const previousAmount =
              currentProductIndex >= indexShift
                ? products[currentProductIndex - indexShift].currentAmount
                : MAX_AMOUNT;

            // Calculate current amount after change
            currentAmount =
              previousAmount > threshold
                ? previousAmount - result.change
                : MAX_AMOUNT - result.change;

            // Create data object
            const data: VendingMachineProductEntity =
              VendingMachineProductEntity.create({
                type: productType,
                threshold: threshold,
                date: currentDate,
                change: result.change,
                currentAmount: currentAmount,
              });

            // Add data to the database
            products.push(data);
            currentProductIndex++;
          }
        }

        this.logger.log(
          `Prefilling the database with no AI data (${formatDateToISO(startDate)} to ${formatDateToISO(endDate)}) for product type ${productType}. Added ${products.length} products.`,
        );

        // Clean the database for the given product type and threshold
        await this.vendingMachineProductsRepository.cleanDatabaseForType(
          productType,
        );
        // Add the new data to the database
        await this.vendingMachineProductsRepository.addVendingMachineProducts(
          products,
        );
      } catch (error) {
        this.logger.error(
          `Error while prefilling the database with no AI data (${formatDateToISO(startDate)} to ${formatDateToISO(endDate)}) for product type ${productType}.`,
          error.stack,
        );
        throw error;
      }
    }
  }

  #calculateProductSold = (
    currentDate: Date,
    changedOnWeekend: boolean,
    changedOnFirstWeek: boolean,
  ): {
    change: number;
    changedOnWeekend: boolean;
    changedOnFirstWeek: boolean;
  } => {
    const dayOfWeek = currentDate.getDay();
    const dayOfMonth = currentDate.getDate();

    // Randomly generate change
    let change = 0;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Weekdays
      change += Math.floor(Math.random() * 5) + 1;
    }
    // Saturday
    if (dayOfWeek === 6) {
      if (Math.random() < 0.5) {
        // Randomly choose a weekend day to remove items
        change += Math.floor(Math.random() * 20) + 1;
        changedOnWeekend = true;
      }
    }

    if (dayOfWeek === 0) {
      // Sunday
      if (!changedOnWeekend) {
        // Randomly choose a weekend day to remove items
        change += Math.floor(Math.random() * 20) + 1;
      }
      changedOnWeekend = false;
    }
    if (dayOfMonth >= 1 && dayOfMonth <= 7) {
      // 1st to 7th of the month (only once a month)
      if (Math.random() < 1 / 7 && !changedOnFirstWeek) {
        change += Math.floor(Math.random() * 20) + 1;
        changedOnFirstWeek = true;
      }
      if (dayOfMonth === 7) {
        if (!changedOnFirstWeek) {
          change += Math.floor(Math.random() * 20) + 1;
        }
        changedOnFirstWeek = false;
      }
    }

    return { change, changedOnWeekend, changedOnFirstWeek };
  };
}
