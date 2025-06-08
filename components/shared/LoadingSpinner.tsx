
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g., 'text-sky-400'
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'text-sky-400',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div 
      className={`animate-spin rounded-full ${sizeClasses[size]} ${color} border-b-transparent ${className}`} 
      role="status"
      aria-label="در حال بارگذاری..."
    >
      <span className="sr-only">در حال بارگذاری...</span>
    </div>
  );
};

export default LoadingSpinner;
