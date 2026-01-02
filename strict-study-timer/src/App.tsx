import { useState } from 'react';
import { QuickBar } from './components/QuickBar';
import { TaskList } from './components/TaskList';
import { calendarManager } from './services/CalendarSyncManager';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await calendarManager.sync();
      setTasks(fetchedTasks);
    } catch (err: any) {
      console.error("Sync failed:", err);
      // Fallback for demo purposes if ID is invalid
      // Relaxed check: Fallback on ANY error since we know the ID is a placeholder
      const errorMessage = err?.message || "Unknown error";
      setError(`Google Sync failed (${errorMessage}). Loading Demo Data...`);
      setTimeout(() => loadDemoData(), 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoData = () => {
    const now = new Date();
    const demoTasks: Task[] = [
      {
        id: '1',
        title: 'Math Revision (Missed)',
        startTime: new Date(now.getTime() - 7200000), // 2 hours ago
        endTime: new Date(now.getTime() - 3600000),   // 1 hour ago
        status: 'TIME_OVER'
      },
      {
        id: '2',
        title: 'Physics Study Block',
        startTime: new Date(now.getTime() + 3600000), // in 1 hour
        endTime: new Date(now.getTime() + 7200000),   // in 2 hours
        status: 'ACTIVE'
      },
       {
        id: '3',
        title: 'Literature Review',
        startTime: new Date(now.getTime() + 10800000),
        endTime: new Date(now.getTime() + 14400000),
        status: 'ACTIVE'
      }
    ];
    setTasks(demoTasks);
    setError(null);
  };

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <QuickBar onSync={handleSync} isLoading={isLoading} />

      {error && (
        <div style={{
          backgroundColor: '#FFF3E0',
          color: '#E65100',
          padding: '12px',
          margin: '20px 24px',
          borderRadius: '8px',
          border: '1px solid #FFE0B2'
        }}>
          {error}
        </div>
      )}

      <TaskList tasks={tasks} />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
