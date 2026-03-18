// CipherTrade-frontend/src/components/widgets/RiskWidget.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface RiskWidgetProps {
  title: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  details?: string;
}

const RiskWidget: React.FC<RiskWidgetProps> = ({
  title,
  value,
  status,
  details,
}) => {
  const statusColors = {
    healthy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusIcons = {
    healthy: '✅',
    warning: '⚠️',
    critical: '🚨',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
          {statusIcons[status]} {status.toUpperCase()}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
      {details && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{details}</p>
      )}
    </motion.div>
  );
};

export default RiskWidget;