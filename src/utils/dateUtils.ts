export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDateToReadable = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const isToday = (dateStr: string): boolean => {
  const today = formatDate(new Date());
  return dateStr === today;
};

export const calculateStreak = (dailyProgress: Array<{ date: string; totalCompleted: number; totalTasks: number }>) => {
  const sortedDays = dailyProgress
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(day => (day.totalCompleted / day.totalTasks) >= 0.7);

  let currentStreak = 0;
  let longestStreak = 0;
  let previousDate: Date | null = null;

  for (const day of sortedDays) {
    const date = new Date(day.date);
    
    if (!previousDate || isConsecutiveDay(date, previousDate)) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
    previousDate = date;
  }

  return { currentStreak, longestStreak };
};

const isConsecutiveDay = (current: Date, previous: Date): boolean => {
  const diffTime = previous.getTime() - current.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

export const calculateDaysRemaining = (goalDate: string | null): number => {
  if (!goalDate) return 0;
  const today = new Date();
  const goal = new Date(goalDate);
  const diffTime = goal.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateProgressPercentage = (
  startDate: string,
  goalDate: string | null,
  completedDays: number
): number => {
  if (!goalDate) return 0;
  const start = new Date(startDate);
  const goal = new Date(goalDate);
  const totalDays = Math.ceil((goal.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.round((completedDays / totalDays) * 100);
};