import React from 'react';
import StatusCard from './StatusCard';
import { useAdminStore } from '../utils/useAdminStore';

const StatusCardContainer = () => {
  const { stats, prevStats, selectedCategory } = useAdminStore();

  const filterStats = (data, category) => {
    if (!data) return [];
    return category === 'all'
      ? data
      : data.filter((item) => item.category === category);
  };

  const curr = filterStats(stats, selectedCategory);
  const prev = filterStats(prevStats, selectedCategory);

  const getCount = (data, status) => {
    return data.reduce((acc, item) => {
      const found = item.statusCounts.find((s) => s.status === status);
      return acc + (found?.count || 0);
    }, 0);
  };

  const totalCurr = curr.reduce((acc, item) => acc + item.total, 0);
  const totalPrev = prev.reduce((acc, item) => acc + item.total, 0);
  const pendingCurr = getCount(curr, 'pending');
  const pendingPrev = getCount(prev, 'pending');
  const resolvedCurr = getCount(curr, 'resolved');
  const resolvedPrev = getCount(prev, 'resolved');

  const resolutionRateCurr = totalCurr === 0 ? 0 : Math.round((resolvedCurr / totalCurr) * 100);
  const resolutionRatePrev = totalPrev === 0 ? 0 : Math.round((resolvedPrev / totalPrev) * 100);

  const resolutionRateChange = `+ ${resolutionRatePrev}% from last month`;

  const statusData = [
    {
      name: 'Total',
      title: 'Total complaints',
      count: totalCurr,
      status: `${totalPrev} from last month`,
    },
    {
      name: 'Pending',
      title: 'Pending complaints',
      count: pendingCurr,
      status: `${pendingPrev} from last month`,
    },
    {
      name: 'Resolved',
      title: 'Resolved complaints',
      count: resolvedCurr,
      status: `${resolvedPrev} from last month`,
    },
    {
      name: 'Count',
      title: 'Resolution Rate',
      count: `${resolutionRateCurr}%`,
      status: resolutionRateChange,
    },
  ];

  return (
    <div className="flex gap-6 flex-wrap">
      {statusData.map((data) => (
        <StatusCard
          key={data.name}
          title={data.title}
          count={data.count}
          status={data.status}
          name={data.name}
        />
      ))}
    </div>
  );
};

export default StatusCardContainer;
