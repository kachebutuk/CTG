// CipherTrade-frontend/src/components/common/ui/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden';
  const hoverClasses = hoverable ? 'transition-transform hover:scale-105 cursor-pointer' : '';

  const content = (
    <>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: hoverable ? 1.02 : 1 }}
        className={`${baseClasses} ${hoverClasses} ${className}`}
        onClick={onClick}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={`${baseClasses} ${className}`}>{content}</div>;
};

export default Card;