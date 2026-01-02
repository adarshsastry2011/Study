import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';

interface QuickBarProps {
  onSync: () => void;
  isLoading: boolean;
}

export const QuickBar: React.FC<QuickBarProps> = ({ onSync, isLoading }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Strict Study Timer</h1>
      <button onClick={onSync} disabled={isLoading} style={styles.button}>
        {isLoading ? (
          <RefreshCw style={styles.iconSpin} size={20} />
        ) : (
          <Calendar size={20} />
        )}
        <span style={{ marginLeft: '8px' }}>Sync Calendar</span>
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky' as 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#333',
    fontWeight: 700,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.2s',
  },
  iconSpin: {
    animation: 'spin 1s linear infinite',
  }
} as const;
