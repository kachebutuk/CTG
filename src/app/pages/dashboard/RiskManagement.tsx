// CipherTrade-frontend/src/app/pages/dashboard/RiskManagement.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RiskGauges from '../../../components/risk/RiskGauges';
import ExposureLimits from '../../../components/risk/ExposureLimits';
import DrawdownChart from '../../../components/risk/DrawdownChart';
import CircuitBreaker from '../../../components/risk/CircuitBreaker';
import { useRisk } from '../../../hooks/useRisk';

const RiskManagement: React.FC = () => {
  const { 
    riskMetrics, 
    limits, 
    circuitBreaker, 
    updateLimits 
  } = useRisk();

  const [editingLimits, setEditingLimits] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Risk Management Dashboard
      </h1>

      {/* Circuit Breaker Status */}
      {circuitBreaker.active && (
        <CircuitBreaker 
          reason={circuitBreaker.reason}
          expiresAt={circuitBreaker.expiresAt}
        />
      )}

      {/* Risk Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RiskGauges 
          title="Current Drawdown"
          value={riskMetrics.drawdown}
          min={0}
          max={15}
          unit="%"
          thresholds={{ warning: 10, danger: 15 }}
        />
        <RiskGauges 
          title="Daily Loss"
          value={riskMetrics.dailyLoss}
          min={0}
          max={3}
          unit="%"
          thresholds={{ warning: 2, danger: 3 }}
        />
        <RiskGauges 
          title="Leverage Used"
          value={riskMetrics.leverage}
          min={0}
          max={3}
          unit="x"
          thresholds={{ warning: 2, danger: 2.5 }}
        />
        <RiskGauges 
          title="VaR (95%)"
          value={riskMetrics.var95}
          min={0}
          max={10000}
          unit="$"
          thresholds={{ warning: 5000, danger: 8000 }}
        />
      </div>

      {/* Exposure Limits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Position Limits</h2>
            <button
              onClick={() => setEditingLimits(!editingLimits)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingLimits ? 'Save' : 'Edit'}
            </button>
          </div>
          <ExposureLimits 
            limits={limits}
            editable={editingLimits}
            onUpdate={updateLimits}
          />
        </div>

        {/* Drawdown Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Drawdown History</h2>
          <DrawdownChart 
            data={riskMetrics.drawdownHistory}
            height={200}
          />
        </div>
      </div>

      {/* Risk Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Detailed Risk Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2">Metric</th>
                <th className="text-left py-2">Current</th>
                <th className="text-left py-2">Limit</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {riskMetrics.detailed.map((metric, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">{metric.name}</td>
                  <td className="py-2">{metric.current}</td>
                  <td className="py-2">{metric.limit}</td>
                  <td className="py-2">
                    <StatusBadge status={metric.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const StatusBadge: React.FC<{ status: 'healthy' | 'warning' | 'danger' }> = ({ status }) => {
  const colors = {
    healthy: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default RiskManagement;