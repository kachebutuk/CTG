// CipherTrade-frontend/src/app/layout/MainLayout.tsx
import React, { ReactNode } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Footer from '../../components/common/Footer';
import AlertBanner from '../../components/common/AlertBanner';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { isConnected, lastMessage } = useWebSocket();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* WebSocket Connection Status */}
      {!isConnected && (
        <AlertBanner 
          type="warning" 
          message="WebSocket disconnected. Reconnecting..."
        />
      )}
      
      {/* Header */}
      <Header 
        user={user} 
        isAuthenticated={isAuthenticated}
        connectionStatus={isConnected ? 'connected' : 'disconnected'}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;