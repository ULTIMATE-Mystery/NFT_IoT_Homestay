import React,{useState} from 'react'
import {
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { Modal } from 'antd';
import BookedCard from './BookedCard';




const SmallCard = ({tokenId}) => {
  const contractAddress = "0xC8339AEeCa4a529a7a0571b9654024600f5FC137";
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);
  const [isClicked,setIsClicked] = useState(false);
  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  
  };
  return (
    <>{!isLoading && data &&(
      <div>
    <div class="w-60 h-100 bg-gray-50 p-3 flex flex-col 
    gap-1 rounded-2xl  border border-sky-500 border-1 
    drop-shadow-lg"
    >
      <div class="h-48 bg-slate-200 rounded-xl"></div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <span class="text-xl font-bold">Alex Homestay </span>
            <p class="text-sm text-gray-700">Room ID: {parseBigNumber(data[2])}</p>
          </div>
          <span class="pt-0.5 font-bold  text-green-600">{parseBigNumber(data[3])}$</span>
        </div>
        <button class="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md"
        onClick={()=>setIsClicked(true)}>
          View details</button>
      </div>
      
      </div>
      {isClicked&&(
      <Modal open={isClicked} onCancel={()=>setIsClicked(false)} 
      onOk={()=>setIsClicked(false)} width={1200}>
        <BookedCard tokenId={tokenId}>
        </BookedCard>
        </Modal>
      )}
    </div>

    )}
    
    </>
  )
}

export default SmallCard