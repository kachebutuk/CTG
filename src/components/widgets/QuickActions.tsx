// CipherTrade-frontend/src/components/widgets/QuickActions.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Trade',
      icon: '📈',
      color: 'bg-blue-600',
      onClick: () => navigate('/trading'),
    },
    {
      label: 'Backtest',
      icon: '🔬',
      color: 'bg-purple-600',
      onClick: () => navigate('/strategies'),
    },
    {
      label: 'Risk Check',
      icon: '🛡️',
      color: 'bg-green-600',
      onClick: () => navigate('/risk'),
    },
    {
      label: 'Export Report',
      icon: '📊',
      color: 'bg-orange-600',
      onClick: () => {/* Export report */},
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center text-white`}>
              <span className="text-lg">{action.icon}</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;