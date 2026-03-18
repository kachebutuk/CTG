// CipherTrade-frontend/src/components/strategy/BacktestResults.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';

interface BacktestResultsProps {
  results: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    totalTrades: number;
    equityCurve: Array<{ date: string; equity: number }>;
    monthlyReturns: Array<{ month: string; return: number }>;
    trades: Array<any>;
  };
  onClose: () => void;
}

const BacktestResults: React.FC<BacktestResultsProps> = ({ results, onClose }) => {
  return (
    <Modal title="Backtest Results" onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard
            label="Total Return"
            value={`${(results.totalReturn * 100).toFixed(2)}%`}
            color={results.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}
          />
          <MetricCard
            label="Sharpe Ratio"
            value={results.sharpeRatio.toFixed(2)}
            color={results.sharpeRatio >= 1 ? 'text-green-600' : 'text-yellow-600'}
          />
          <MetricCard
            label="Max Drawdown"
            value={`${(results.maxDrawdown * 100).toFixed(2)}%`}
            color="text-red-600"
          />
          <MetricCard
            label="Win Rate"
            value={`${(results.winRate * 100).toFixed(1)}%`}
            color={results.winRate >= 0.5 ? 'text-green-600' : 'text-yellow-600'}
          />
          <MetricCard
            label="Profit Factor"
            value={results.profitFactor.toFixed(2)}
            color={results.profitFactor >= 1.5 ? 'text-green-600' : 'text-yellow-600'}
          />
          <MetricCard
            label="Total Trades"
            value={results.totalTrades.toString()}
            color="text-blue-600"
          />
        </div>

        {/* Equity Curve */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
          <LineChart
            data={results.equityCurve}
            xKey="date"
            yKey="equity"
            height={300}
            color="#3b82f6"
            fill
          />
        </div>

        {/* Monthly Returns */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Returns</h3>
          <BarChart
            data={results.monthlyReturns.map(r => r.return * 100)}
            labels={results.monthlyReturns.map(r => r.month)}
            height={250}
          />
        </div>

        {/* Trade List */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Symbol</th>
                  <th className="text-left py-2">Direction</th>
                  <th className="text-right py-2">Entry</th>
                  <th className="text-right py-2">Exit</th>
                  <th className="text-right py-2">P&L</th>
                </tr>
              </thead>
              <tbody>
                {results.trades.slice(0, 10).map((trade, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">{trade.date}</td>
                    <td className="py-2">{trade.symbol}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          trade.direction === 'LONG'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {trade.direction}
                      </span>
                    </td>
                    <td className="text-right font-mono">${trade.entry.toFixed(2)}</td>
                    <td className="text-right font-mono">${trade.exit.toFixed(2)}</td>
                    <td
                      className={`text-right font-mono ${
                        trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {/* Export as CSV */}}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export CSV
          </button>
          <button
            onClick={() => {/* Export as PDF */}}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Export Report
          </button>
        </div>
      </div>
    </Modal>
  );
};

const MetricCard: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
    <div className={`text-lg font-semibold ${color}`}>{value}</div>
  </div>
);

export default BacktestResults;