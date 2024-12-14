import { useState, useEffect } from 'react';
import { DailyProgress, ProgressHistory, TaskProgress } from '../types';
import { formatDate, calculateStreak } from '../utils/dateUtils';

const STORAGE_KEY = 'study-progress';

export function useProgress() {
  const [progressHistory, setProgressHistory] = useState<ProgressHistory>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      dailyProgress: [],
      goalDate: null,
      startDate: formatDate(new Date()),
      currentStreak: 0,
      longestStreak: 0
    };
  });

  const [currentDayProgress, setCurrentDayProgress] = useState<TaskProgress[]>(() => {
    const today = formatDate(new Date());
    const todayProgress = progressHistory.dailyProgress.find(p => p.date === today);
    return todayProgress?.tasks || [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressHistory));
  }, [progressHistory]);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        saveDailyProgress();
      }
    };

    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [currentDayProgress]);

  const saveDailyProgress = () => {
    const today = formatDate(new Date());
    const totalTasks = currentDayProgress.length;
    const totalCompleted = currentDayProgress.filter(task => task.completed).length;
    const completionRate = totalCompleted / totalTasks;

    if (completionRate >= 0.7) {
      const updatedProgress = progressHistory.dailyProgress.filter(p => p.date !== today);
      const newDailyProgress: DailyProgress = {
        date: today,
        tasks: currentDayProgress,
        totalCompleted,
        totalTasks
      };

      const { currentStreak, longestStreak } = calculateStreak([
        ...updatedProgress,
        newDailyProgress
      ]);

      setProgressHistory(prev => ({
        ...prev,
        dailyProgress: [...updatedProgress, newDailyProgress],
        currentStreak,
        longestStreak
      }));
    }
  };

  const resetCurrentDay = () => {
    if (window.confirm('Are you sure you want to reset today\'s progress?')) {
      setCurrentDayProgress([]);
    }
  };

  const toggleTask = (blockIndex: number, taskIndex: number) => {
    setCurrentDayProgress(prev => {
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

  const updateProgressHistory = (updatedHistory: ProgressHistory) => {
    setProgressHistory(updatedHistory);
  };

  const setGoalDate = (date: string) => {
    setProgressHistory(prev => ({
      ...prev,
      goalDate: date
    }));
  };

  return {
    currentDayProgress,
    progressHistory,
    saveDailyProgress,
    resetCurrentDay,
    toggleTask,
    setGoalDate,
    updateProgressHistory
  };
}