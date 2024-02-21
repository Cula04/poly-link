'use client';
import { VendingMachineProductCategory } from '@/types';
import { LineTimeSeriesChart } from '../charts/line-timeseries';
import { ProductTypesDropdown } from '../dropdown/product-type-dropdown';
import GeneralWidget from '../widgets/general-widget';

interface Props {
  changeProductType: (type: VendingMachineProductCategory) => void;
  series?: {
    name: string;
    data: { x: string | Date; y: number }[];
    refills: number;
    saleOpportunityLoses: number;
  }[];
}

export default function ComparisonDataPage({
  changeProductType,
  series,
}: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">
          {`Comparison of data for specific product`}
        </h2>
        <ProductTypesDropdown
          onSelectProductType={(value) => changeProductType(value)}
        />
      </div>

      <div className="flex justify-between pt-8">
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

      <div className="flex items-center justify-center pt-8">
        <LineTimeSeriesChart
          series={series}
          title="Comparison"
          yLabel="label YYY"
          dashArray={[0, 3, 0, 3]}
          colors={['#006400', '#00B200', '#FF0000', '#FF6666']}
        />
      </div>
    </div>
  );
}
