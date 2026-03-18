// CipherTrade-frontend/src/components/trading/OrderBook.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface OrderBookProps {
  bids: Array<{ price: number; quantity: number }>;
  asks: Array<{ price: number; quantity: number }>;
  spread?: number;
  compact?: boolean;
}

const OrderBook: React.FC<OrderBookProps> = ({
  bids,
  asks,
  spread,
  compact = false,
}) => {
  const maxBidQuantity = Math.max(...bids.map(b => b.quantity));
  const maxAskQuantity = Math.max(...asks.map(a => a.quantity));

  return (
    <div className="space-y-2">
      {/* Asks (Sell orders) */}
      <div className="space-y-1">
        {asks.slice(0, compact ? 5 : 10).map((ask, index) => (
          <motion.div
            key={`ask-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <div
              className="absolute inset-0 bg-red-500/10 rounded"
              style={{
                width: `${(ask.quantity / maxAskQuantity) * 100}%`,
                marginLeft: 'auto',
              }}
            />
            <div className="relative flex justify-between text-sm py-0.5 px-2">
              <span className="text-red-600 dark:text-red-400 font-mono">
                {ask.price.toFixed(2)}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {ask.quantity.toFixed(4)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spread */}
      {spread !== undefined && (
        <div className="text-center text-xs text-gray-500 py-1 border-y border-gray-200 dark:border-gray-700">
          Spread: {spread.toFixed(2)} ({((spread / asks[0]?.price) * 100).toFixed(3)}%)
        </div>
      )}

      {/* Bids (Buy orders) */}
      <div className="space-y-1">
        {bids.slice(0, compact ? 5 : 10).map((bid, index) => (
          <motion.div
            key={`bid-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <div
              className="absolute inset-0 bg-green-500/10 rounded"
              style={{
                width: `${(bid.quantity / maxBidQuantity) * 100}%`,
              }}
            />
            <div className="relative flex justify-between text-sm py-0.5 px-2">
              <span className="text-green-600 dark:text-green-400 font-mono">
                {bid.price.toFixed(2)}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {bid.quantity.toFixed(4)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;