import React, { useState } from 'react';
import { Link } from 'react-router'

const NavBar = () => {
  const [showLogOut, setShowLogOut] = useState(false);
  const user ="user";

  return (
    <div className='flex items-center justify-between bg-lightGray h-14 pl-10 pr-16 relative'>
      <div className= 'flex items-center gap-8'>
        <Link to="/" className='text-2xl font-bold'>HostelCare</Link>
        {user==="user"?<></>:
        <Link to="/users" className='hover:text-green p-1 rounded-md hidden sm:block'>Manage Users</Link>}
      </div>
      {/* Profile + Arrow container */}
      <div className='relative flex items-center gap-2 cursor-pointer'>
        <img src="/noAvatar.png" alt="profile picture" className="h-[40px] w-[40px]" />
        <img
          src="/arrow.svg"
          alt="Arrow"
          onClick={() => setShowLogOut(prev => !prev)}
          className='h-4 w-4'
        />

        {/* Logout Dropdown */}
        {showLogOut && (
          <p className='absolute top-full w-[80px] right-0 mt-2 bg-purpleLight font-medium shadow-lg rounded-md px-4 py-2 text-sm z-10'>
            LogOut
          </p>
        )}
      </div>
    </div>
  );
};

export default NavBar;
