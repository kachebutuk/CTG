// CipherTrade-frontend/src/components/trading/TradeList.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Trade {
  id: string;
  time: string;
  symbol: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  total: number;
}

interface TradeListProps {
  trades?: Trade[];
}

const TradeList: React.FC<TradeListProps> = ({ trades = [] }) => {
  // Mock data
  const mockTrades: Trade[] = [
    {
      id: '1',
      time: '12:34:56',
      symbol: 'BTCUSDT',
      side: 'buy',
      price: 51234.56,
      quantity: 0.1234,
      total: 6321.45,
    },
    {
      id: '2',
      time: '12:34:55',
      symbol: 'BTCUSDT',
      side: 'sell',
      price: 51230.12,
      quantity: 0.5678,
      total: 29082.45,
    },
    {
      id: '3',
      time: '12:34:54',
      symbol: 'ETHUSDT',
      side: 'buy',
      price: 3123.45,
      quantity: 1.2345,
      total: 3854.23,
    },
  ];

  const displayTrades = trades.length > 0 ? trades : mockTrades;

  return (
    <div className="space-y-2">
      {displayTrades.map((trade, index) => (
        <motion.div
          key={trade.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="flex items-center justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
        >
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {trade.time}
            </span>
            <span className="font-mono text-xs">{trade.symbol}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                trade.side === 'buy'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              {trade.side.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs">{trade.price.toFixed(2)}</span>
            <span className="font-mono text-xs text-gray-500">
              {trade.quantity.toFixed(4)}
            </span>
            <span className="font-mono text-xs font-medium">
              ${trade.total.toFixed(2)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TradeList;