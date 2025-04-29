import React from 'react';
import styles from './Tab.module.css';

interface TabProps {
  activeTab: 'today' | 'week';
  onTabChange: (tab: 'today' | 'week') => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tab} ${activeTab === 'today' ? styles.active : ''}`}
        onClick={() => onTabChange('today')}
      >
        오늘 슈트 추천
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'week' ? styles.active : ''}`}
        onClick={() => onTabChange('week')}
      >
        지난 슈트 추천
      </button>
    </div>
  );
};

export default Tab; 