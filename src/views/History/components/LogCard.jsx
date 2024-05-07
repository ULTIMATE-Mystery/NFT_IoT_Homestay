import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import React from 'react'
import { CONTRACT_ADDRESS } from 'utils/constant'
import { parseBigNumber } from 'utils/function/parseBigNumber';
import CryptoJS from 'crypto-js';
import { formatDate } from 'utils/function/formatDate';
const secretKey = process.env.REACT_APP_SECRET_KEY_WEB;

const LogCard = ({tokenId}) => {
    const {contract} =useContract(CONTRACT_ADDRESS);
    const address = useAddress();
    const { data, isLoading } = useContractRead(
        contract,
        'getLogsForToken',
        [tokenId],
        { from: address }
    );
    const decrypt = (encryptedData) => {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey.toString());
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
  return (
    <div>
        {(!isLoading && data) ? (
            <div className=''>
                {decrypt(data).map((item)=>
                <div className={`flex flex-cols justify-center ${parseBigNumber(item[1])?"bg-teal-700":"bg-blue-950" } space-x-20 w-[800px] mx-auto p-6 mb-4 rounded-xl`}>
                    <div className=''>
                        Device Id: {parseBigNumber(item[0])}
                    </div>
                    <div className=''>
                        Status: {parseBigNumber(item[1])?"ON":"OFF"}
                    </div>
                    <div>
                        Timestamp: {formatDate(parseBigNumber(item[2]))}
                    </div>
                </div>
            )}</div>):(<>
                {(!data) && (<div className='mb-6'>
                    <div className='w-full justify-center flex'>
                        <p className="text-xl bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-600 bg-clip-text
                            text-transparent w-fit font-bold">
                            No logs were found.
                        </p>
                    </div>
                </div>)}
            </>)    
        }   
    </div>
  )
}

export default LogCard