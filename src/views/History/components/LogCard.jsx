import { useContract, useContractRead } from '@thirdweb-dev/react'
import React from 'react'
import { CONTRACT_ADDRESS } from 'utils/constant'
import { parseBigNumber } from 'utils/function/parseBigNumber';

const LogCard = ({tokenId}) => {
    const {contract} =useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getLogsForToken", [tokenId]);
    console.log(data)
  return (
    <div>
        {!isLoading && data && (
            <div className=''>
                {data.map((item)=>
                <div className={`flex flex-cols justify-center ${parseBigNumber(item[1])?"bg-teal-700":"bg-blue-950" } space-x-20 w-[800px] mx-auto p-6 mb-4 rounded-xl`}>
                    <div className=''>
                        Device Id: {parseBigNumber(item[0])}
                    </div>
                    <div className=''>
                        Status: {parseBigNumber(item[1])?"ON":"OFF"}
                    </div>
                    <div>
                        Timestamp: {parseBigNumber(item[2])}
                    </div>
                </div>)}
                {(data.length==0) && (<div className='mb-6'>
                    <div className='w-full justify-center flex'>
                        <p className="text-xl bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-600 bg-clip-text
                            text-transparent w-fit font-bold">
                            No logs were found.
                        </p>
                    </div>
                </div>)}
            </div>
        )}
        {}
        
    </div>
  )
}

export default LogCard