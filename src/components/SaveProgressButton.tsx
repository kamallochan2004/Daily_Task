import React from 'react';
import { Save, Lock } from 'lucide-react';
import { TaskProgress } from '../types';
import { scheduleData } from '../data/scheduleData';

interface SaveProgressButtonProps {
  currentProgress: TaskProgress[];
  onSave: () => void;
}

export function SaveProgressButton({ currentProgress, onSave }: SaveProgressButtonProps) {
  const totalTasks = scheduleData.reduce((acc, block) => acc + block.tasks.length, 0);
  const completedTasks = currentProgress.filter(task => task.completed).length;
  const completionRate = (completedTasks / totalTasks) * 100;
  const canSave = completionRate >= 70;

  return (
    <button
      onClick={onSave}
      disabled={!canSave}
      className={`fixed bottom-20 right-4 px-4 py-2 rounded-lg shadow-lg 
        transition-all duration-300 flex items-center space-x-2
        ${canSave 
          ? 'bg-green-500 hover:bg-green-600 text-white hover:shadow-xl' 
          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      title={canSave 
        ? 'Save today\'s progress' 
        : 'Complete at least 70% of tasks to save progress'}
    >
      {canSave ? (
        <>
          <Save className="w-4 h-4" />
          <span>Save Progress ({Math.round(completionRate)}%)</span>
        </>
      ) : (
        <>
          <Lock className="w-4 h-4" />
          <span>{Math.round(completionRate)}% Completed (Need 70%)</span>
        </>
      )}
    </button>
  );
}