// CipherTrade-frontend/src/components/strategy/StrategyCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Strategy {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'backtesting';
  performance: {
    winRate: number;
    totalPnl: number;
    sharpe: number;
    trades: number;
  };
}

interface StrategyCardProps {
  strategy: Strategy;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onBacktest: () => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({
  strategy,
  isActive,
  onSelect,
  onEdit,
  onBacktest,
}) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    backtesting: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {strategy.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {strategy.type}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[strategy.status]
          }`}
        >
          {strategy.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Win Rate</div>
          <div className="font-mono font-medium text-gray-900 dark:text-white">
            {strategy.performance.winRate}%
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total P&L</div>
          <div
            className={`font-mono font-medium ${
              strategy.performance.totalPnl >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            ${strategy.performance.totalPnl.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Sharpe</div>
          <div className="font-mono font-medium text-gray-900 dark:text-white">
            {strategy.performance.sharpe.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Trades</div>
          <div className="font-mono font-medium text-gray-900 dark:text-white">
            {strategy.performance.trades}
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBacktest();
          }}
          className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
        >
          Backtest
        </button>
      </div>
    </motion.div>
  );
};

export default StrategyCard;