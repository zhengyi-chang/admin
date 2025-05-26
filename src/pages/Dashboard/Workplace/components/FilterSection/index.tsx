import { ProFormDateRangePicker } from '@ant-design/pro-components';
import React, { useState } from 'react';
import './styles.less';

const FilterSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="filter-section">
      <button
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => setActiveFilter('all')}
      >
        All
      </button>
      <button
        className={`filter-button ${activeFilter === 'yesterday' ? 'active' : ''}`}
        onClick={() => setActiveFilter('yesterday')}
      >
        Yesterday
      </button>
      <button
        className={`filter-button ${activeFilter === 'lastWeek' ? 'active' : ''}`}
        onClick={() => setActiveFilter('lastWeek')}
      >
        Last week
      </button>
      <button
        className={`filter-button ${activeFilter === 'lastMouth' ? 'active' : ''}`}
        onClick={() => setActiveFilter('lastMouth')}
      >
        Last mouth
      </button>
      <div className="date-picker">
        <ProFormDateRangePicker
          name="dateRange"
          fieldProps={{
            style: { width: '100%' },
            bordered: true,
          }}
        />
      </div>
    </div>
  );
};

export default FilterSection;
