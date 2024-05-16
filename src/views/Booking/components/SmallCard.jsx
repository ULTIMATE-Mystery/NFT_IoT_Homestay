import React,{useEffect, useState} from 'react'
import {
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { Modal } from 'antd';
import BookedCard from './BookedCard';
import homestay4 from 'assets/image/homestay/homestay4.jpg';
import { CONTRACT_ADDRESS, MARKETPLACE_ADDRESS } from 'utils/constant';
import { useQuery, gql } from '@apollo/client';
import { hexToBigInt } from 'thirdweb';


const SmallCard = ({key,tokenId,page,contractId,select,setModalCheckoutOpened}) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);
  const [isViewClicked,setIsViewClicked] = useState(false);
  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  
  };
  const handleSelectContract = ()=>{
    select(tokenId);
    setModalCheckoutOpened(false);
  }

  const [isApprovedForAll,setApprovedForAll] = useState(false);
  const address = useAddress();
  const getApprovedForAll = async () => {
    const IsApprovedForAll = await contract.call("isApprovedForAll",[
      address,
      MARKETPLACE_ADDRESS
    ]);
    setApprovedForAll(IsApprovedForAll);
  }
  const prefix = `"0x${tokenId}"`;
  const GET_TOKENS = gql`
    {
        tokens(where: {id: ${prefix}}) {
          id
          roomId
          provider
          renter
          creator
          price
        }
      }
  `;
  const { loading, error, data:queryData } = useQuery(GET_TOKENS);
    console.log(queryData);
  useEffect(()=>{
    getApprovedForAll();
  },[])

  return (
    <>{!isLoading && data &&(
      <div>
    <div className="w-60 h-100 bg-slate-900 p-3 flex flex-col gap-1 rounded-2xl border border-sky-500 border-1 drop-shadow-lg"
      onClick={()=>setIsViewClicked(true)}>
      <div className="h-48 rounded-xl overflow-hidden">
        <img
          src={homestay4}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-col gap-4 pb-4">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <span class="text-xl font-bold text-white">Alex Homestay </span>
            <p class="text-sm text-slate-400">Room ID: {parseBigNumber(data[2])}</p>
          </div>
          <span class="pt-0.5 font-bold  text-green-600">{parseBigNumber(data[3])}$</span>
        </div>
        {/* <button class="hover:bg-sky-900 text-gray-50 bg-blue-950 py-2 rounded-md text-slate-300"
        onClick={()=>setIsViewClicked(true)}>
          View details</button> */}
          
          <button class={`${page==="booking"?"hidden":""} hover:bg-sky-900 text-gray-50 bg-blue-950 py-2 rounded-md text-slate-300`}
        onClick={handleSelectContract}>
          Select
          </button>
      </div>
      
      </div>
      {isViewClicked&&(
      <Modal open={isViewClicked} onCancel={()=>setIsViewClicked(false)} 
      onOk={()=>setIsViewClicked(false)} width={1200}
      closable={false}>
        <BookedCard tokenId={tokenId} page={page} isApprovedForAll={isApprovedForAll} queryData={queryData}>
        </BookedCard>
        </Modal>
      )}
    </div>

    )}
    
    </>
  )
}

export default SmallCard