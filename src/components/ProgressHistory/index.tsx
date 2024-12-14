import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { DailyProgress, ProgressHistory as ProgressHistoryType } from '../../types';
import { HistoryCard } from './HistoryCard';
import { EmptyState } from './EmptyState';
import { sortProgressByDate } from '../../utils/progressUtils';

interface ProgressHistoryProps {
  history: ProgressHistoryType;
  onUpdateHistory: (updatedHistory: ProgressHistoryType) => void;
}

export function ProgressHistory({ history, onUpdateHistory }: ProgressHistoryProps) {
  const handleDelete = (date: string) => {
    const updatedProgress = history.dailyProgress.filter(p => p.date !== date);
    onUpdateHistory({
      ...history,
      dailyProgress: updatedProgress
    });
  };

  const handleEdit = (progress: DailyProgress) => {
    const updatedProgress = history.dailyProgress.map(p =>
      p.date === progress.date ? progress : p
    );
    onUpdateHistory({
      ...history,
      dailyProgress: updatedProgress
    });
  };

  const sortedProgress = sortProgressByDate(history.dailyProgress);

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
        {sortedProgress.length > 0 ? (
          sortedProgress.map((progress) => (
            <HistoryCard
              key={progress.date}
              progress={progress}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}