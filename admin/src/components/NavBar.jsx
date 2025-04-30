import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between bg-purple h-14 pl-10 pr-16'>
      <div className='text-2xl font-bold'>Logo</div>
      <div>
        <img src="/noAvatar.png" alt="profile picture" className="h-[40px] w-[40px]"/>
      </div>
    </div>
  )
}

export default NavBar