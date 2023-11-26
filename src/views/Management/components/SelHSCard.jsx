import { Select } from 'antd'
import React from 'react'

const SelHSCard = () => {
  return (
    <div className='w-full'>
        <div className='mb-2'>Select homestay</div>
        <Select className='w-full'
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
    </div>
  )
}

export default SelHSCard