import type { ColumnConfig } from '@ant-design/charts';
import { Column } from '@ant-design/charts';
import { CaretDownOutlined } from '@ant-design/icons';
import { ProFormDateRangePicker } from '@ant-design/pro-components';
import { Select } from 'antd';
import React, { useState } from 'react';
import './styles.less';

interface QuestDataProps {
  className?: string;
}

const QuestData: React.FC<QuestDataProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeChartFilter, setActiveChartFilter] = useState('weekly');
  const [questType, setQuestType] = useState('all');

  const dailyQuestData = [
    { type: 'Check-in', value: 48 },
    { type: 'Scan to Earn', value: 95 },
    { type: 'Say GMGN', value: 67 },
    { type: 'Learn News', value: 22 },
  ];

  const tutorialQuestData = [
    { type: 'Finish KYC', value: 80 },
    { type: 'Subscribe Twitter', value: 60 },
    { type: 'Join TG', value: 35 },
    { type: 'Mint PID', value: 16 },
    { type: 'Mint Voucher', value: 9 },
  ];

  const columnConfig: ColumnConfig = {
    data: dailyQuestData,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'top',
      style: {
        fill: '#8a8b8d',
        fontSize: 8,
      },
    },
    columnStyle: {
      fill: 'rgba(137, 121, 255, 0.6)',
      radius: [3, 3, 0, 0],
    },
    meta: {
      value: {
        alias: 'Users',
      },
    },
    xAxis: {
      label: {
        style: {
          fill: '#111',
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
      },
    },
    tooltip: {
      customContent: (title, items) => {
        if (!items || !items.length) return null;
        const item = items[0];
        return `
          <div class="quest-chart-tooltip">
            <div class="quest-chart-tooltip-date">${title}</div>
            <div class="quest-chart-tooltip-value">${Number(item.value).toLocaleString()}</div>
          </div>
        `;
      },
    },
  };

  const tutorialColumnConfig: ColumnConfig = {
    ...columnConfig,
    data: tutorialQuestData,
  };

  const statsData = [
    {
      title: 'Total Users',
      value: '159,284',
    },
    {
      title: 'Total Participation',
      value: '28,900',
    },
    {
      title: 'Daily Quest Users',
      value: '78,459',
    },
    {
      title: 'Daily Quest Participation',
      value: '8,900',
    },
    {
      title: 'Tutorial Quest Users',
      value: '2,203',
    },
    {
      title: 'Tutorial Quest Participations',
      value: '89,032',
    },
  ];

  return (
    <div className={`quest-data-section ${className || ''}`}>
      <div className="quest-header">
        <h1 className="quest-title">Quest Data</h1>
        <div className="quest-filters">
          <div className="quest-time-filters">
            <button
              className={`quest-filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`quest-filter-button ${activeFilter === '1d' ? 'active' : ''}`}
              onClick={() => setActiveFilter('1d')}
            >
              1D
            </button>
            <button
              className={`quest-filter-button ${activeFilter === '7d' ? 'active' : ''}`}
              onClick={() => setActiveFilter('7d')}
            >
              7D
            </button>
            <button
              className={`quest-filter-button ${activeFilter === '1m' ? 'active' : ''}`}
              onClick={() => setActiveFilter('1m')}
            >
              1M
            </button>
            <div className="quest-date-picker">
              <ProFormDateRangePicker
                name="dateRange"
                fieldProps={{
                  style: { width: '100%' },
                  bordered: false,
                }}
              />
            </div>
          </div>
          <div className="quest-type-filter">
            <span className="quest-type-label">Quest Type</span>
            <Select
              value={questType}
              onChange={setQuestType}
              suffixIcon={<CaretDownOutlined style={{ color: '#292fe1' }} />}
              className="quest-type-select"
              options={[
                { value: 'all', label: 'All' },
                { value: 'Check-in', label: 'Check-in' },
                { value: 'Say GMGN in TG', label: 'Say GMGN in TG' },
                { value: 'Scan to Earn', label: 'Scan to Earn' },
                { value: 'Learn News', label: 'Learn News' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="quest-stats-grid">
        {statsData.map((stat, index) => (
          <div className="quest-stat-card" key={index}>
            <div className="quest-stat-title">{stat.title}</div>
            <div className="quest-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="quest-charts-container">
        <div className="quest-chart-header">
          <h2 className="quest-chart-title">Daily Quest</h2>
          <div className="quest-chart-filters">
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
          </div>
        </div>
        <div className="quest-chart-card">
          <div className="quest-chart-card-content">
            <div className="quest-chart-header">
              <h2 className="quest-chart-title">Tutorial Quest</h2>
            </div>
            <div className="quest-chart-content">
              <div className="quest-chart-main">
                <Column {...tutorialColumnConfig} />
              </div>
            </div>
          </div>
          <div className="quest-chart-card-content">
            <div className="quest-chart-header">
              <h2 className="quest-chart-title">Tutorial Quest</h2>
            </div>
            <div className="quest-chart-content">
              <div className="quest-chart-main">
                <Column {...tutorialColumnConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestData;
