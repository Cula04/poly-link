'use client';

import { VendingMachineProductCategory } from '@/types';
import React from 'react';

interface Props {
  onSelectProductType: (type: VendingMachineProductCategory) => void;
}

export const ProductTypesDropdown: React.FC<Props> = ({
  onSelectProductType,
}) => {
  const productTypes: VendingMachineProductCategory[] = [
    VendingMachineProductCategory.TYPE_A,
    VendingMachineProductCategory.TYPE_B,
    VendingMachineProductCategory.TYPE_C,
    VendingMachineProductCategory.TYPE_D,
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectProductType(event.target.value as VendingMachineProductCategory); // Trigger the callback with the selected threshold
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={handleSelectChange}
        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
      >
        {productTypes.map((productType, index) => (
          <option key={index} value={productType}>
            Product: {productType}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.293 11.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 1.414L10.586 8 8.293 10.293z"
          />
        </svg>
      </div>
    </div>
  );
};
