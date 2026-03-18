// CipherTrade-frontend/src/app/pages/dashboard/Strategies.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StrategyCard from '../../../components/strategy/StrategyCard';
import StrategyConfig from '../../../components/strategy/StrategyConfig';
import BacktestResults from '../../../components/strategy/BacktestResults';
import { useStrategies } from '../../../hooks/useStrategies';
import { Strategy } from '../../../types/strategy';

const Strategies: React.FC = () => {
  const { 
    strategies, 
    activeStrategy, 
    selectStrategy, 
    updateStrategy, 
    runBacktest,
    backtestResults 
  } = useStrategies();

  const [showConfig, setShowConfig] = useState(false);
  const [showBacktest, setShowBacktest] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trading Strategies
        </h1>
        <button
          onClick={() => setShowConfig(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Strategy
        </button>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            isActive={activeStrategy?.id === strategy.id}
            onSelect={() => selectStrategy(strategy)}
            onEdit={() => {
              selectStrategy(strategy);
              setShowConfig(true);
            }}
            onBacktest={() => {
              selectStrategy(strategy);
              runBacktest(strategy);
              setShowBacktest(true);
            }}
          />
        ))}
      </div>

      {/* Strategy Configuration Modal */}
      <AnimatePresence>
        {showConfig && (
          <StrategyConfig
            strategy={activeStrategy}
            onClose={() => setShowConfig(false)}
            onSave={updateStrategy}
          />
        )}
      </AnimatePresence>

      {/* Backtest Results Modal */}
      <AnimatePresence>
        {showBacktest && backtestResults && (
          <BacktestResults
            results={backtestResults}
            onClose={() => setShowBacktest(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Strategies;