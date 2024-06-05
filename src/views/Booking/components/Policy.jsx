import { useContract, useContractRead } from '@thirdweb-dev/react';
import React from 'react'
import { CONTRACT_ADDRESS } from 'utils/constant';
import { parseBigNumber } from 'utils/function/parseBigNumber';

const Policy = () => {
  const {contract} = useContract(CONTRACT_ADDRESS);
  const {data, isLoading, error} = useContractRead(
    contract,
    "getLatestPolicy",
    []
  )
  console.log(data)
  return (
    <div className='flex flex-col space-y-2 text-[16px]'>
        <div className='text-3xl mb-4'>
            Lastest Booking Policy
        </div>
        <div>
            <div>
            1. Minimum time that renter can cancel contract:
            </div>
            <ul className='ml-4 flex flex-col gap-[4px]'>
                <li>1.2 For prepaid contract: <span className='font-bold'>{data && parseBigNumber(data[0])/3600} hours</span> before check-in time.</li>
                <li>1.3 For deposit contract: <span className='font-bold'>{data && parseBigNumber(data[1])/3600} hours</span> before check-in time.</li>
            </ul>
        </div>
        <div>
        <div>
            2. Deposit booking contract
            </div>
            <ul className='ml-4 flex flex-col gap-[4px]'>
                <li>2.1 Percentage of total renting amount that renter need to pay for deposit booking: <span className='font-bold'>{data && parseBigNumber(data[2])}%</span>.</li>
                <li>2.2 Renter need to pay the remaining amount to be able to make contract available. Then renter can access and use all smart IoT features in the room. </li>
                <li>2.3 If the renter do not pay the remaining amount, the deposit amount will be transferred automatically to owner wallet and the contract will be cancelled. It means renter will lose all their deposit money.</li>
                <li>2.4 Unpaid-remaining contracts are prohitbited from listing on Marketplace.</li>
            </ul>
        </div>
        <div>

        </div>
        <div>
            3. Renter have to checkout before ended time of the contract, otherwise renter need to deal directly with the owner and do the checkout.
        </div>
    </div>
  )
}

export default Policy