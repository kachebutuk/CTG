// CipherTrade-frontend/src/app/pages/dashboard/Overview.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CandlestickChart from '../../../components/charts/CandlestickChart';
import LineChart from '../../../components/charts/LineChart';
import OrderBook from '../../../components/trading/OrderBook';
import TradeList from '../../../components/trading/TradeList';
import PositionManager from '../../../components/trading/PositionManager';
import MarketTicker from '../../../components/trading/MarketTicker';
import { useMarketData } from '../../../hooks/useMarketData';
import { useWebSocket } from '../../../hooks/useWebSocket';

const Overview: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const { marketData, orderBook, trades } = useMarketData(selectedSymbol);
  const { lastMessage } = useWebSocket();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Market Ticker Row */}
      <motion.div variants={itemVariants}>
        <MarketTicker 
          symbols={['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT']}
          onSelectSymbol={setSelectedSymbol}
          selectedSymbol={selectedSymbol}
        />
      </motion.div>

      {/* Main Chart Area */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Candlestick Chart - 2/3 width */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedSymbol} - Price Chart
            </h2>
            <div className="flex space-x-2">
              <TimeframeButton label="1m" active />
              <TimeframeButton label="5m" />
              <TimeframeButton label="15m" />
              <TimeframeButton label="1h" />
              <TimeframeButton label="4h" />
              <TimeframeButton label="1d" />
            </div>
          </div>
          <CandlestickChart 
            data={marketData?.candles || []}
            height={400}
          />
        </div>

        {/* Order Book - 1/3 width */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Book
          </h2>
          <OrderBook 
            bids={orderBook?.bids || []}
            asks={orderBook?.asks || []}
            spread={orderBook?.spread}
          />
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Trades */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Trades
          </h2>
          <TradeList trades={trades} />
        </div>

        {/* Open Positions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Open Positions
          </h2>
          <PositionManager />
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimeframeButton: React.FC<{ label: string; active?: boolean }> = ({ 
  label, active 
}) => (
  <button
    className={`px-3 py-1 text-sm rounded ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
    } transition-colors`}
  >
    {label}
  </button>
);

export default Overview;