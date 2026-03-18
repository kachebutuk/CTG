// CipherTrade-frontend/src/components/risk/DrawdownChart.tsx
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, LineData, UTCTimestamp } from 'lightweight-charts';

interface DrawdownChartProps {
  data: Array<{
    date: string;
    drawdown: number;
  }>;
  height?: number;
}

const DrawdownChart: React.FC<DrawdownChartProps> = ({
  data,
  height = 200,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    // Format data
    const chartData: LineData[] = data.map(item => ({
      time: (new Date(item.date).getTime() / 1000) as UTCTimestamp,
      value: item.drawdown * 100, // Convert to percentage
    }));

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      height,
      layout: {
        backgroundColor: 'transparent',
        textColor: '#6b7280',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.1)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.1)',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.2)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.2)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add line series
    const lineSeries = chart.addLineSeries({
      color: '#ef4444',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      priceLineVisible: false,
      lastValueVisible: true,
    });

    lineSeries.setData(chartData);

    // Add horizontal lines at key levels
    lineSeries.createPriceLine({
      price: -5,
      color: '#f59e0b',
      lineWidth: 1,
      lineStyle: 2, // Dashed
      axisLabelVisible: true,
      title: 'Warning',
    });

    lineSeries.createPriceLine({
      price: -10,
      color: '#ef4444',
      lineWidth: 1,
      lineStyle: 2, // Dashed
      axisLabelVisible: true,
      title: 'Critical',
    });

    chartRef.current = chart;

    return () => {
      chart.remove();
    };
  }, [data, height]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full" />
      <div className="absolute top-2 right-2 flex space-x-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1" />
          <span className="text-gray-600 dark:text-gray-400">Warning (-5%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
          <span className="text-gray-600 dark:text-gray-400">Critical (-10%)</span>
        </div>
      </div>
    </div>
  );
};

export default DrawdownChart;