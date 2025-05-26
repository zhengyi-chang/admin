import { Pie } from '@ant-design/charts';
import React, { useState } from 'react';
import './styles.css';

const userSourceData = [
  { name: 'Wallet Address', value: 63877, color: '#8979FF' },
  { name: 'Email', value: 97125, color: '#FF928A' },
  { name: 'Google', value: 72871, color: '#3CC3DF' },
  { name: 'Apple ID', value: 48021, color: '#FFAE4C' },
];

const data3 = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: '其他',
    value: 5,
  },
];

function measureTextWidth(text: string, style: any): { width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { width: 0, height: 0 };

  context.font = `${style.fontWeight || 'normal'} ${style.fontSize || 14}px ${
    style.fontFamily || 'Arial'
  }`;
  const metrics = context.measureText(text);
  return {
    width: metrics.width,
    height: (style.fontSize || 14) * 1.2,
  };
}

function renderStatistic(containerWidth: number, text: string, style: any) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
  const R = containerWidth / 2;

  let scale = 1;

  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))),
      1,
    );
  }

  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
    scale < 1 ? 1 : 'inherit'
  };">${text}</div>`;
}

const pieConfig: any = {
  appendPadding: 10,
  data: data3,
  angleField: 'value',
  colorField: 'type',
  radius: 1,
  innerRadius: 0.64,
  meta: {
    value: {
      formatter: (v: any) => `${v} ¥`,
    },
  },
  label: {
    type: 'inner',
    offset: '-50%',
    style: {
      textAlign: 'center',
    },
    autoRotate: false,
    content: '{value}',
  },
  statistic: {
    title: {
      offsetY: -4,
      customHtml: (
        container: { getBoundingClientRect: () => { width: any; height: any } },
        view: any,
        datum: { type: any },
      ) => {
        const { width, height } = container.getBoundingClientRect();
        const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
        const text = datum ? datum.type : '总计';
        return renderStatistic(d, text, {
          fontSize: 28,
        });
      },
    },
    content: {
      offsetY: 4,
      style: {
        fontSize: '32px',
      },
      customHtml: (
        container: { getBoundingClientRect: () => { width: any } },
        view: any,
        datum: { value: any },
        data: any[],
      ) => {
        const { width } = container.getBoundingClientRect();
        const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
        return renderStatistic(width, text, {
          fontSize: 32,
        });
      },
    },
  },
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
    {
      type: 'pie-statistic-active',
    },
  ],
};

const UserSourceSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('total');

  return (
    <div className="user-source-section">
      <div className="user-source-header">
        <div className="user-source-title">User Source</div>
        <div className="user-source-filters">
          <button
            className={`filter-button ${activeFilter === 'total' ? 'active' : ''}`}
            onClick={() => setActiveFilter('total')}
          >
            Total
          </button>
          <button
            className={`filter-button ${activeFilter === 'pointsIssued' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pointsIssued')}
          >
            Points Issued
          </button>
          <button
            className={`filter-button ${activeFilter === 'completedKYC' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completedKYC')}
          >
            Completed KYC
          </button>
          <button
            className={`filter-button ${activeFilter === 'scanToEarn' ? 'active' : ''}`}
            onClick={() => setActiveFilter('scanToEarn')}
          >
            Scan to Earn
          </button>
          <button
            className={`filter-button ${activeFilter === 'mintedPID' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mintedPID')}
          >
            Minted PID
          </button>
          <button
            className={`filter-button ${activeFilter === 'mintedVoucher' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mintedVoucher')}
          >
            Minted Voucher
          </button>
        </div>
      </div>
      <div className="user-source-content">
        <div className="user-stats">
          <Pie {...pieConfig} />
        </div>
        <div className="user-metrics">
          <div className="total-users-container">
            <div className="total-users">281,894</div>
            <div className="total-users-label">Total Users</div>
          </div>
          <div className="metrics-grid">
            {userSourceData.map((item, index) => (
              <div className="metric-item" key={index}>
                <div className="metric-header">
                  <div className="metric-dot" style={{ backgroundColor: item.color }} />
                  <div className="metric-value">{item.value.toLocaleString()}</div>
                </div>
                <div className="metric-label">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSourceSection;
