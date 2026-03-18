// CipherTrade-frontend/src/components/risk/CircuitBreaker.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CircuitBreakerProps {
  reason: string;
  expiresAt: string;
}

const CircuitBreaker: React.FC<CircuitBreakerProps> = ({ reason, expiresAt }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-100 dark:bg-red-900/30 border-2 border-red-600 rounded-lg p-4"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Circuit Breaker Activated
          </h3>
          <p className="mt-1 text-red-600 dark:text-red-400">{reason}</p>
          <div className="mt-3 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-red-600 dark:text-red-400">
                Auto-resets at: {new Date(expiresAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {/* Manual reset */}}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
            >
              Reset Manually
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CircuitBreaker;