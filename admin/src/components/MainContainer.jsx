import React from 'react'
import StatusCardContainer from './StatusCardContainer'
import BarChartContainer from './BarChartContainer'
import PieChartContainer from './PieChartContainer'
import ComplaintListContainer from './ComplaintListContainer'

const MainContainer = () => {
      return (
         <div className='flex w-full h-screen'>
           {/* left side container */}
           <div className='w-[55%] flex flex-col p-6 gap-10'>
             <StatusCardContainer />
             <ComplaintListContainer/>
           </div>
           {/* right side container */}
           <div className='w-[45%] flex flex-col gap-10 p-6'>
           <PieChartContainer/>
           <BarChartContainer/>
           </div>
         </div>
       );
}

export default MainContainer