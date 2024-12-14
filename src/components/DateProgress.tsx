import React from 'react';
import { Calendar } from 'lucide-react';
import { calculateDaysRemaining, calculateProgressPercentage } from '../utils/dateUtils';
import { ProgressHistory } from '../types';

interface DateProgressProps {
  progressHistory: ProgressHistory;
  onSetGoalDate: (date: string) => void;
}

export function DateProgress({ progressHistory, onSetGoalDate }: DateProgressProps) {
  const daysRemaining = calculateDaysRemaining(progressHistory.goalDate);
  const completedDays = progressHistory.dailyProgress.length;
  const progressPercentage = calculateProgressPercentage(
    progressHistory.startDate,
    progressHistory.goalDate,
    completedDays
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Goal Progress
        </h2>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
          <input
            type="date"
            value={progressHistory.goalDate || ''}
            onChange={(e) => onSetGoalDate(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
              rounded-md px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Days Remaining
          </h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {daysRemaining}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Days Completed
          </h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {completedDays}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Overall Progress
          </h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {progressPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
}