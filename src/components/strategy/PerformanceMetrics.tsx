// CipherTrade-frontend/src/components/strategy/PerformanceMetrics.tsx
import React from 'react';

interface PerformanceMetricsProps {
  metrics: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    expectancy: number;
    avgWin: number;
    avgLoss: number;
    largestWin: number;
    largestLoss: number;
    avgHoldingTime: string;
    totalTrades: number;
  };
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Returns */}
      <MetricSection title="Returns">
        <MetricRow
          label="Total Return"
          value={formatPercent(metrics.totalReturn)}
          color={metrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}
        />
        <MetricRow
          label="Annualized"
          value={formatPercent(metrics.annualizedReturn)}
          color={metrics.annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'}
        />
      </MetricSection>

      {/* Risk Metrics */}
      <MetricSection title="Risk Metrics">
        <MetricRow label="Sharpe Ratio" value={metrics.sharpeRatio.toFixed(2)} />
        <MetricRow label="Sortino Ratio" value={metrics.sortinoRatio.toFixed(2)} />
        <MetricRow label="Calmar Ratio" value={metrics.calmarRatio.toFixed(2)} />
        <MetricRow label="Max Drawdown" value={formatPercent(metrics.maxDrawdown)} color="text-red-600" />
      </MetricSection>

      {/* Trade Statistics */}
      <MetricSection title="Trade Statistics">
        <MetricRow label="Win Rate" value={formatPercent(metrics.winRate)} />
        <MetricRow label="Profit Factor" value={metrics.profitFactor.toFixed(2)} />
        <MetricRow label="Expectancy" value={formatCurrency(metrics.expectancy)} />
        <MetricRow label="Total Trades" value={metrics.totalTrades.toString()} />
      </MetricSection>

      {/* Trade Sizes */}
      <MetricSection title="Trade Sizes">
        <MetricRow label="Avg Win" value={formatCurrency(metrics.avgWin)} color="text-green-600" />
        <MetricRow label="Avg Loss" value={formatCurrency(metrics.avgLoss)} color="text-red-600" />
        <MetricRow label="Largest Win" value={formatCurrency(metrics.largestWin)} color="text-green-600" />
        <MetricRow label="Largest Loss" value={formatCurrency(metrics.largestLoss)} color="text-red-600" />
        <MetricRow label="Avg Hold Time" value={metrics.avgHoldingTime} />
      </MetricSection>
    </div>
  );
};

const MetricSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
      {title}
    </h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const MetricRow: React.FC<{
  label: string;
  value: string;
  color?: string;
}> = ({ label, value, color = 'text-gray-900 dark:text-white' }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className={`font-mono font-medium ${color}`}>{value}</span>
  </div>
);

export default PerformanceMetrics;