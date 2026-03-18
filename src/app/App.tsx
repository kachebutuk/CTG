// CipherTrade-frontend/src/app/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { WebSocketProvider } from '../contexts/WebSocketContext';

// Layouts
import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';
import AuthLayout from './layout/AuthLayout';

// Pages
import Overview from './pages/dashboard/Overview';
import Trading from './pages/dashboard/Trading';
import Analytics from './pages/dashboard/Analytics';
import RiskManagement from './pages/dashboard/RiskManagement';
import Strategies from './pages/dashboard/Strategies';
import Settings from './pages/dashboard/Settings';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <WebSocketProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout><Overview /></MainLayout>} />
                
                <Route path="/login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                
                <Route path="/register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
                
                <Route path="/forgot-password" element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                } />
                
                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Overview />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/trading" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Trading />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Analytics />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/risk" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <RiskManagement />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/strategies" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Strategies />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Settings />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </WebSocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;