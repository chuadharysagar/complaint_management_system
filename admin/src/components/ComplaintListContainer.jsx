import React from 'react';
import Complaint from './Complaint';
import { useAdminStore } from '../utils/useAdminStore';

const categories = ["All", "Hostel", "Mess", "Sports", "Academics", "IT", "Medical"];

const complaintData = [
  {
    user: "user1",
    description: "The WiFi has been down since yesterday evening in Block C. Many students are unable to complete their assignments on time.",
    date: "today, 10:23",
    category: "IT",
    status: "New",
  },
  {
    user: "user2",
    description: "The water supply in Hostel Block B is irregular. It didn't come at all this morning.",
    date: "today, 09:15",
    category: "Hostel",
    status: "New",
  },
  {
    user: "user3",
    description: "The food quality in the mess has dropped significantly this week. Many students are complaining of stomach issues.",
    date: "yesterday, 19:45",
    category: "Mess",
    status: "InProgress",
  },
  {
    user: "user4",
    description: "Basketball court lights are not functioning. It's difficult to play after 6 PM.",
    date: "yesterday, 17:30",
    category: "Sports",
    status: "Resolved",
  },
  {
    user: "user5",
    description: "The new timetable is clashing with lab hours for third-year students. Kindly look into it.",
    date: "today, 11:10",
    category: "Academics",
    status: "InProgress",
  },
  {
    user: "user6",
    description: "The college clinic ran out of basic medicines like paracetamol. It's urgent to restock them.",
    date: "today, 08:50",
    category: "Medical",
    status: "Resolved",
  },
];

const ComplaintListContainer = () => {
  const { selectedCategory, setSelectedCategory } = useAdminStore();

  // Filter data based on selectedCategory
  const filteredComplaints = selectedCategory === "All"
    ? complaintData
    : complaintData.filter((item) => item.category === selectedCategory);

  return (
    <div className='flex flex-col shadow-[0_-0px_5px_rgba(0,0,0,0.1)]
 sm:justify-center p-1 rounded-md'>
      {/* Title + Search Bar */}
      <div className='flex justify-between items-center mb-4 flex-wrap gap-4'>
        <h3 className='text-lg font-semibold'>Recent Complaints</h3>
        <div className='relative'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>🔍</span>
          <input
            type="text"
            placeholder='Search a Complaint here'
            className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200'
          />
        </div>
      </div>

      {/* Scrollable Category Tabs on Mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 border-b border-gray-200 mb-4 min-w-max px-2">
          {categories.map((category) => (
            <p
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`pb-2 text-[15px] font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === category ? 'border-b-2 text-green' : ''
                } hover:text-green cursor-pointer`}
            >
              {category}
            </p>
          ))}
        </div>
      </div>

      {/* COMPLAINT LIST */}
      <div className='h-[500px] overflow-y-auto scrollbar-hide'>
        {filteredComplaints.map((complaint, index) => (
          <Complaint key={index} data={complaint} />
        ))}
      </div>
    </div>
  );
};

export default ComplaintListContainer;
