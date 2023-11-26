import React from 'react'
import RevenueChart from './RevenueChart'

const RevenueAnalyticsCard = () => {
  return (
    <div>
      <div className='flex flex-col'>
        <p className='text-2xl md:text-xl'>
            Revenue Analytics
        </p>
        <div className='flex justify-center'>
            <RevenueChart/>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default RevenueAnalyticsCard