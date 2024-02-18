'use client';
import { VendingMachineProduct, VendingMachineProductCategory } from '@/types';
import { useEffect, useState } from 'react';
import { useProductQuery } from '../components/hooks/get-data-query-hook';
import ProductDataPage from '../components/pages/product-data';

type Series = {
  name: string;
  data: { x: string | Date; y: number }[];
  refills: number;
  saleOpportunityLoses: number; // sum all values that are below zero
}[];

const sumValuesBelowZero = (
  data: { x: string | Date; y: number }[],
): number => {
  return data.reduce((accumulator, currentValue) => {
    if (currentValue.y < 0) {
      return accumulator + currentValue.y;
    }
    return accumulator;
  }, 0);
};

const findAllUniqueProductTypes = (
  data?: VendingMachineProduct[],
): VendingMachineProductCategory[] => {
  if (!data) return [];
  const uniqueProductTypes = new Set<VendingMachineProductCategory>();
  data.forEach((product) => {
    uniqueProductTypes.add(product.type);
  });
  return Array.from(uniqueProductTypes);
};

const combineSeriesData = (
  productTypes: VendingMachineProductCategory[],
  threshold: number,
  data?: VendingMachineProduct[],
): Series => {
  if (!data) return [];
  const series: Series = [];
  productTypes.forEach((productType) => {
    const products = data.filter((product) => product.type === productType);
    const productTypeData: { x: string | Date; y: number }[] = [];
    products.forEach((product) => {
      productTypeData.push({ x: product.date, y: product.currentAmount });
    });
    series.push({
      name: productType,
      data: productTypeData,
      refills: productTypeData.filter((oneDayData) => oneDayData.y <= threshold)
        .length,
      saleOpportunityLoses: sumValuesBelowZero(productTypeData),
    });
  });
  return series;
};

export default function DataNoAIPage() {
  const [threshold, setThreshold] = useState(7);
  const [series, setSeries] = useState<Series>();

  const changeThreshold = (threshold: number) => {
    setThreshold(threshold);
  };

  const data = useProductQuery(threshold);

  useEffect(() => {
    const productTypes = findAllUniqueProductTypes(data);
    setSeries(combineSeriesData(productTypes, threshold, data));
  }, [threshold, data]);

  return (
    <main className="mx-auto max-w-7xl pt-4">
      <ProductDataPage series={series} changeThreshold={changeThreshold} />
    </main>
  );
}
