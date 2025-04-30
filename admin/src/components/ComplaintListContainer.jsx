import React, { useState } from 'react';
import Complaint from './Complaint';

const categories = ["All", "Hostel", "Mess", "Sports", "Academics", "IT", "Medical"];

const ComplaintListContainer = () => {
   const [selected, setSelected] = useState("All");

   return (
      <div className='flex flex-col'>
         {/* Title + Search Bar */}
         <div className='flex justify-between items-center mb-4'>
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

         {/* Category Tabs */}
         <div className="flex gap-6 border-b border-gray-200 mb-4">
            {categories.map((category) => (
               <p
                  key={category}
                  onClick={() => setSelected(category)}
                  className={`pb-2 text-[15px] font-medium transition-all duration-200 ${selected === category
                        ? 'border-b-2 text-green'
                        : ""} hover:text-green cursor-pointer`}
               >
                  {category}
               </p>
            ))}
         </div>

         {/* COMPLAINT LIST  */}
         <div>
          <Complaint/>
         </div>
      </div>
   );
};

export default ComplaintListContainer;
