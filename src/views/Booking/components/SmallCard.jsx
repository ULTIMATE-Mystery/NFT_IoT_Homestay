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
import './style.css'
import ButtonNFT from 'components/ButtonNFT';

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
  const toHexString = (num) => {
    return `"0x${parseInt(num).toString(16)}"`;
  };

  const prefix = toHexString(tokenId);
  // const prefix = `"0x${tokenId}"`;
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
    if (contract && address) {
      getApprovedForAll();
    }
    if (data) setDataToken(data);
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
  }, [data, price, contract, address, isLoading]);
  
  // console.log(tokenId,prefix,dataToken)

  return (
    <>
      {!isLoading && data && (
      <div className='relative'>
        <div class="container noselect" onClick={() => setIsViewClicked(true)}>
            <div class="canvas">
                <div class="tracker tr-1"></div>
                <div class="tracker tr-2"></div>
                <div class="tracker tr-3"></div>
                <div class="tracker tr-4"></div>
                <div class="tracker tr-5"></div>
                <div class="tracker tr-6"></div>
                <div class="tracker tr-7"></div>
                <div class="tracker tr-8"></div>
                <div class="tracker tr-9"></div>
                <div class="tracker tr-10"></div>
                <div class="tracker tr-11"></div>
                <div class="tracker tr-12"></div>
                <div class="tracker tr-13"></div>
                <div class="tracker tr-14"></div>
                <div class="tracker tr-15"></div>
                <div class="tracker tr-16"></div>
                <div class="tracker tr-17"></div>
                <div class="tracker tr-18"></div>
                <div class="tracker tr-19"></div>
                <div class="tracker tr-20"></div>
                <div class="tracker tr-21"></div>
                <div class="tracker tr-22"></div>
                <div class="tracker tr-23"></div>
                <div class="tracker tr-24"></div>
                <div class="tracker tr-25"></div>
                <div id="card" className='relative'>
                  <div className="rounded-t-[26px] overflow-hidden p-[8px] absolute h-[85%] top-0">
                    <img src={homestay4} alt="Background" className="w-full h-full object-cover rounded-t-lg image" />
                  </div>
                  
                    <p id="prompt">Price {convertedPrice ? `${convertedPrice} $` : "0 $"}</p>
                    <div class="title">Room {roomId}</div>
                    <div class="subtitle">
                        NFT STAY {tokenId}
                    </div> 
                </div>
            </div>
        </div>
        <button className={`${page === "booking" ? "hidden" : "pt-12"} flex justify-center mx-auto`} onClick={handleSelectContract}>
            <ButtonNFT content={"Select"}/>
        </button>
        {isViewClicked && (
            <Modal open={isViewClicked} onCancel={() => setIsViewClicked(false)} onOk={() => setIsViewClicked(false)} width={1200} closable={false}>
              <BookedCard tokenId={tokenId} page={page} isApprovedForAll={isApprovedForAll} queryData={data} convertedPrice={convertedPrice}></BookedCard>
            </Modal>
        )}
    </div>
        // <div>
        //   <div className=" mx-auto justify-center w-60 h-100 bg-stone-950 flex flex-col rounded-2xl border border-slate-600 hover:border-sky-300 border-2 drop-shadow-lg shadow-lg" onClick={() => setIsViewClicked(true)}>
        //     <div className="h-[250px] rounded-t-2xl overflow-hidden p-[2px]">
        //       <img src={homestay4} alt="Background" className="w-full h-full object-cover rounded-t-lg" />
        //     </div>
        //     <div className={`${page === "management" ? "text-white" : ""} flex flex-col py-2 px-6 font-bold`}>
        //       <div className="flex flex-row justify-between mb-2">
        //         <div className="flex flex-col w-full">
        //           <div className="flex flex-row justify-between w-full">
        //             <div>
        //               <p className=' text-slate-400 '>Homestay</p>
        //               <div className='text-lg flex justify-start'>Alex</div>
        //             </div>
        //             <div className=''>
        //               <p className=' text-slate-400 '>Contract Id </p>
        //               <div className='text-lg flex justify-start'>{tokenId}</div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //       {/* <div className='flex flex-row justify-between'>
        //               <p className='text-slate-400 w-full'>NFT Id </p>
        //               <div className='text-lg flex justify-end w-full'>{tokenId}</div>
        //       </div> */}
        //       <div className='flex flex-row justify-between'>
        //         <p className='text-slate-400 w-full'>Price</p>
        //         <div className="text-lg flex justify-end w-full text-green-600">{convertedPrice ? `${convertedPrice} $` : "0 $"}</div>
        //       </div>
        //       <button className={`${page === "booking" ? "hidden" : ""} hover:bg-sky-800 text-slate-300 bg-blue-950 py-2 rounded-md w-full`} onClick={handleSelectContract}>
        //         Select
        //       </button>
        //     </div>
        //   </div>
        //   {isViewClicked && (
        //     <Modal open={isViewClicked} onCancel={() => setIsViewClicked(false)} onOk={() => setIsViewClicked(false)} width={1200} closable={false}>
        //       <BookedCard tokenId={tokenId} page={page} isApprovedForAll={isApprovedForAll} queryData={data} convertedPrice={convertedPrice}></BookedCard>
        //     </Modal>
        //   )}
        // </div>
      )}
    </>
  );
  
}

export default SmallCard