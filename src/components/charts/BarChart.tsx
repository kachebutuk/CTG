// CipherTrade-frontend/src/components/charts/BarChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
  showGrid?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  labels,
  height = 300,
  color = '#3b82f6',
  showGrid = true,
}) => {
  const defaultLabels = data.map((_, i) => `Day ${i + 1}`);
  
  const chartData = {
    labels: labels || defaultLabels,
    datasets: [
      {
        label: 'Value',
        data,
        backgroundColor: data.map(value => value >= 0 ? '#22c55e' : '#ef4444'),
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          display: showGrid,
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          callback: (value: any) => `$${value}`,
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;