import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DailyProgress, TaskProgress } from '../../types';
import { scheduleData } from '../../data/scheduleData';
import { formatDateToReadable } from '../../utils/dateUtils';

interface EditProgressModalProps {
  progress: DailyProgress;
  onClose: () => void;
  onSave: (updatedProgress: DailyProgress) => void;
}

export function EditProgressModal({ progress, onClose, onSave }: EditProgressModalProps) {
  const [tasks, setTasks] = useState<TaskProgress[]>(progress.tasks);

  const handleToggleTask = (blockIndex: number, taskIndex: number) => {
    setTasks(prev => {
      const taskProgress = prev.find(
        t => t.blockIndex === blockIndex && t.taskIndex === taskIndex
      );

      if (taskProgress) {
        return prev.map(t =>
          t.blockIndex === blockIndex && t.taskIndex === taskIndex
            ? { ...t, completed: !t.completed }
            : t
        );
      }

      return [
        ...prev,
        { blockIndex, taskIndex, completed: true }
      ];
    });
  };

  const handleSave = () => {
    const totalCompleted = tasks.filter(task => task.completed).length;
    const totalTasks = scheduleData.reduce((acc, block) => acc + block.tasks.length, 0);
    
    onSave({
      ...progress,
      tasks,
      totalCompleted,
      totalTasks
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Edit Progress - {formatDateToReadable(progress.date)}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {scheduleData.map((block, blockIndex) => (
            <div key={blockIndex} className="border dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                {block.title}
              </h3>
              <div className="space-y-2">
                {block.tasks.map((task, taskIndex) => {
                  const isCompleted = tasks.some(
                    t => t.blockIndex === blockIndex && 
                    t.taskIndex === taskIndex && 
                    t.completed
                  );

                  return (
                    <div
                      key={taskIndex}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => handleToggleTask(blockIndex, taskIndex)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 
                          focus:ring-blue-500 dark:border-gray-600 
                          dark:focus:ring-blue-400"
                      />
                      <span className={`text-sm ${
                        isCompleted 
                          ? 'line-through text-gray-400 dark:text-gray-500' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
              bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 
              dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
              rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}