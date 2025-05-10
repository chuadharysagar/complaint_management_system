import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const BarChartContainer = ({ data }) => {
  const transformedData = (data || [])
    .map(item => {
      const obj = { name: item.category.charAt(0).toUpperCase() + item.category.slice(1) };

      item.statusCounts.forEach(stat => {
        const statusKey = stat.status.charAt(0).toUpperCase() + stat.status.slice(1);
        obj[statusKey] = stat.count;
      });
      return obj;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full h-[450px] bg-lightGray rounded-lg p-6 pt-3 flex flex-col gap-8 shadow-md">
      <div className='flex justify-between'>
        <p className='font-bold text-lg'>Status By Category</p>
        <img src="/more.png" alt="more options" className='h-[20px] w-[20px] cursor-pointer' />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData} // Pass the transformed data to the chart
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="Pending" fill="#FF8042" />
          <Bar dataKey="Resolved" fill="#4EAA52" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartContainer;
