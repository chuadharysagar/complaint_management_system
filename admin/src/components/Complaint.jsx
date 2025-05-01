import React, { useState } from 'react';
import { useAdminStore } from '../utils/useAdminStore';

const Complaint = ({ data }) => {
  const [openStatus, setOpenStatus] = useState(false);
  const [localStatus, setLocalStatus] = useState(data.status);

  // Optional: Also update in global store
  const { setCurrentStatus } = useAdminStore();

  const handleStatusChange = (newStatus) => {
    setLocalStatus(newStatus);
    setCurrentStatus(newStatus); // Optional, in case you want to use it globally
    setOpenStatus(false);
  };

  // Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return { color: '#ff0000', bg: '#ffd6cc' };
      case 'InProgress':
        return { color: '#996600', bg: '#ffffcc' };
      case 'Resolved':
        return { color: '#009900', bg: '#b3ffb3' };
      default:
        return { color: '#333', bg: '#eee' };
    }
  };

  const { color: statusColor, bg: statusBgColor } = getStatusStyle(localStatus);

  // Category styling
  const getCategoryStyle = (category) => {
    const styles = {
      Academics: { color: '#009900', bg: '#b3ffb3' },
      Mess: { color: '#996600', bg: '#ffffcc' },
      Hostel: { color: '#9900ff', bg: '#ddccff' },
      IT: { color: '#e68a00', bg: '#ffe0b3' },
      Sports: { color: '#0099cc', bg: '#ccf5ff' },
      Medical: { color: '#9900ff', bg: '#ddccff' },
    };
    return styles[category] || { color: '#333', bg: '#eee' };
  };

  const { color: categoryColor, bg: categoryBgColor } = getCategoryStyle(data.category);

  return (
    <div className='flex flex-col gap-2 border-b-2 hover:bg-lightGray p-4 rounded-lg shadow-sm'>
      <div className='flex justify-end gap-2'>
        <p className='text-sm bg-purpleLight p-1 rounded-md'>{data.user}</p>
        <p className='text-sm bg-purpleLight p-1 rounded-md'>{data.date}</p>
      </div>
      <p>{data.description}</p>

      <div className='flex justify-between items-start relative'>
        <p
          className='text-sm p-1 rounded-lg bg-gray-200 pl-2 pr-2 font-medium'
          style={{
            backgroundColor: categoryBgColor,
            color: categoryColor,
          }}
        >
          {data.category}
        </p>

        {/* Status Button */}
        <div className='relative'>
          <p
            className='text-sm cursor-pointer p-1 pl-2 pr-2 rounded-lg font-medium'
            style={{
              backgroundColor: statusBgColor,
              color: statusColor,
            }}
            onClick={() => setOpenStatus((prev) => !prev)}
          >
            {localStatus}
          </p>

          {openStatus && (
            <div className='absolute right-0 mt-1 bg-lightGray shadow-lg rounded-md z-10'>
              {["InProgress", "Resolved"].map((option) => (
                <p
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className='px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer'
                >
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaint;
