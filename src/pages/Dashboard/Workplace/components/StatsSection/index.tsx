import React from 'react';
import './styles.less';

const Svg = (props: { style: { width: string; height: string } }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.style.width}
      height={props.style.height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <g clipPath="url(#clip0_6952_10158)">
        <path
          d="M12 24.8C18.6274 24.8 24 19.4274 24 12.8C24 6.17257 18.6274 0.799988 12 0.799988C5.37258 0.799988 0 6.17257 0 12.8C0 19.4274 5.37258 24.8 12 24.8Z"
          fill="#6F41D8"
        />
        <path
          d="M15.819 10.3197C15.5423 10.1585 15.183 10.1585 14.8785 10.3197L12.7193 11.5602L11.253 12.3687L9.09379 13.6085C8.81704 13.7705 8.45779 13.7705 8.15329 13.6085L6.43729 12.638C6.16054 12.4767 5.96704 12.1805 5.96704 11.8565V9.94249C5.96704 9.61924 6.13279 9.32299 6.43729 9.16099L8.12479 8.21749C8.40229 8.05549 8.76229 8.05549 9.06679 8.21749L10.7543 9.16099C11.0318 9.32299 11.2253 9.61924 11.2253 9.94249V11.183L12.6915 10.3467V9.10699C12.6932 8.94597 12.6501 8.78765 12.567 8.64967C12.484 8.5117 12.3643 8.39947 12.2213 8.32549L9.09379 6.54649C8.81704 6.38449 8.45779 6.38449 8.15329 6.54649L4.97029 8.32549C4.82726 8.39947 4.70757 8.5117 4.62455 8.64967C4.54153 8.78765 4.49842 8.94597 4.50004 9.10699V12.692C4.50004 13.016 4.66579 13.3122 4.97029 13.4742L8.15329 15.2532C8.43004 15.4145 8.79004 15.4145 9.09379 15.2532L11.253 14.0397L12.7193 13.2042L14.8785 11.9915C15.1553 11.8295 15.5145 11.8295 15.819 11.9915L17.5073 12.935C17.7848 13.0962 17.9775 13.3925 17.9775 13.7165V15.6305C17.9775 15.9537 17.8125 16.25 17.5073 16.412L15.8198 17.3825C15.5423 17.5445 15.1823 17.5445 14.8785 17.3825L13.1903 16.439C12.9128 16.277 12.7193 15.9807 12.7193 15.6575V14.417L11.253 15.2532V16.493C11.253 16.8162 11.4188 17.1132 11.7233 17.2745L14.9063 19.0535C15.183 19.2155 15.5423 19.2155 15.8468 19.0535L19.0298 17.2745C19.3065 17.1132 19.5 16.817 19.5 16.493V12.908C19.5017 12.747 19.4586 12.5887 19.3755 12.4507C19.2925 12.3127 19.1728 12.2005 19.0298 12.1265L15.8198 10.3197H15.819Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_6952_10158">
          <rect width="24" height="24" fill="white" transform="translate(0 0.799988)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const data = [
  {
    index: 1,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 2,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 3,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 4,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 5,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 6,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 7,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
  {
    index: 8,
    title: 'Total Users',
    value: '159,284',
    growth: '+289',
  },
];

const leftList = [
  { index: 1, symbol: 'BTC', amount: '123,456.78' },
  { index: 2, symbol: 'ETH', amount: '123,456.78' },
  { index: 3, symbol: 'LTC', amount: '123,456.78' },
  { index: 4, symbol: 'BTC', amount: '123,456.78' },
  { index: 5, symbol: 'ETH', amount: '123,456.78' },
];

const StatsSection: React.FC = () => {
  return (
    <div className="stats-grid">
      <div className="stats-left">
        {data.map((item, index) => (
          <div className="stats-item" key={index}>
            <div className="stats-item-left">
              <div className="stats-title">{item.title}</div>
              <div className="stats-value">{item.value}</div>
            </div>
            <div className="stats-growth">{item.growth}</div>
          </div>
        ))}
      </div>
      <div className="stats-right">
        <div className="income-card">
          <div className="income-header">
            <div className="income-title">PID Income</div>
            <div className="income-total">Total: 253,093,125.03 USDT</div>
          </div>
          <div className="income-stats">
            {leftList.map((item, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-left">
                  <div className="stat-index">{item.index}</div>
                  <Svg style={{ width: '24px', height: '24px' }} />
                  <div className="stat-symbol">{item.symbol}</div>
                </div>
                <div className="stat-value">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="income-card">
          <div className="income-header">
            <div className="income-title">PID Income</div>
            <div className="income-total">Total: 253,093,125.03 USDT</div>
          </div>
          <div className="income-stats">
            {leftList.map((item, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-left">
                  <div className="stat-index">{item.index}</div>
                  <Svg style={{ width: '24px', height: '24px' }} />
                  <div className="stat-symbol">{item.symbol}</div>
                </div>
                <div className="stat-value">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
