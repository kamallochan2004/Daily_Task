import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 
        rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    >
      <RefreshCw className="w-4 h-4" />
      <span>Reset Progress</span>
    </button>
  );
}