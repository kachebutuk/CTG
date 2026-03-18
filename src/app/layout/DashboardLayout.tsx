// CipherTrade-frontend/src/app/layout/DashboardLayout.tsx
import React, { ReactNode, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import DashboardHeader from '../../components/common/DashboardHeader';
import DashboardSidebar from '../../components/common/DashboardSidebar';
import QuickActions from '../../components/common/QuickActions';
import PerformanceWidget from '../../components/widgets/PerformanceWidget';
import RiskWidget from '../../components/widgets/RiskWidget';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <DashboardSidebar 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader 
            onToggleTheme={toggleTheme}
            theme={theme}
            sidebarCollapsed={sidebarCollapsed}
          />
          
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            <PerformanceWidget 
              title="Total P&L"
              value="+$12,450.32"
              change="+5.2%"
              trend="up"
            />
            <PerformanceWidget 
              title="Win Rate"
              value="68.5%"
              change="+2.1%"
              trend="up"
            />
            <RiskWidget 
              title="Drawdown"
              value="3.2%"
              status="warning"
            />
            <PerformanceWidget 
              title="Open Positions"
              value="4"
              change="+1"
              trend="neutral"
            />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Content (2/3 width) */}
              <div className="lg:col-span-2 space-y-4">
                {children}
              </div>
              
              {/* Right Sidebar (1/3 width) */}
              <div className="space-y-4">
                <QuickActions />
                {/* Additional widgets */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;