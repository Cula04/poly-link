'use client';
import { VendingMachineProduct, VendingMachineProductCategory } from '@/types';
import { useEffect, useState } from 'react';
import { useComparisonQuery } from '../components/hooks/get-comparison-query-hook';
import ComparisonDataPage from '../components/pages/comparison-data';

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

const findAllUniqueThresholds = (data?: VendingMachineProduct[]): number[] => {
  if (!data) return [];
  const uniqueThreshold = new Set<number>();
  data.forEach((product) => {
    uniqueThreshold.add(product.threshold);
  });
  return Array.from(uniqueThreshold);
};

const combineSeriesData = (
  productType: VendingMachineProductCategory,
  thresholds: number[],
  data?: VendingMachineProduct[],
): Series => {
  if (!data) return [];
  const series: Series = [];
  thresholds.forEach((threshold) => {
    const products = data.filter((product) => product.threshold === threshold);
    const productThresholdData: { x: string | Date; y: number }[] = [];
    const productThresholdAIData: { x: string | Date; y: number }[] = [];
    products.forEach((product) => {
      productThresholdData.push({ x: product.date, y: product.currentAmount });
      productThresholdAIData.push({
        x: product.date,
        y: product.currentAIAmount ?? product.currentAmount,
      });
    });
    series.push({
      name: threshold.toString(),
      data: productThresholdData,
      refills: productThresholdData.filter(
        (oneDayData) => oneDayData.y <= threshold,
      ).length,
      saleOpportunityLoses: sumValuesBelowZero(productThresholdData),
    });

    series.push({
      name: `AI-${threshold.toString()}`,
      data: productThresholdAIData,
      refills: productThresholdAIData.filter(
        (oneDayData) => oneDayData.y <= threshold,
      ).length,
      saleOpportunityLoses: sumValuesBelowZero(productThresholdAIData),
    });
  });

  return series;
};

export default function DataComparisonPage() {
  const [productType, setProductType] = useState(
    VendingMachineProductCategory.TYPE_A,
  );
  const [series, setSeries] = useState<Series>();

  const changeProductType = (type: VendingMachineProductCategory) => {
    setProductType(type);
  };

  const data = useComparisonQuery(productType);

  useEffect(() => {
    const thresholds = findAllUniqueThresholds(data);
    setSeries(combineSeriesData(productType, thresholds, data));
  }, [productType, data]);

  return (
    <main className="mx-auto max-w-7xl pt-4">
      <ComparisonDataPage
        series={series}
        changeProductType={changeProductType}
      />
    </main>
  );
}
