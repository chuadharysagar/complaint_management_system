import React from 'react'
import StatusCardContainer from './StatusCardContainer'

const MainContainer = () => {
   return (
      <div className='flex bg-red'>
         {/* ledt side container */}
         <div className='flex flex-col'>
            <StatusCardContainer />
         </div>
         {/* right side container */}
         <div className='flex flex-col'>

         </div>
      </div>
   )
}

export default MainContainer