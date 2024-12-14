import { DailyProgress, ProgressHistory } from '../types';

export const calculateCompletionRate = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100);
};

export const isProgressSignificant = (progress: DailyProgress): boolean => {
  return (progress.totalCompleted / progress.totalTasks) >= 0.7;
};

export const sortProgressByDate = (progress: DailyProgress[]): DailyProgress[] => {
  return [...progress].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const updateHistoryWithProgress = (
  history: ProgressHistory,
  updatedProgress: DailyProgress
): ProgressHistory => {
  const updatedDailyProgress = history.dailyProgress.map(p =>
    p.date === updatedProgress.date ? updatedProgress : p
  );

  return {
    ...history,
    dailyProgress: updatedDailyProgress
  };
};