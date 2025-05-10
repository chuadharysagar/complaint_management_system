import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import apiRequest from '../utils/apiRequest';
import { useAdminStore } from '../utils/useAdminStore';



const COLOR_MAP = {
  Resolved: '#4EAA52',
  Pending: '#FF8042',
  'In Progress': '#9966ff',
};

const transformToPieChartData = (stats, selectedCategory) => {
  const statusTotals = { resolved: 0, pending: 0, inprogress: 0 };

  stats.forEach(item => {
    const categoryMatch =
      selectedCategory === "all" ||
      item.category?.toLowerCase().trim() === selectedCategory;

    if (categoryMatch) {
      item.statusCounts?.forEach(({ status, count }) => {
        const key = status.toLowerCase();
        if (statusTotals[key] !== undefined) {
          statusTotals[key] += count;
        }
      });
    }
  });

  const rawData = [
    { name: 'Resolved', value: statusTotals.resolved },
    { name: 'Pending', value: statusTotals.pending },
    { name: 'In Progress', value: statusTotals.inprogress },
  ];

  // Optional: filter out 0 values if needed
  return rawData.filter(entry => entry.value > 0);
};



const PieChartContainer = ({ data }) => {
  const selectedCategory = useAdminStore((state) => state.selectedCategory);

  const pieData = transformToPieChartData(data, selectedCategory);

  return (
    <div className='w-full h-[400px] bg-lightGray p-6 pt-3 flex flex-col rounded-lg shadow-md'>
      <div className='flex justify-between'>
        <p className='font-bold text-lg'>Complaint Status</p>
        <img src="/more.png" alt="more optionns" className='h-[20px] w-[20px] cursor-pointer' />
      </div>

      {/* Chart with fixed height to leave space for legend */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="45%"  // shifted up to make room for legend
              outerRadius={90}
              innerRadius={60}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLOR_MAP[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartContainer;
