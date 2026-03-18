// CipherTrade-frontend/src/components/common/SideBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Overview' },
    { path: '/trading', icon: '📈', label: 'Trading' },
    { path: '/analytics', icon: '📉', label: 'Analytics' },
    { path: '/risk', icon: '🛡️', label: 'Risk Management' },
    { path: '/strategies', icon: '🤖', label: 'Strategies' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      className="fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
    >
      <div className="h-full flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className={`w-6 h-6 text-gray-500 transform transition-transform ${
              collapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Premium Plan
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;