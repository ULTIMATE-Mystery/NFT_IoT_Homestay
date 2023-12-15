import React from 'react'
import UserSlice from 'reducers/user/reducer'
const title = ["Total UserSlice", "Total Revenue", "Total Products", "Total Ratio"];
const data = [
  ["Total Users",11238,45],
  ["Total Revenue",56432,-12], 
  ["Total Products",238,21], 
  ["Total Ratio",2.6,12],

]
const TotalCard = ({data}) => {
  return (
    <div className='w-full h-full p-4 border border-slate-600 rounded-md p-2 flex flex-row justify-between'>
        <div className="flex-col flex space-y-4">
          <div className='text-xl'>{data[0]}</div>
          <div className='text-3xl font-bold'>{data[1]}</div>
          <button className='text-left text-blue-600'>View all</button>
        </div>
        <div className="flex-col flex justify-between">
          <div className='flex my-auto w-full'>Chart</div>
          <div className='text-right justify-right flex flex-col'>
            <div>12%</div>
            <div>this month</div>
          </div>
        </div>
    </div>
  )
}

export default TotalCard