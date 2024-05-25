import { Select } from 'antd'
import React from 'react'

const SelHSCard = ({mode,setMode}) => {
  return (
    <div className='w-full flex flex-col justify-between py-3'>
        <div className='text-2xl font-bold mb-4'>Select homestay</div>
        <Select className='w-full mb-5'
            defaultValue={'Alexander Homestay'}
            options={[
                {
                    value: 'Alexander Homestay',
                    label: 'Alexander Homestay',
                },
                {
                  value: 'Sapa Homestay',
                  label: 'Sapa Homestay',
                },
                {
                  value: 'Add new homestay',
                  label: 'Add new homestay',
                },
            ]}
        />
        <div className='w-full flex justify-center'>
          <button
            class="w-fit px-6 py-3 text-white font-semibold bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-600 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
          
          onClick={()=>setMode("user")}>
            Switch to checkout interface
          </button>
        </div>
        
    </div>
  )
}

export default SelHSCard