import React from 'react';
import { Calendar, Trash2, Edit2 } from 'lucide-react';
import { DailyProgress } from '../../types';
import { formatDateToReadable } from '../../utils/dateUtils';

interface DayProgressCardProps {
  progress: DailyProgress;
  isToday: boolean;
  onDelete: (date: string) => void;
  onEdit: (progress: DailyProgress) => void;
}

export function DayProgressCard({ progress, isToday, onDelete, onEdit }: DayProgressCardProps) {
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
            {isToday ? 'Today' : formatDateToReadable(progress.date)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${
            completionRate >= 70 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-yellow-600 dark:text-yellow-400'
          }`}>
            {completionRate}% Complete
          </span>
          {!isToday && (
            <>
              <button
                onClick={() => onEdit(progress)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                title="Edit progress"
              >
                <Edit2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              </button>
              <button
                onClick={() => onDelete(progress.date)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                title="Delete progress"
              >
                <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
              </button>
            </>
          )}
        </div>
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