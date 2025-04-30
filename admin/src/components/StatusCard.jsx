import React from 'react'

const StatusCard = ({name,title,count,status}) => {
  const statusColor = name === "Pending" ? "text-red":"text-green";

  return (
    <div key={name} className='bg-yellow h-[200px] w-[200px] rounded-md shadow-md flex flex-col gap-6 items-start p-4 odd:bg-purple even:bg-yellow'>
      <p>{title}</p>
      <p className='font-bold text-3xl'>{count}</p>
       <p className={statusColor}>{status}</p>
    </div>
  )
}

export default StatusCard