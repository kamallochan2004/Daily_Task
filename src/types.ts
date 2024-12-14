export interface StudyBlock {
  id: string;
  title: string;
  duration: string;
  tasks: StudyTask[];
}

export interface StudyTask {
  id: string;
  description: string;
  completed: boolean;
}

export interface TimeBlock {
  title: string;
  duration: string;
  tasks: string[];
}

export interface TaskProgress {
  blockIndex: number;
  taskIndex: number;
  completed: boolean;
}

export interface DailyProgress {
  date: string;
  tasks: TaskProgress[];
  totalCompleted: number;
  totalTasks: number;
}

export interface ProgressHistory {
  dailyProgress: DailyProgress[];
  goalDate: string | null;
  startDate: string;
  currentStreak: number;
  longestStreak: number;
}

export interface ProgressStats {
  currentStreak: number;
  longestStreak: number;
  totalTasksCompleted: number;
  averageCompletion: number;
}

export interface ProgressUpdateEvent {
  type: 'delete' | 'edit';
  date: string;
  progress?: DailyProgress;
}