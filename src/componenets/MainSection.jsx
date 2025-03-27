import React from 'react';
import './mainSection.css';

const MainSection = () => {
  return (
    <main className='main-section'>
      <div className='column'>
        <h2>To Do</h2>
        <div className='task-card'>
          <h3>UI Design Review</h3>
          <p>Finalize wireframes</p>
        </div>
      </div>
      <div className='column'>
        <h2>In Progress</h2>
        <div className='task-card'>
          <h3>Backend Development</h3>
          <p>API implementation</p>
        </div>
      </div>
      <div className='column'>
        <h2>Done</h2>
        <div className='task-card'>
          <h3>Project Setup</h3>
          <p>Initial configuration</p>
        </div>
      </div>
    </main>
  );
};

export default MainSection;
