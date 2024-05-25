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


const SmallCard = ({key,tokenId,page,contractId,select,setModalCheckoutOpened,price,roomId}) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  // const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);
  const [dataToken,setDataToken] = useState();
  const [isViewClicked,setIsViewClicked] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState(null);

  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  
  };
  const handleSelectContract = ()=>{
    select(tokenId);
    setModalCheckoutOpened(false);
  }
  const address = useAddress();
  const [isApprovedForAll,setApprovedForAll] = useState(false);
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
          owner
        }
      }
  `;
  const { loading:isLoading, error, data } = useQuery(GET_TOKENS);
  const convertBnbToUsd = async (bnbPrice) => {
    if (contract) {
      try {
        const amountUsd = await contract.call('bnbToUsd', [bnbPrice]);
        return amountUsd;
      } catch (error) {
        console.error('Error calling bnbToUsd:', error);
      }
    }
  };
  
  useEffect(() => {
    const fetchConvertedPrice = async () => {
      if (data) {
        try {
          const amountUsd = await convertBnbToUsd(price);
          setConvertedPrice(amountUsd);
        } catch (error) {
          console.error('Error calling bnbToUsd:', error);
        }
      }
    };
    fetchConvertedPrice();
  }, [data, price]);
  
  console.log(tokenId,dataToken)

  return (
    <>
      {!isLoading && data && (
        <div>
          <div className="w-60 h-100 bg-slate-900 p-3 flex flex-col gap-1 rounded-2xl border border-sky-500 border-1 drop-shadow-lg" onClick={() => setIsViewClicked(true)}>
            <div className="h-48 rounded-xl overflow-hidden">
              <img src={homestay4} alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 pb-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">Alex Homestay </span>
                  <p className="text-sm text-slate-400">Room ID: {roomId}</p>
                </div>
                <span className="pt-0.5 font-bold text-green-600">{convertedPrice ? `${convertedPrice} $` : "0 $"}</span>
              </div>
              <button className={`${page === "booking" ? "hidden" : ""} hover:bg-sky-900 text-gray-50 bg-blue-950 py-2 rounded-md text-slate-300`} onClick={handleSelectContract}>
                Select
              </button>
            </div>
          </div>
          {isViewClicked && (
            <Modal open={isViewClicked} onCancel={() => setIsViewClicked(false)} onOk={() => setIsViewClicked(false)} width={1200} closable={false}>
              <BookedCard tokenId={tokenId} page={page} isApprovedForAll={isApprovedForAll} queryData={data}></BookedCard>
            </Modal>
          )}
        </div>
      )}
    </>
  );
  
}

export default SmallCard