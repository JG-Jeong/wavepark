import React from 'react';
import styles from './Tab.module.css';

interface TabProps {
  activeTab: 'today' | 'reservation';
  onTabChange: (tab: 'today' | 'reservation') => void;
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
        className={`${styles.tab} ${activeTab === 'reservation' ? styles.active : ''}`}
        onClick={() => onTabChange('reservation')}
      >
        예약현황
      </button>
    </div>
  );
};

export default Tab; 