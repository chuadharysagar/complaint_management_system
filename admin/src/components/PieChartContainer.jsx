import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Resolved', value: 150 },
  { name: 'Pending', value: 80 },
  { name: 'In Progress', value: 40 },
];

const COLORS = ['#4EAA52', '#FF8042', '#9966ff'];

const PieChartContainer = () => {
  return (
    <div className='w-full h-[400px] bg-lightGray p-6 pt-3 flex flex-col rounded-lg shadow-md'>
     <div className='flex justify-between'>
      <p className='font-bold text-lg'>Complaint Status</p>
      <img src="/more.png" alt="more optionns" className='h-[20px] w-[20px] cursor-pointer'/>
     </div>
      
      {/* Chart with fixed height to leave space for legend */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"  // shifted up to make room for legend
              outerRadius={90}
              innerRadius={60}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
