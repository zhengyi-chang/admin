import type { LineConfig } from '@ant-design/charts';
import { Line } from '@ant-design/charts';
import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useState } from 'react';
import './styles.css';

const data2 = [
  {
    name: 'X6',
    star: 50,
  },
  {
    name: 'G',
    star: 101,
  },
  {
    name: 'AVA',
    star: 201,
  },
  {
    name: 'G2Plot',
    star: 301,
  },
];

const lineConfig: LineConfig = {
  data: data2,
  xField: 'name',
  yField: 'star',
  color: '#292fe1',
  smooth: true,
  point: {
    size: 5,
    shape: 'circle',
    style: {
      fill: '#292fe1',
      stroke: '#fff',
      lineWidth: 2,
    },
  },
  tooltip: {
    customContent: (title, items) => {
      if (!items || !items.length) return null;
      const item = items[0];
      return `
        <div class="growth-chart-tooltip">
          <div class="growth-chart-tooltip-date">${title}</div>
          <div class="growth-chart-tooltip-value">${Number(item.value).toLocaleString()}</div>
          <div class="growth-chart-tooltip-growth">+14.67%</div>
        </div>
      `;
    },
  },
  xAxis: {
    label: {
      style: {
        fill: '#8a8b8d',
        fontSize: 12,
      },
    },
  },
  yAxis: {
    label: {
      style: {
        fill: '#8a8b8d',
        fontSize: 12,
      },
      formatter: (text: string) => {
        const v = Number(text);
        if (v >= 1000000) {
          return `${(v / 1000000).toFixed(2)}M`;
        }
        if (v >= 1000) {
          return `${(v / 1000).toFixed(0)}k`;
        }
        return text;
      },
    },
  },
};

const GrowthAnalysisSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Monthly');
  const [questType, setQuestType] = useState('May 2025');

  return (
    <div className="growth-analysis-section">
      <div className="growth-title">User Growth Analysis</div>
      <div className="growth-header">
        <div className="growth-time-filters">
          <button
            className={`growth-time-button ${activeFilter === 'Monthly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Monthly')}
          >
            Monthly
          </button>
          <button
            className={`growth-time-button ${activeFilter === 'Yearly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Yearly')}
          >
            Yearly
          </button>
        </div>
        <div>
          <Select
            value={questType}
            onChange={setQuestType}
            suffixIcon={<CaretDownOutlined style={{ color: '#292fe1' }} />}
            className="quest-type-select"
            options={[
              { value: 'May 2025', label: 'May 2025' },
              { value: 'April 2025', label: 'April 2025' },
              { value: 'March 2025', label: 'March 2025' },
              { value: 'February 2025', label: 'February 2025' },
              { value: 'January 2025', label: 'January 2025' },
            ]}
          />
        </div>
      </div>
      <div className="growth-chart-container">
        <Line {...lineConfig} />
      </div>
    </div>
  );
};

export default GrowthAnalysisSection;
