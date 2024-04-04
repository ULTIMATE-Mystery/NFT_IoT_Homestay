import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import Loading from 'components/Loading';
import { CONTRACT_ADDRESS } from 'utils/constant'
import { formatDate } from 'utils/function/formatDate';
import { parseBigNumber } from 'utils/function/parseBigNumber';
import CryptoJS from 'crypto-js';
const secretKey = process.env.REACT_APP_SECRET_KEY_WEB;

const LogCardCheckout = ({tokenId}) => {
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
        {isLoading && <div className='w-full h-full py-40 flex justify-center'>
                                        <Loading/>
                                    </div>}
        {!isLoading && data && (
            <div className='w-full'>
                {decrypt(data).map((item)=>
                <div className={`flex flex-cols justify-center w-full ${parseBigNumber(item[1])?"":"" } mb-4 border-t text-2xl font-bold text-slate-600 py-2`}>
                    <div className='basis-1/4 flex justify-center text-slate-500'>
                        {parseBigNumber(item[0])}
                    </div>
                    <div className={`basis-1/4 flex justify-center ${parseBigNumber(item[1])?"text-lime-400":"text-red-300" }`}>
                        {parseBigNumber(item[1])?"ON":"OFF"}
                    </div>
                    <div className='basis-2/4 flex justify-center text-slate-500'>
                        {formatDate(parseBigNumber(item[2]))}
                    </div>
                </div>)}
                {(decrypt(data).length==0) && (<div className='mb-6'>
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

export default LogCardCheckout