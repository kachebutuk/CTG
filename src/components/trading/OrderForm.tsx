// CipherTrade-frontend/src/components/trading/OrderForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OrderFormProps {
  type: 'limit' | 'market' | 'stop';
  symbol: string;
  onSubmit: (order: any) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ type, symbol, onSubmit }) => {
  const [orderType, setOrderType] = useState<'limit' | 'market' | 'stop'>(type);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');

  const calculateTotal = (qty: string, p: string) => {
    if (qty && p) {
      const numQty = parseFloat(qty);
      const numPrice = parseFloat(p);
      if (!isNaN(numQty) && !isNaN(numPrice)) {
        setTotal((numQty * numPrice).toFixed(2));
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    calculateTotal(e.target.value, price);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    calculateTotal(quantity, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: orderType,
      side,
      symbol,
      price: orderType === 'market' ? undefined : parseFloat(price),
      stopPrice: orderType === 'stop' ? parseFloat(stopPrice) : undefined,
      quantity: parseFloat(quantity),
    });
  };

  const getMaxQuantity = () => {
    // This would come from account balance
    return '1.2345';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Order Type Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {(['limit', 'market', 'stop'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setOrderType(t)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              orderType === t
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Buy/Sell Toggle */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setSide('buy')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            side === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setSide('sell')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            side === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Price Input (for limit/stop orders) */}
      {(orderType === 'limit' || orderType === 'stop') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price (USDT)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="0.00"
            required
          />
        </div>
      )}

      {/* Stop Price Input (for stop orders) */}
      {orderType === 'stop' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stop Price (USDT)
          </label>
          <input
            type="number"
            step="0.01"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="0.00"
            required
          />
        </div>
      )}

      {/* Quantity Input */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <button
            type="button"
            onClick={() => setQuantity(getMaxQuantity())}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Max
          </button>
        </div>
        <input
          type="number"
          step="0.0001"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="0.0000"
          required
        />
      </div>

      {/* Total (for limit orders) */}
      {orderType === 'limit' && total && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total: <span className="font-mono font-medium">${total}</span>
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
          side === 'buy'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {side === 'buy' ? 'Buy' : 'Sell'} {symbol}
      </motion.button>
    </form>
  );
};

export default OrderForm;