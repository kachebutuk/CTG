// CipherTrade-frontend/src/components/charts/DepthChart.tsx
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, HistogramData } from 'lightweight-charts';

interface DepthChartProps {
  bids: Array<{ price: number; quantity: number }>;
  asks: Array<{ price: number; quantity: number }>;
  height?: number;
}

const DepthChart: React.FC<DepthChartProps> = ({
  bids,
  asks,
  height = 200,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Combine and sort all price levels
    const allLevels = [
      ...bids.map(b => ({ price: b.price, type: 'bid', quantity: b.quantity })),
      ...asks.map(a => ({ price: a.price, type: 'ask', quantity: a.quantity })),
    ].sort((a, b) => a.price - b.price);

    // Calculate cumulative quantities
    let bidCumulative = 0;
    let askCumulative = 0;
    
    const bidData: HistogramData[] = [];
    const askData: HistogramData[] = [];

    allLevels.forEach(level => {
      if (level.type === 'bid') {
        bidCumulative += level.quantity;
        bidData.push({
          time: level.price as any,
          value: bidCumulative,
          color: '#22c55e',
        });
      } else {
        askCumulative += level.quantity;
        askData.push({
          time: level.price as any,
          value: askCumulative,
          color: '#ef4444',
        });
      }
    });

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
      },
    });

    // Add bid series
    const bidSeries = chart.addHistogramSeries({
      color: '#22c55e',
      priceFormat: {
        type: 'volume',
      },
    });
    bidSeries.setData(bidData);

    // Add ask series
    const askSeries = chart.addHistogramSeries({
      color: '#ef4444',
      priceFormat: {
        type: 'volume',
      },
    });
    askSeries.setData(askData);

    chartRef.current = chart;

    return () => {
      chart.remove();
    };
  }, [bids, asks, height]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default DepthChart;