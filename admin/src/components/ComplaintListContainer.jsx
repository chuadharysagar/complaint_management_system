import React, { useEffect, useState } from 'react';
import Complaint from './Complaint';
import { useAdminStore } from '../utils/useAdminStore';
import apiRequest from '../utils/apiRequest.js'
import useAuthStore from '../utils/useAuthStore.js';
import { toast } from 'react-toastify';

const categories = ["all", "hostel", "mess", "sports", "academics", "it", "medical", "others"];

const getCategoryFromRole = (role) => {
  const roleCategoryMap = {
    hostel_admin: "hostel",
    mess_admin: "mess",
    medical_admin: "medical",
    sport_admin: "sports",
    academics_admin: "academics",
    IT_admin: "it",
  };
  return roleCategoryMap[role] || null;
};


const ComplaintListContainer = () => {
  const { currentUser } = useAuthStore();
  const [complaintData, setComplaintData] = useState([]);
  const { selectedCategory, setSelectedCategory, fetchStats } = useAdminStore();
  const [searchTerm, setSerarchTerm] = useState("");


  // fetch all comlaint data
  const fetAllComplaints = async (search = "") => {
    try {
      const res = await apiRequest.get(`/admin/complaint?search=${search}`, {
        withCredentials: true,
      });
      setComplaintData(res.data);
    } catch (error) {
      console.log("Failed to fetch complaints", error);
    }
  }

  useEffect(() => {
    fetAllComplaints();
    if (currentUser?.role !== "super_admin") {
      const category = getCategoryFromRole(currentUser?.role);
      setSelectedCategory(category);
    }
  }, [currentUser])


  // update complaint status 
  const updateComplaintStatus = async (updatedStatus, userId) => {
    try {
      const res = await apiRequest.put(`/admin/updatestatus/${userId}`, {
        status: updatedStatus,
      },
        { withCredentials: true },
      );
      await fetchStats();
    } catch (error) {
      console.log("Error updating complaint status", error);
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSerarchTerm(value);
    fetAllComplaints(value);
  }


  // Delete the complaint 
  const handleDeleteClick = async(complaintId)=>{
     try {
      const res = await apiRequest.delete(`/admin/delete/complaint/${complaintId}`);
      fetAllComplaints();
      await fetchStats();
      toast.success(res.data.message);
     } catch (error) {
      console.log("Error Deleting complaint",error);
     }
  }


  // Filter data based on selectedCategory
  const filteredComplaints = selectedCategory === "all"
    ? complaintData
    : complaintData.filter((item) =>
      item?.category.toLowerCase().trim() === selectedCategory?.toLowerCase().trim());

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
            value={searchTerm}
            onChange={handleSearchChange}
            className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200'
          />
        </div>
      </div>

      {/* Scrollable Category Tabs on Mobile */}
      {currentUser?.role === "super_admin" && (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 border-b border-gray-200 mb-4 min-w-max px-2">
            {categories.map((category) => (
              <p
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`pb-2 text-[15px] font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === category ? 'border-b-2 text-green' : ''
                  } hover:text-green cursor-pointer`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* COMPLAINT LIST */}
      {filteredComplaints.length === 0 ?
        <p className='text-center font-semibold text-lg p-4'>No Complaint Registered Yet</p> :
        (<div className='h-[500px] overflow-y-auto scrollbar-hide'>
          {filteredComplaints.map((complaint, index) => (
            <Complaint handleDeleteClick={handleDeleteClick} key={index} data={complaint} updateComplaintStatus={updateComplaintStatus} />
          ))}
        </div>)}
    </div>
  );
};

export default ComplaintListContainer;
