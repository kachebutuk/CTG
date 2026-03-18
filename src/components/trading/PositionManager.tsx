// CipherTrade-frontend/src/components/trading/PositionManager.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

const PositionManager: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'BTCUSDT',
      side: 'long',
      quantity: 0.5,
      entryPrice: 50000,
      currentPrice: 51234.56,
      pnl: 617.28,
      pnlPercent: 2.47,
    },
    {
      id: '2',
      symbol: 'ETHUSDT',
      side: 'short',
      quantity: 2.5,
      entryPrice: 3200,
      currentPrice: 3123.45,
      pnl: 191.38,
      pnlPercent: 2.39,
    },
  ]);

  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const closePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-3">
      {positions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No open positions
        </div>
      ) : (
        positions.map((position) => (
          <motion.div
            key={position.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={`p-3 rounded-lg border ${
              position.side === 'long'
                ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20'
                : 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20'
            }`}
            onClick={() => setSelectedPosition(position.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{position.symbol}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    position.side === 'long'
                      ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                      : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                  }`}
                >
                  {position.side.toUpperCase()}
                </span>
              </div>
              <span
                className={`font-mono font-medium ${
                  position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {position.pnl >= 0 ? '+' : '-'}${Math.abs(position.pnl).toFixed(2)} (
                {position.pnlPercent.toFixed(2)}%)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-gray-500 dark:text-gray-400">Qty</div>
                <div className="font-mono">{position.quantity.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Entry</div>
                <div className="font-mono">${position.entryPrice.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Mark</div>
                <div className="font-mono">${position.currentPrice.toFixed(2)}</div>
              </div>
            </div>

            <AnimatePresence>
              {selectedPosition === position.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 flex space-x-2"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closePosition(position.id);
                    }}
                    className="flex-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    Close Position
                  </button>
                  <button className="flex-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors">
                    Add Stop
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default PositionManager;