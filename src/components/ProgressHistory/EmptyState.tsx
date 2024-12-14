import React from 'react';
import { ClipboardList } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <ClipboardList className="w-12 h-12 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
        No Progress History Yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        Complete at least 70% of your daily tasks to start building your progress history.
      </p>
    </div>
  );
}