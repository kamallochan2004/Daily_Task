import React from 'react';
import { Calendar, Trash2, Edit2 } from 'lucide-react';
import { DailyProgress } from '../../types';
import { ProgressBar } from './ProgressBar';
import { formatDateToReadable } from '../../utils/dateUtils';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface HistoryCardProps {
  progress: DailyProgress;
  onDelete: (date: string) => void;
  onEdit: (progress: DailyProgress) => void;
}

export function HistoryCard({ progress, onDelete, onEdit }: HistoryCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const completionRate = (progress.totalCompleted / progress.totalTasks) * 100;
  
  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(progress.date);
    setShowDeleteDialog(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md 
      hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatDateToReadable(progress.date)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(progress)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-500 dark:text-gray-400 transition-colors"
            title="Edit progress"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20
              text-red-500 dark:text-red-400 transition-colors"
            title="Delete progress"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-2">
        <ProgressBar
          completed={progress.totalCompleted}
          total={progress.totalTasks}
          variant={completionRate >= 70 ? 'success' : 'warning'}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {progress.totalCompleted} of {progress.totalTasks} tasks
        </span>
        <span className={`font-medium ${
          completionRate >= 70 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-yellow-600 dark:text-yellow-400'
        }`}>
          {Math.round(completionRate)}%
        </span>
      </div>

      {showDeleteDialog && (
        <DeleteConfirmDialog
          date={formatDateToReadable(progress.date)}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}