import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../utils/useAdminStore';
import { format } from 'timeago.js'

const Complaint = ({ data, updateComplaintStatus }) => {
  const [openStatus, setOpenStatus] = useState(false);
  const [localStatus, setLocalStatus] = useState(data.status);

  useEffect(() => {
    setLocalStatus(data.status);
  }, [data.status]);

  // Optional: Also update in global store
  const { setCurrentStatus } = useAdminStore();

  const handleStatusChange = async (newStatus) => {
    if (newStatus === localStatus) return;
    setLocalStatus(newStatus);
    setCurrentStatus(newStatus);
    setOpenStatus(false);

    await updateComplaintStatus(newStatus.toLowerCase(), data._id);
  };

  // Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { color: '#ff0000', bg: '#ffd6cc' };
      case 'inprogress':
        return { color: '#996600', bg: '#ffffcc' };
      case 'resolved':
        return { color: '#009900', bg: '#b3ffb3' };
      default:
        return { color: '#333', bg: '#eee' };
    }
  };

  const { color: statusColor, bg: statusBgColor } = getStatusStyle(localStatus);

  // Category styling
  const getCategoryStyle = (category) => {
    const styles = {
      academics: { color: '#009900', bg: '#b3ffb3' },
      mess: { color: '#996600', bg: '#ffffcc' },
      hostel: { color: '#9900ff', bg: '#ddccff' },
      it: { color: '#e68a00', bg: '#ffe0b3' },
      sports: { color: '#0099cc', bg: '#ccf5ff' },
      medical: { color: '#9900ff', bg: '#ddccff' },
    };
    return styles[category] || { color: '#333', bg: '#eee' };
  };

  const { color: categoryColor, bg: categoryBgColor } = getCategoryStyle(data.category);

  return (
    <div className='flex flex-col gap-2 border-b-2 hover:bg-lightGray p-4 rounded-lg shadow-sm'>
      <div className='flex justify-end gap-2'>
        <p className='text-sm bg-purpleLight p-1 rounded-md hidden sm:block'>{data.createdBy.displayName}</p>
        <p className='text-sm bg-purpleLight p-1 rounded-md'>{format(data.createdAt)}</p>
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
          {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
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
            {localStatus.charAt(0).toUpperCase() + localStatus.slice(1)}
          </p>
  
          {openStatus && (
            <div className='absolute right-0 mt-1 bg-lightGray shadow-lg rounded-md z-10'>
              {["inprogress", "resolved"].map((option) => (
                <p
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className='px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer'
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
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
