import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Hostel',
    Pending: 4000,
    Resolved: 2400,
    amt: 2400,
  },
  {
    name: 'Mess',
    Pending: 3000,
    Resolved: 1398,
    amt: 2210,
  },
  {
    name: 'Academics',
    Pending: 2000,
    Resolved: 9800,
    amt: 2290,
  },
  {
    name: 'Sports',
    Pending: 2780,
    Resolved: 3908,
    amt: 2000,
  },
  {
    name: 'Medical',
    Pending: 1890,
    Resolved: 4800,
    amt: 2181,
  },
  {
    name: 'IT',
    Pending: 2390,
    Resolved: 3800,
    amt: 2500,
  },
];


const BarChartContainer = () => {
  return (
    <div className="w-full h-[450px] bg-lightGray rounded-lg p-6 pt-3 flex flex-col gap-8 shadow-md">
      <div className='flex justify-between'>
        <p className='font-bold text-lg'>Cotegory By Status</p>
        <img src="/more.png" alt="more optionns" className='h-[20px] w-[20px] cursor-pointer' />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Pending" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Resolved" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


export default BarChartContainer