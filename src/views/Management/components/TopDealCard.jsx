import React from 'react'
import DealCard from './DealCard'
const data=[1,2,3,4,5,6,7]

const TopDealCard = () => {
  return (
    <div className=''>
        <p className='text-2xl font-bold'>
            Top Deals
        </p>
        <div className='mt-4 flex flex-col space-y-[10px]'>
          {data.map((item)=>(
            <DealCard/>
          ))}
        </div>
        
        
    </div>
  )
}

export default TopDealCard