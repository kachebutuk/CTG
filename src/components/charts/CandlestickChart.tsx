// CipherTrade-frontend/src/components/charts/CandlestickChart.tsx
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, CandlestickData, UTCTimestamp } from 'lightweight-charts';

interface CandlestickChartProps {
  data: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
  }>;
  height?: number;
  width?: number;
  showVolume?: boolean;
  colors?: {
    backgroundColor?: string;
    textColor?: string;
    upColor?: string;
    downColor?: string;
    volumeUpColor?: string;
    volumeDownColor?: string;
  };
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  height = 400,
  width,
  showVolume = true,
  colors = {
    backgroundColor: 'transparent',
    textColor: '#6b7280',
    upColor: '#26a69a',
    downColor: '#ef5350',
    volumeUpColor: '#26a69a',
    volumeDownColor: '#ef5350',
  }
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Format data for the chart
    const chartData: CandlestickData[] = data.map(item => ({
      time: item.time as UTCTimestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: width || chartContainerRef.current.clientWidth,
      height,
      layout: {
        backgroundColor: colors.backgroundColor,
        textColor: colors.textColor,
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.2)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.2)',
        },
      },
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderDownColor: colors.downColor,
      borderUpColor: colors.upColor,
      wickDownColor: colors.downColor,
      wickUpColor: colors.upColor,
    });

    candlestickSeries.setData(chartData);

    // Add volume series if enabled
    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      const volumeData = data.map(item => ({
        time: item.time as UTCTimestamp,
        value: item.volume || 0,
        color: item.close >= item.open ? colors.volumeUpColor : colors.volumeDownColor,
      }));

      volumeSeries.setData(volumeData);
    }

    chartRef.current = chart;

    // Handle resize
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height, width, showVolume, colors]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default CandlestickChart;