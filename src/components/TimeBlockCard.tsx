import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { TimeBlock } from '../types';

interface TimeBlockCardProps {
  block: TimeBlock;
  onToggleTask: (taskIndex: number) => void;
  completedTasks: boolean[];
}

export function TimeBlockCard({ block, onToggleTask, completedTasks }: TimeBlockCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 
      hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]
      border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{block.title}</h3>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{block.duration}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {block.tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 cursor-pointer group"
            onClick={() => onToggleTask(index)}
          >
            <div className={`flex-shrink-0 mt-1 transition-colors duration-200
              ${completedTasks[index] ? 'text-green-500 dark:text-green-400' : 
              'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className={`transition-all duration-200
              ${completedTasks[index] 
                ? 'line-through text-gray-400 dark:text-gray-500' 
                : 'text-gray-700 dark:text-gray-300'}`}>
              {task}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}