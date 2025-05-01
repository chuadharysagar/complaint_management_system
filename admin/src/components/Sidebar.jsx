import React from 'react'
import { Link } from 'react-router'

const Sidebar = () => {
   return (
      <div className='flex flex-col bg-slate-100'>
         <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
            <div className='w-[50%] sm:w-[80%] absolute right-0'>
               <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2  bg-lightGray shadow-lg rounded-md hover:bg-purple'>
                  <img src='/blog_icon.png' alt='add icon' width={28} />
                  <p>User List</p>
               </Link>

               <Link href='/admin/blogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-lightGray shadow-lg rounded-md hover:bg-purple'>
                  <img src='/add_icon.png' alt='add icon' width={28} />
                  <p>Add User</p>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Sidebar