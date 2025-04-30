import React from 'react'

const Complaint = () => {
  return (
    <div className='flex flex-col gap-2 border-b-2 hover:bg-lightGray p-4 rounded-lg shadow-sm'>
      <p className='text-sm text-right'>Today ,10:30 AM</p>
      <p>The WiFi has been down since yesterday evening in Block C.
          Many students are unable to complete their assignments on time.</p>
      <div className='flex justify-between'>
         <p className='text-sm p-1 rounded-lg bg-green'>Hostel</p>
         <p className='text-sm cursor-pointer bg-red p-1 rounded-lg'>New</p>
      </div>
    </div>
  )
}

export default Complaint