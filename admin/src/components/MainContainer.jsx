import React, { useEffect, useState } from 'react';
import StatusCardContainer from './StatusCardContainer'
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
import ComplaintListContainer from './ComplaintListContainer';
import { useAdminStore } from '../utils/useAdminStore';

const MainContainer = () => {
  const { fetchStats ,stats} = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className='flex flex-col lg:flex-row w-full min-h-screen'>
      {/* Left side container */}
      <div className='w-full lg:w-[55%] flex flex-col p-4 md:p-6 gap-6'>
        <StatusCardContainer/>
        <ComplaintListContainer />
      </div>

      {/* Right side container */}
      <div className='w-full lg:w-[45%] flex flex-col p-4 md:p-6 gap-6'>
        <PieChartContainer data={stats} />
        <BarChartContainer data={stats} />
      </div>
    </div>
  );
};

export default MainContainer;
