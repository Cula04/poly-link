'use client';

import React from 'react';

interface Props {
  onSelectThreshold: (threshold: number) => void;
}

export const ThresholdDropdown: React.FC<Props> = ({ onSelectThreshold }) => {
  const thresholds = [7, 15, 21, 30];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedThreshold = parseInt(event.target.value, 10); // Convert value to number
    onSelectThreshold(selectedThreshold); // Trigger the callback with the selected threshold
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={handleSelectChange}
        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
      >
        {thresholds.map((threshold, index) => (
          <option key={index} value={threshold}>
            Threshold: {threshold}
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
