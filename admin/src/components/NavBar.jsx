import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'
import useAuthStore from '../utils/useAuthStore';
import apiRequest from '../utils/apiRequest';

const NavBar = () => {
  const [showLogOut, setShowLogOut] = useState(false);
  const { currentUser, removeCurrentUser } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async (req, res) => {
    try {
      await apiRequest.post('/user/auth/logout', {});
      removeCurrentUser();
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex items-center justify-between bg-lightGray h-15 pl-10 pr-16 relative'>
      <div className='flex items-center gap-8'>
        <Link to="/" className='text-2xl font-bold'>HostelCare</Link>
        {currentUser.role === "super_admin" ?
          <Link to="/users" className='hover:text-green p-1 rounded-md hidden sm:block'>Manage Users</Link>
          : <></>}
      </div>
      {/* Profile + Arrow container */}
      <div className='relative items-center justify-center cursor-pointer pt-2'>
        <div className='flex gap-2 items-center'>
          <img src="/noAvatar.png" alt="profile picture" className="h-[35px] w-[35px]" />
          <img
            src="/arrow.svg"
            alt="Arrow"
            onClick={() => setShowLogOut(prev => !prev)}
            className='h-3 w-3'
          />
          </div>
          <span className='text-xs font-[400]'>{currentUser?.displayName.split()[0]}</span>

          {/* Logout Dropdown */}
          {showLogOut && (
            <p className='absolute top-full w-[80px] right-0 mt-2 bg-purpleLight font-medium shadow-lg rounded-md px-4 py-2 text-sm z-10'
              onClick={handleLogout} >
              LogOut
            </p>
          )}
        </div>
      </div>
      );
};

      export default NavBar;
