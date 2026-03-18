// CipherTrade-frontend/src/app/pages/dashboard/Trading.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderForm from '../../../components/trading/OrderForm';
import OrderBook from '../../../components/trading/OrderBook';
import PositionManager from '../../../components/trading/PositionManager';
import TradeList from '../../../components/trading/TradeList';
import CandlestickChart from '../../../components/charts/CandlestickChart';
import DepthChart from '../../../components/charts/DepthChart';
import { useMarketData } from '../../../hooks/useMarketData';
import { useTrading } from '../../../hooks/useTrading';

const Trading: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [orderType, setOrderType] = useState<'limit' | 'market' | 'stop'>('limit');
  const { marketData, orderBook } = useMarketData(selectedSymbol);
  const { placeOrder, cancelOrder } = useTrading();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Trading Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Chart and Depth */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <CandlestickChart 
              data={marketData?.candles || []}
              height={400}
            />
          </div>
          
          {/* Market Depth */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Market Depth</h3>
            <DepthChart 
              bids={orderBook?.bids || []}
              asks={orderBook?.asks || []}
            />
          </div>
        </div>

        {/* Right Column - Order Form */}
        <div className="space-y-4">
          {/* Order Type Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setOrderType('limit')}
                className={`flex-1 py-2 rounded ${
                  orderType === 'limit' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                Limit
              </button>
              <button
                onClick={() => setOrderType('market')}
                className={`flex-1 py-2 rounded ${
                  orderType === 'market' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType('stop')}
                className={`flex-1 py-2 rounded ${
                  orderType === 'stop' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                Stop
              </button>
            </div>

            {/* Order Form */}
            <OrderForm 
              type={orderType}
              symbol={selectedSymbol}
              onSubmit={placeOrder}
            />
          </div>

          {/* Order Book Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Market Summary</h3>
            <OrderBook 
              bids={orderBook?.bids?.slice(0, 5) || []}
              asks={orderBook?.asks?.slice(0, 5) || []}
              compact
            />
          </div>
        </div>
      </div>

      {/* Positions and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Open Positions</h3>
          <PositionManager />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Order History</h3>
          <TradeList />
        </div>
      </div>
    </motion.div>
  );
};

export default Trading;