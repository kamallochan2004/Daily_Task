import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 
          rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}