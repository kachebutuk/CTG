// CipherTrade-frontend/src/components/trading/MarketTicker.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface MarketTickerProps {
  symbols: string[];
  onSelectSymbol: (symbol: string) => void;
  selectedSymbol: string;
}

const MarketTicker: React.FC<MarketTickerProps> = ({
  symbols,
  onSelectSymbol,
  selectedSymbol,
}) => {
  const [tickerData, setTickerData] = useState<TickerData[]>([]);

  useEffect(() => {
    // Mock data - in real app, this would come from WebSocket
    const mockData: TickerData[] = [
      {
        symbol: 'BTCUSDT',
        price: 51234.56,
        change: 1234.56,
        changePercent: 2.47,
        volume: 1234567,
      },
      {
        symbol: 'ETHUSDT',
        price: 3123.45,
        change: -45.67,
        changePercent: -1.44,
        volume: 987654,
      },
      {
        symbol: 'BNBUSDT',
        price: 412.34,
        change: 8.23,
        changePercent: 2.04,
        volume: 234567,
      },
      {
        symbol: 'SOLUSDT',
        price: 123.45,
        change: 5.67,
        changePercent: 4.81,
        volume: 345678,
      },
    ];
    setTickerData(mockData);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {tickerData.map((ticker) => (
          <motion.button
            key={ticker.symbol}
            whileHover={{ y: -2 }}
            onClick={() => onSelectSymbol(ticker.symbol)}
            className={`flex-shrink-0 p-3 rounded-lg transition-colors ${
              selectedSymbol === ticker.symbol
                ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {ticker.symbol}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Vol: {(ticker.volume / 1000000).toFixed(2)}M
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium">
                  ${ticker.price.toFixed(2)}
                </div>
                <div
                  className={`text-sm ${
                    ticker.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {ticker.change >= 0 ? '+' : ''}
                  {ticker.change.toFixed(2)} ({ticker.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;