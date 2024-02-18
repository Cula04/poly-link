'use client'; // if you use app dir, don't forget this line

import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  series?: {
    name: string;
    data: { x: string | Date; y: number }[];
  }[];
  title: string;
  yLabel: string;
}

export const LineTimeSeriesChart: React.FC<Props> = ({
  series,
  title,
  yLabel,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      redrawOnParentResize: true,
      stacked: false,
      height: '350',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: title,
      align: 'left',
    },
    theme: {
      mode: 'light', // or 'dark'
      //   palette: "palette1",
      monochrome: {
        enabled: false,
        color: '#15803d',
        shadeTo: 'light',
        shadeIntensity: 0.5,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
      title: {
        text: yLabel,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    stroke: {
      width: 2, // Adjust this value to change the line thickness
      dashArray: [0, 2, 4, 6, 8],
    },
    colors: ['#006400', '#00B200', '#7FFF00', '#00FF7F'],
  };

  if (!series) {
    return null;
  }

  return (
    <>
      <ApexChart
        type="line"
        options={options}
        series={series}
        height={500}
        width={1200}
      />
    </>
  );
};
