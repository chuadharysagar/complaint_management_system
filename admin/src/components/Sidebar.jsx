import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [selected, setSeleted] = useState("userlist");

  return (
    <div className='flex flex-col bg-purpleLight'>
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
        <div className='w-[50%] sm:w-[80%] absolute right-0'>
          <Link
            to='/users'
            className={`flex items-center border border-black gap-3 font-medium px-3 py-2  
              shadow-lg rounded-md hover:bg-purple ${selected === "userlist" ? 'bg-purple' : ''}`}
            onClick={() => setSeleted("userlist")}
          >
            <img src='/blog_icon.png' alt='user icon' width={28} />
            <p className="hidden sm:block">User List</p>
          </Link>

          <Link
            to='/adduser'
            className={`mt-5 flex items-center border border-black gap-3 font-medium 
              px-3 py-2  shadow-lg rounded-md hover:bg-purple ${selected === "adduser" ? 'bg-purple' : ''}`}
            onClick={() => setSeleted("adduser")}
          >
            <img src='/add_icon.png' alt='add icon' width={28} />
            <p className='hidden sm:block'>Add User</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
