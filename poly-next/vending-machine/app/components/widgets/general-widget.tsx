'use-client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

interface Props {
  widgetName: string;
  widgetDescription: string;
  series?: {
    name: string;
    value: number;
  }[];
}

const GeneralWidget: React.FC<Props> = ({
  series,
  widgetName,
  widgetDescription,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  if (!series) return null;

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between bg-green-700 px-4 py-2">
        <h2 className="text-lg font-semibold text-white">{widgetName}</h2>
        <div className="relative flex items-center">
          <button
            className="text-white"
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          >
            <InformationCircleIcon className="h-5 w-5" />
          </button>
          {isTooltipOpen && (
            <div className="absolute right-0 top-full mb-2 ml-1 w-64 rounded-lg bg-white p-4 shadow-md">
              <p className="text-gray-700">{widgetDescription}</p>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 py-2">
        {series.map((product) => (
          <div
            key={product.name}
            className="flex justify-between border-b py-2"
          >
            <p className="text-gray-700">{product.name}</p>
            <p className="text-gray-700">{product.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralWidget;
