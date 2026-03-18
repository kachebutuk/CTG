// CipherTrade-frontend/src/app/pages/dashboard/Analytics.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LineChart from '../../../components/charts/LineChart';
import BarChart from '../../../components/charts/BarChart';
import PieChart from '../../../components/charts/PieChart';
import HeatMap from '../../../components/charts/HeatMap';
import PerformanceMetrics from '../../../components/strategy/PerformanceMetrics';
import DateRangePicker from '../../../components/common/DateRangePicker';
import { useAnalytics } from '../../../hooks/useAnalytics';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
  const { metrics, equityCurve, dailyReturns, drawdowns } = useAnalytics(dateRange);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Performance Analytics
        </h1>
        <DateRangePicker 
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Return"
          value="+$45,231.89"
          change="+12.5%"
          trend="up"
        />
        <MetricCard
          title="Sharpe Ratio"
          value="2.45"
          change="+0.3"
          trend="up"
        />
        <MetricCard
          title="Win Rate"
          value="68.5%"
          change="+2.1%"
          trend="up"
        />
        <MetricCard
          title="Max Drawdown"
          value="-8.2%"
          change="+1.5%"
          trend="down"
          inverse
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Equity Curve */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
          <LineChart 
            data={equityCurve}
            xKey="date"
            yKey="equity"
            height={300}
          />
        </div>

        {/* Drawdown Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Drawdown</h3>
          <LineChart 
            data={drawdowns}
            xKey="date"
            yKey="drawdown"
            height={300}
            color="#ef4444"
          />
        </div>

        {/* Daily Returns Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Daily Returns Distribution</h3>
          <BarChart 
            data={dailyReturns}
            height={300}
          />
        </div>

        {/* Win/Loss Ratio */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Win/Loss Ratio</h3>
          <PieChart 
            data={[
              { label: 'Winning Trades', value: 68.5 },
              { label: 'Losing Trades', value: 31.5 }
            ]}
            height={300}
          />
        </div>
      </div>

      {/* Performance Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Hourly Performance Heatmap</h3>
        <HeatMap 
          data={generateHeatmapData()}
          height={300}
        />
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Detailed Performance Metrics</h3>
        <PerformanceMetrics metrics={metrics} />
      </div>
    </motion.div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  inverse?: boolean;
}> = ({ title, value, change, trend, inverse }) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  let trendColor = 'text-gray-600';
  if (isPositive) trendColor = 'text-green-600';
  if (isNegative) trendColor = 'text-red-600';
  if (inverse) {
    if (isPositive) trendColor = 'text-red-600';
    if (isNegative) trendColor = 'text-green-600';
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className={`mt-2 text-sm ${trendColor}`}>
        {change} from previous period
      </p>
    </div>
  );
};

// Helper function to generate mock heatmap data
const generateHeatmapData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map(day => ({
    day,
    values: hours.map(() => Math.random() * 100 - 50)
  }));
};

export default Analytics;