import React from 'react';
import { GraduationCap } from 'lucide-react';
import { TimeBlockCard } from './components/TimeBlockCard';
import { ProgressBar } from './components/ProgressBar';
import { ThemeToggle } from './components/ThemeToggle';
import { DateProgress } from './components/DateProgress';
import { ProgressHistory } from './components/ProgressHistory';
import { ResetButton } from './components/ResetButton';
import { SaveProgressButton } from './components/SaveProgressButton';
import { ThemeProvider } from './context/ThemeContext';
import { scheduleData } from './data/scheduleData';
import { useProgress } from './hooks/useProgress';
import { formatDate } from './utils/dateUtils';

function AppContent() {
  const {
    currentDayProgress,
    progressHistory,
    toggleTask,
    resetCurrentDay,
    setGoalDate,
    saveDailyProgress,
    updateProgressHistory
  } = useProgress();

  const totalTasks = scheduleData.reduce((acc, block) => acc + block.tasks.length, 0);
  const completedTasks = currentDayProgress.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white 
            bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Daily Study Schedule
          </h1>
        </div>

        <DateProgress 
          progressHistory={progressHistory}
          onSetGoalDate={setGoalDate}
        />

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Today's Progress ({formatDate(new Date())})
            </h2>
          </div>
          <ProgressBar 
            completed={completedTasks} 
            total={totalTasks} 
          />
          <p className="text-center text-gray-600 dark:text-gray-400">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>

        <div className="space-y-6">
          {scheduleData.map((block, blockIndex) => (
            <TimeBlockCard
              key={blockIndex}
              block={block}
              completedTasks={currentDayProgress
                .filter(t => t.blockIndex === blockIndex)
                .map(t => t.completed)}
              onToggleTask={(taskIndex) => toggleTask(blockIndex, taskIndex)}
            />
          ))}
        </div>

        <ProgressHistory 
          history={progressHistory}
          onUpdateHistory={updateProgressHistory}
        />
      </div>
      <SaveProgressButton 
        currentProgress={currentDayProgress}
        onSave={saveDailyProgress}
      />
      <ResetButton onReset={resetCurrentDay} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;