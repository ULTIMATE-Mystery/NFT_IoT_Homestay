import React,{useState} from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { shortenAddress } from 'utils/shortenAddress';
import { formatDate } from 'utils/function/formatDate';
import { parseBigNumber } from 'utils/function/parseBigNumber';
import { CONTRACT_ADDRESS } from 'utils/constant';
import LogCard from './LogCard';

const TransactionCard = ({ tokenId }) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);
  const [isClicked,setIsClicked] = useState(false);
  
  return (
    <div>
      {!isLoading && data && (
        <div className='w-full flex flex-row bg-slate-800 mb-2 align-items-center align-center p-4 rounded-lg' onClick={() => setIsClicked(!isClicked)}>
          <div className="basis-1/12 flex justify-center">{tokenId}</div>
          <div className="basis-1/4 flex justify-center">Transaction hash</div>
          <div className="basis-1/6 flex justify-center">{formatDate(parseBigNumber(data[6])*1000)}</div>
          <div className="basis-1/4 flex justify-center flex justify-center">{shortenAddress(data[1])}</div>
          <div className="basis-1/12 flex justify-center">{parseBigNumber(data[2])}</div>
          <div className="basis-1/6 flex justify-center">{parseBigNumber(data[3])}</div>
        </div>
      )}
      {isClicked && (
        <div className='mt-4'>
          <LogCard tokenId={tokenId} />
        </div>
      )}
    </div>
  );
};

export default TransactionCard;