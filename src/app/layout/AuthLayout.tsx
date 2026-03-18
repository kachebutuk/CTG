// CipherTrade-frontend/src/app/layout/AuthLayout.tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full px-6"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/assets/logo.svg" 
              alt="CipherTrade" 
              className="h-12 mx-auto"
            />
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Auth Form */}
          {children}
        </motion.div>
      </div>
      
      {/* Right side - Hero/Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center">
        <div className="max-w-md text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to CipherTrade</h1>
          <p className="text-xl opacity-90 mb-8">
            Decode the markets with algorithmic precision
          </p>
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard 
              icon="📊"
              title="Real-time Data"
              description="Live market data from major exchanges"
            />
            <FeatureCard 
              icon="🤖"
              title="Auto Trading"
              description="Automated strategies with risk management"
            />
            <FeatureCard 
              icon="📈"
              title="Analytics"
              description="Advanced technical analysis tools"
            />
            <FeatureCard 
              icon="🔒"
              title="Secure"
              description="Bank-grade security for your funds"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ 
  icon, title, description 
}) => (
  <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-semibold text-sm">{title}</h3>
    <p className="text-xs opacity-80">{description}</p>
  </div>
);

export default AuthLayout;