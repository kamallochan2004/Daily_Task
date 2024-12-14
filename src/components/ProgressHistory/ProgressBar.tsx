import React from 'react';
import { calculateCompletionRate } from '../../utils/progressUtils';

interface ProgressBarProps {
  completed: number;
  total: number;
  variant?: 'success' | 'warning' | 'neutral';
}

export function ProgressBar({ completed, total, variant = 'neutral' }: ProgressBarProps) {
  const percentage = calculateCompletionRate(completed, total);
  
  const getBarColor = () => {
    switch (variant) {
      case 'success':
        return 'from-green-500 to-green-400';
      case 'warning':
        return 'from-yellow-500 to-yellow-400';
      default:
        return 'from-blue-500 to-blue-400';
    }
  };

  return (
    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getBarColor()} 
          rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}