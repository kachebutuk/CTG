// CipherTrade-frontend/src/app/pages/dashboard/Settings.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import { useTheme } from '../../../hooks/useTheme';

const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'api', name: 'API Keys', icon: '🔑' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'risk', name: 'Risk Defaults', icon: '🛡️' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'advanced', name: 'Advanced', icon: '🚀' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {activeTab === 'general' && <GeneralSettings user={user} onUpdate={updateProfile} />}
          {activeTab === 'api' && <APISettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'risk' && <RiskDefaults />}
          {activeTab === 'appearance' && <AppearanceSettings theme={theme} onToggleTheme={toggleTheme} />}
          {activeTab === 'advanced' && <AdvancedSettings />}
        </div>
      </div>
    </motion.div>
  );
};

const GeneralSettings: React.FC<{ user: any; onUpdate: Function }> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    timezone: user?.timezone || 'UTC',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">General Settings</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Timezone</label>
        <select
          value={formData.timezone}
          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

const APISettings: React.FC = () => {
  const [apiKeys, setApiKeys] = useState([
    { exchange: 'Binance', key: '****', enabled: true },
    { exchange: 'Coinbase', key: '****', enabled: false },
  ]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">API Keys</h2>
      
      {apiKeys.map((api, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div>
            <h3 className="font-medium">{api.exchange}</h3>
            <p className="text-sm text-gray-500">API Key: {api.key}</p>
          </div>
          <div className="flex items-center space-x-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={api.enabled} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Edit</button>
          </div>
        </div>
      ))}

      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Add New API Key
      </button>
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    telegramAlerts: false,
    slackAlerts: true,
    tradeNotifications: true,
    riskAlerts: true,
    dailyReports: false,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      
      {Object.entries(settings).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <label className="text-sm font-medium capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={() => setSettings({ ...settings, [key]: !value })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      ))}
    </div>
  );
};

const RiskDefaults: React.FC = () => {
  const [defaults, setDefaults] = useState({
    maxPositionSize: 100000,
    maxLeverage: 3,
    riskPerTrade: 1,
    maxDailyLoss: 3,
    maxDrawdown: 15,
    consecutiveLossLimit: 3,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Risk Defaults</h2>
      
      {Object.entries(defaults).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <label className="text-sm font-medium capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setDefaults({ ...defaults, [key]: parseFloat(e.target.value) })}
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

const AppearanceSettings: React.FC<{ theme: string; onToggleTheme: () => void }> = ({ 
  theme, onToggleTheme 
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Appearance</h2>
      
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Dark Mode</label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={onToggleTheme}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

const AdvancedSettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
      
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
        <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Danger Zone</h3>
        <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;