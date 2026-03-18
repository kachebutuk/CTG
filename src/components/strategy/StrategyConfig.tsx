// CipherTrade-frontend/src/components/strategy/StrategyConfig.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface StrategyConfigProps {
  strategy?: any;
  onClose: () => void;
  onSave: (config: any) => void;
}

const StrategyConfig: React.FC<StrategyConfigProps> = ({
  strategy,
  onClose,
  onSave,
}) => {
  const [config, setConfig] = useState({
    name: strategy?.name || '',
    type: strategy?.type || 'trend_pullback',
    capitalAllocation: strategy?.capitalAllocation || 20,
    maxPositions: strategy?.maxPositions || 2,
    riskPerTrade: strategy?.riskPerTrade || 1,
    timeframes: strategy?.timeframes || ['1h'],
    symbols: strategy?.symbols || ['BTCUSDT'],
    parameters: strategy?.parameters || {
      trendEmaPeriod: 50,
      pullbackEmaPeriod: 20,
      riskRewardRatio: 2,
      maxPullbackPercent: 3,
    },
  });

  const strategyTypes = [
    { value: 'trend_pullback', label: 'Trend Pullback' },
    { value: 'breakout', label: 'Breakout' },
    { value: 'mean_reversion', label: 'Mean Reversion' },
    { value: 'momentum', label: 'Momentum' },
    { value: 'scalping', label: 'Scalping' },
    { value: 'grid', label: 'Grid Trading' },
  ];

  const timeframeOptions = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
  ];

  const symbolOptions = [
    { value: 'BTCUSDT', label: 'BTC/USDT' },
    { value: 'ETHUSDT', label: 'ETH/USDT' },
    { value: 'BNBUSDT', label: 'BNB/USDT' },
    { value: 'SOLUSDT', label: 'SOL/USDT' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    onClose();
  };

  return (
    <Modal title="Strategy Configuration" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Strategy Name"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            required
          />
          <Select
            label="Strategy Type"
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value })}
            options={strategyTypes}
            required
          />
        </div>

        {/* Allocation */}
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Capital Allocation (%)"
            type="number"
            value={config.capitalAllocation}
            onChange={(e) =>
              setConfig({ ...config, capitalAllocation: parseInt(e.target.value) })
            }
            min={1}
            max={100}
            required
          />
          <Input
            label="Max Positions"
            type="number"
            value={config.maxPositions}
            onChange={(e) =>
              setConfig({ ...config, maxPositions: parseInt(e.target.value) })
            }
            min={1}
            required
          />
          <Input
            label="Risk per Trade (%)"
            type="number"
            step="0.1"
            value={config.riskPerTrade}
            onChange={(e) =>
              setConfig({ ...config, riskPerTrade: parseFloat(e.target.value) })
            }
            min={0.1}
            max={5}
            required
          />
        </div>

        {/* Trading Settings */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Timeframes"
            value={config.timeframes[0]}
            onChange={(e) => setConfig({ ...config, timeframes: [e.target.value] })}
            options={timeframeOptions}
            multiple
            required
          />
          <Select
            label="Symbols"
            value={config.symbols[0]}
            onChange={(e) => setConfig({ ...config, symbols: [e.target.value] })}
            options={symbolOptions}
            multiple
            required
          />
        </div>

        {/* Strategy Parameters */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium mb-3">Strategy Parameters</h4>
          
          {config.type === 'trend_pullback' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Trend EMA Period"
                type="number"
                value={config.parameters.trendEmaPeriod}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      trendEmaPeriod: parseInt(e.target.value),
                    },
                  })
                }
                min={10}
                max={200}
              />
              <Input
                label="Pullback EMA Period"
                type="number"
                value={config.parameters.pullbackEmaPeriod}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      pullbackEmaPeriod: parseInt(e.target.value),
                    },
                  })
                }
                min={5}
                max={50}
              />
              <Input
                label="Risk/Reward Ratio"
                type="number"
                step="0.1"
                value={config.parameters.riskRewardRatio}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      riskRewardRatio: parseFloat(e.target.value),
                    },
                  })
                }
                min={1}
                max={5}
              />
              <Input
                label="Max Pullback %"
                type="number"
                step="0.1"
                value={config.parameters.maxPullbackPercent}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      maxPullbackPercent: parseFloat(e.target.value),
                    },
                  })
                }
                min={0.5}
                max={10}
              />
            </div>
          )}

          {config.type === 'breakout' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Breakout Threshold (ATR)"
                type="number"
                step="0.1"
                value={config.parameters.breakoutThreshold || 2}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      breakoutThreshold: parseFloat(e.target.value),
                    },
                  })
                }
                min={1}
                max={5}
              />
              <Input
                label="Volume Threshold"
                type="number"
                step="0.1"
                value={config.parameters.volumeThreshold || 1.5}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      volumeThreshold: parseFloat(e.target.value),
                    },
                  })
                }
                min={1}
                max={3}
              />
              <Input
                label="Lookback Periods"
                type="number"
                value={config.parameters.lookbackPeriods || 20}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      lookbackPeriods: parseInt(e.target.value),
                    },
                  })
                }
                min={5}
                max={50}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save Strategy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StrategyConfig;import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface StrategyConfigProps {
  strategy?: any;
  onClose: () => void;
  onSave: (config: any) => void;
}

const StrategyConfig: React.FC<StrategyConfigProps> = ({
  strategy,
  onClose,
  onSave,
}) => {
  const [config, setConfig] = useState({
    name: strategy?.name || '',
    type: strategy?.type || 'trend_pullback',
    capitalAllocation: strategy?.capitalAllocation || 20,
    maxPositions: strategy?.maxPositions || 2,
    riskPerTrade: strategy?.riskPerTrade || 1,
    timeframes: strategy?.timeframes || ['1h'],
    symbols: strategy?.symbols || ['BTCUSDT'],
    parameters: strategy?.parameters || {
      trendEmaPeriod: 50,
      pullbackEmaPeriod: 20,
      riskRewardRatio: 2,
      maxPullbackPercent: 3,
    },
  });

  const strategyTypes = [
    { value: 'trend_pullback', label: 'Trend Pullback' },
    { value: 'breakout', label: 'Breakout' },
    { value: 'mean_reversion', label: 'Mean Reversion' },
    { value: 'momentum', label: 'Momentum' },
    { value: 'scalping', label: 'Scalping' },
    { value: 'grid', label: 'Grid Trading' },
  ];

  const timeframeOptions = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
  ];

  const symbolOptions = [
    { value: 'BTCUSDT', label: 'BTC/USDT' },
    { value: 'ETHUSDT', label: 'ETH/USDT' },
    { value: 'BNBUSDT', label: 'BNB/USDT' },
    { value: 'SOLUSDT', label: 'SOL/USDT' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    onClose();
  };

  return (
    <Modal title="Strategy Configuration" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Strategy Name"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            required
          />
          <Select
            label="Strategy Type"
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value })}
            options={strategyTypes}
            required
          />
        </div>

        {/* Allocation */}
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Capital Allocation (%)"
            type="number"
            value={config.capitalAllocation}
            onChange={(e) =>
              setConfig({ ...config, capitalAllocation: parseInt(e.target.value) })
            }
            min={1}
            max={100}
            required
          />
          <Input
            label="Max Positions"
            type="number"
            value={config.maxPositions}
            onChange={(e) =>
              setConfig({ ...config, maxPositions: parseInt(e.target.value) })
            }
            min={1}
            required
          />
          <Input
            label="Risk per Trade (%)"
            type="number"
            step="0.1"
            value={config.riskPerTrade}
            onChange={(e) =>
              setConfig({ ...config, riskPerTrade: parseFloat(e.target.value) })
            }
            min={0.1}
            max={5}
            required
          />
        </div>

        {/* Trading Settings */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Timeframes"
            value={config.timeframes[0]}
            onChange={(e) => setConfig({ ...config, timeframes: [e.target.value] })}
            options={timeframeOptions}
            multiple
            required
          />
          <Select
            label="Symbols"
            value={config.symbols[0]}
            onChange={(e) => setConfig({ ...config, symbols: [e.target.value] })}
            options={symbolOptions}
            multiple
            required
          />
        </div>

        {/* Strategy Parameters */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium mb-3">Strategy Parameters</h4>
          
          {config.type === 'trend_pullback' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Trend EMA Period"
                type="number"
                value={config.parameters.trendEmaPeriod}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      trendEmaPeriod: parseInt(e.target.value),
                    },
                  })
                }
                min={10}
                max={200}
              />
              <Input
                label="Pullback EMA Period"
                type="number"
                value={config.parameters.pullbackEmaPeriod}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      pullbackEmaPeriod: parseInt(e.target.value),
                    },
                  })
                }
                min={5}
                max={50}
              />
              <Input
                label="Risk/Reward Ratio"
                type="number"
                step="0.1"
                value={config.parameters.riskRewardRatio}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      riskRewardRatio: parseFloat(e.target.value),
                    },
                  })
                }
                min={1}
                max={5}
              />
              <Input
                label="Max Pullback %"
                type="number"
                step="0.1"
                value={config.parameters.maxPullbackPercent}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      maxPullbackPercent: parseFloat(e.target.value),
                    },
                  })
                }
                min={0.5}
                max={10}
              />
            </div>
          )}

          {config.type === 'breakout' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Breakout Threshold (ATR)"
                type="number"
                step="0.1"
                value={config.parameters.breakoutThreshold || 2}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      breakoutThreshold: parseFloat(e.target.value),
                    },
                  })
                }
                min={1}
                max={5}
              />
              <Input
                label="Volume Threshold"
                type="number"
                step="0.1"
                value={config.parameters.volumeThreshold || 1.5}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      volumeThreshold: parseFloat(e.target.value),
                    },
                  })
                }
                min={1}
                max={3}
              />
              <Input
                label="Lookback Periods"
                type="number"
                value={config.parameters.lookbackPeriods || 20}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    parameters: {
                      ...config.parameters,
                      lookbackPeriods: parseInt(e.target.value),
                    },
                  })
                }
                min={5}
                max={50}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save Strategy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StrategyConfig;