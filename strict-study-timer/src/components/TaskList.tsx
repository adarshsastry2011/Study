import React from 'react';
import type { Task } from '../types';
import { format } from 'date-fns';
import { Clock, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div style={styles.emptyState}>
        <Clock size={48} color="#ccc" />
        <p>No tasks yet. Sync your calendar to start strict mode.</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            ...styles.card,
            ...(task.status === 'TIME_OVER' ? styles.cardOver : styles.cardActive)
          }}
        >
          <div style={styles.header}>
            <span style={styles.time}>
              {format(task.startTime, 'HH:mm')} - {format(task.endTime, 'HH:mm')}
            </span>
            {task.status === 'TIME_OVER' ? (
              <span style={styles.badgeOver}>TIME OVER</span>
            ) : (
              <span style={styles.badgeActive}>ACTIVE</span>
            )}
          </div>
          <h3 style={styles.taskTitle}>{task.title}</h3>
          <div style={styles.footer}>
            {task.status === 'TIME_OVER' ? (
               <div style={styles.statusRow}>
                 <AlertCircle size={16} />
                 <span>Missed</span>
               </div>
            ) : (
              <div style={styles.statusRow}>
                <Clock size={16} />
                <span>In Progress / Upcoming</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '24px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    color: '#666',
    fontSize: '1.2rem',
  },
  card: {
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
    minHeight: '160px',
    border: '1px solid #eee',
  },
  cardActive: {
    backgroundColor: '#fff',
    borderLeft: '6px solid #4CAF50',
  },
  cardOver: {
    backgroundColor: '#f9f9f9',
    borderLeft: '6px solid #F44336',
    opacity: 0.8,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  time: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: 600,
  },
  badgeActive: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  badgeOver: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  taskTitle: {
    margin: '0 0 16px 0',
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#333',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#555',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }
} as const;
