import React, { useEffect, useState } from 'react'
import UserItemTable from '../components/UserItemTable'
import apiRequest from '../utils/apiRequest';
import {toast} from 'react-toastify'

const UsersList = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const res = await apiRequest.get("/admin/users", {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (error) {
      console.log("failed to fetch user details", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])


  const handleDeleteClick = async (userId) => {
    try {

      const res = await apiRequest.delete(`/admin/delete/${userId}`,{
        withCredentials:true,
      });
      fetchUserData();
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error deleting user", error);
    }
  }

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-lg font-bold'>All Users</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                User Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Role
              </th>
              <th scope='col' className=' px-6 py-3'>
                Updated At
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {userData.map((user, index) => {
              return <UserItemTable key={index}
                username={user.displayName}
                email={user.email}
                updatedAt={user.updatedAt}
                handleDeleteClick={handleDeleteClick}
                userId={user._id}
                role = {user.role}
              />
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UsersList;