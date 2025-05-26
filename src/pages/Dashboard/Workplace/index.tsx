import React from 'react';
import FilterSection from './components/FilterSection';
import GrowthAnalysisSection from './components/GrowthAnalysisSection';
import QuestData from './components/QuestData';
import StatsSection from './components/StatsSection';
import UserSourceSection from './components/UserSourceSection';
import './styles.css';

const Workplace: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">Overview</div>
      <div className="dashboard-section">
        <FilterSection />
      </div>

      <div className="dashboard-section">
        <StatsSection />
      </div>

      <div className="dashboard-section">
        <UserSourceSection />
      </div>

      <div className="dashboard-section">
        <GrowthAnalysisSection />
      </div>

      <div className="dashboard-section">
        <QuestData />
      </div>
    </div>
  );
};

export default Workplace;
