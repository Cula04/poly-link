'use client';
import { VendingMachineProductCategory } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { LineTimeSeriesChart } from './components/charts/line-timeseries';
import { ProductTypesDropdown } from './components/dropdown/product-type-dropdown';
import { useProductChangesQuery } from './components/hooks/get-product-changes-hook';

export default function Home() {
  const [productCategory, setProductCategory] =
    useState<VendingMachineProductCategory>(
      VendingMachineProductCategory.TYPE_A,
    );

  const changeProductType = (type: string) => {
    const productCategory: VendingMachineProductCategory =
      type as VendingMachineProductCategory;
    setProductCategory(productCategory);
  };

  const navigation = [
    { name: 'No AI Data', href: '/data-no-ai' },
    { name: 'AI Data', href: '/data-ai' },
    { name: 'Comparison', href: '/data-comparison' },
  ];

  const productChanges = useProductChangesQuery(productCategory);

  return (
    <main className="mx-auto max-w-7xl pt-4">
      <h6 className="justify-center pt-12 text-center text-3xl font-bold">
        Predictive Smart Ordering for Vending Machines
      </h6>
      <h6 className="justify-center pt-20 text-center text-xl">
        Aim of this app is to demonstrate the effectiveness of AI-driven refill
        strategies in optimizing inventory management compared to traditional
        methods. It provides insights into key metrics to help users make
        informed decisions regarding inventory management strategies.
      </h6>
      <div className="flex justify-between pt-8">
        <h2 className="text-lg font-bold">{`Product sales over time`}</h2>
        <ProductTypesDropdown
          onSelectProductType={(value) => changeProductType(value)}
        />
      </div>

      <div className="flex items-center justify-center pt-8">
        <LineTimeSeriesChart
          series={[
            {
              name: 'Product Sales',
              data:
                productChanges?.map((productChanges) => {
                  return { x: productChanges.date, y: productChanges.change };
                }) ?? [],
            },
          ]}
          title="Product Sales Over Time"
          yLabel="Product Sales"
        />
      </div>
      <h6 className="justify-center pt-10 text-center text-xl">
        Check and compare how the AI-driven refill strategies are performing
      </h6>
      <div className="hidden justify-center px-24 pt-8 sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="focus:shadow-outline rounded bg-green-700 px-12 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
