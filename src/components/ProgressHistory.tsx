import React from 'react';
import { Calendar, Award, TrendingUp } from 'lucide-react';
import { DailyProgress, ProgressHistory as ProgressHistoryType } from '../types';
import { formatDate, isToday } from '../utils/dateUtils';

interface ProgressHistoryProps {
  history: ProgressHistoryType;
}

export function ProgressHistory({ history }: ProgressHistoryProps) {
  const sortedProgress = [...history.dailyProgress]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Progress History
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Current Streak: {history.currentStreak} days
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Longest Streak: {history.longestStreak} days
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedProgress.map((day) => (
          <DayProgress
            key={day.date}
            progress={day}
            isToday={isToday(day.date)}
          />
        ))}
      </div>
    </div>
  );
}

function DayProgress({ progress, isToday }: { progress: DailyProgress; isToday: boolean }) {
  const completionRate = Math.round((progress.totalCompleted / progress.totalTasks) * 100);
  
  return (
    <div className={`p-4 rounded-lg ${
      isToday 
        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
        : 'bg-gray-50 dark:bg-gray-700'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
          <span className={`text-sm font-medium ${
            isToday 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>
            {isToday ? 'Today' : progress.date}
          </span>
        </div>
        <span className={`text-sm font-medium ${
          completionRate >= 70 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-yellow-600 dark:text-yellow-400'
        }`}>
          {completionRate}% Complete
        </span>
      </div>
      <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
        <div
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
            completionRate >= 70 
              ? 'bg-green-500 dark:bg-green-400' 
              : 'bg-yellow-500 dark:bg-yellow-400'
          }`}
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  );
}