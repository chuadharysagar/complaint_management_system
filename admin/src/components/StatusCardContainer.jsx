import React from 'react'
import StatusCard from './StatusCard'

const statusData = [
  { name:"Total",title: "Total complaints", count: 78, status: "+12% from last month" },
  { name:"Pending",title: "Pending complaints", count: 45, status: "+10% from last month" },
  { name:"Resolved",title: "Resolved Complaints", count: 20, status: "+18% from last month" },
  { name:"Count",title: "Resolution Rate", count: 13, status: "+3% from last month" }
]

const StatusCardContainer = () => {
  return (
    <div className="flex gap-6 flex-wrap">
      {statusData.map((data, index) => (
        <StatusCard key={data.name}
          title={data.title}
          count={data.count}
          status={data.status}
          name ={data.name}
        />
      ))}
    </div>
  )
}

export default StatusCardContainer;
