// CipherTrade-frontend/src/components/risk/RiskGauges.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugesProps {
  title: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  thresholds: {
    warning: number;
    danger: number;
  };
}

const RiskGauges: React.FC<RiskGaugesProps> = ({
  title,
  value,
  min,
  max,
  unit,
  thresholds,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const getStatusColor = () => {
    if (value >= thresholds.danger) return 'text-red-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (value >= thresholds.danger) return 'bg-red-600';
    if (value >= thresholds.warning) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className={`text-2xl font-bold ${getStatusColor()}`}>
              {value.toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Max: {max}
            {unit}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.5 }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor()}`}
          />
        </div>

        {/* Threshold Markers */}
        <div className="relative h-4 mt-1">
          <div
            className="absolute w-0.5 h-4 bg-yellow-500"
            style={{ left: `${(thresholds.warning / max) * 100}%` }}
          />
          <div
            className="absolute w-0.5 h-4 bg-red-600"
            style={{ left: `${(thresholds.danger / max) * 100}%` }}
          />
        </div>

        {/* Status Message */}
        <div className="mt-2 text-xs">
          {value >= thresholds.danger && (
            <span className="text-red-600">⚠️ Critical - Action required</span>
          )}
          {value >= thresholds.warning && value < thresholds.danger && (
            <span className="text-yellow-600">⚠️ Warning - Monitor closely</span>
          )}
          {value < thresholds.warning && (
            <span className="text-green-600">✅ Healthy</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RiskGauges;