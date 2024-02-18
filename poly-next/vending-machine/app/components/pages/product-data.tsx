'use client';
import { usePathname } from 'next/navigation';
import { LineTimeSeriesChart } from '../charts/line-timeseries';
import { ThresholdDropdown } from '../dropdown/threshold-dropdown';
import GeneralWidget from '../widgets/general-widget';

interface Props {
  changeThreshold: (threshold: number) => void;
  series?: {
    name: string;
    data: { x: string | Date; y: number }[];
    refills: number;
    saleOpportunityLoses: number;
  }[];
}

export default function ProductDataPage({ changeThreshold, series }: Props) {
  const path = usePathname();
  const tag = path.split('/').slice(-1)[0] === 'data-no-ai' ? 'No AI' : 'AI';
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">
          {`Live monitoring of vending machine products supply (${tag} Predictions)`}
        </h2>
        <ThresholdDropdown
          onSelectThreshold={(value) => changeThreshold(value)}
        />
      </div>

      <div className="flex justify-between pt-16">
        <GeneralWidget
          series={series?.map((product) => {
            return { name: product.name, value: product.refills };
          })}
          widgetName="No. of Refill Trips"
          widgetDescription="The number of times the vending machine needs to be refilled. This is calculated by counting the number of days the product supply is below the threshold."
        />

        <GeneralWidget
          series={series?.map((product) => {
            return {
              name: product.name,
              value: product.saleOpportunityLoses * -1,
            };
          })}
          widgetName="Loss of Sales Opportunities"
          widgetDescription="The amount of products not sold due to stock being empty. This is calculated by summing all the negative values in the chart."
        />
      </div>

      <div className="flex items-center justify-center pt-16">
        <LineTimeSeriesChart
          series={series}
          title="Amount of products over time"
          yLabel="Product supply"
        />
      </div>
    </div>
  );
}
