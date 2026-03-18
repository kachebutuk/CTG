// CipherTrade-frontend/src/components/widgets/PerformanceWidget.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface PerformanceWidgetProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const PerformanceWidget: React.FC<PerformanceWidgetProps> = ({
  title,
  value,
  change,
  trend,
}) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        <p className={`flex items-center text-sm ${trendColors[trend]}`}>
          <span className="mr-1">{trendIcons[trend]}</span>
          {change}
        </p>
      </div>
    </motion.div>
  );
};

export default PerformanceWidget;