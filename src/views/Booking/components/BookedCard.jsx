import {
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { shortenAddress } from 'utils/shortenAddress';
import UserIcon2 from 'icons/UserIcon2';
import WaterPlant from 'icons/WaterPlant';
import Money2 from 'icons/Money2';
import Clock2 from 'icons/Clock2';
import Calendar3 from 'icons/Calendar3';
import Calendar2 from 'icons/Calendar2';
import homestay4 from 'assets/image/homestay/homestay4.jpg';
import { CONTRACT_ADDRESS, MARKETPLACE_ADDRESS } from 'utils/constant';
import { formatDate } from "utils/function/formatDate";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import Message from "components/Message";
import Loader from "components/Loader";
import ButtonNFT from "components/ButtonNFT";
import Unavailable from "icons/Unavailable";

const BookedCard = ({tokenId,page,isApprovedForAll,queryData,convertedPrice,isCancelled}) => {
  const { contract: marketplaceContract } = useContract(MARKETPLACE_ADDRESS);
  const { contract } = useContract(CONTRACT_ADDRESS);
  const address = useAddress();
  // const [queryData,setQueryData] = useState(queryData);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);
  const [isModalListNFT, setModalListNFT] = useState(false); 
  const [isModalChangePrice,setModalChangePrice] = useState(false);
  const [inputListPrice,setInputListPrice] = useState(0);
  const [inputChangePrice,setInputChangePrice] = useState(convertedPrice);
  const [isListNFTLoading,setListNFTLoading] = useState(-1);
  const [isUnlistNFTLoading,setUnlistNFTLoading] = useState(-2);
  const [isChangePriceLoading,setChangePriceLoading] = useState(-3);
  const [isBuyNFTLoading,setBuyNFTLoading] = useState(-4);
  const [isApprovedForAllLoading,setApprovedForAllLoading] = useState(-5);
  const [isCancelLoading,setCancelLoading] = useState(-6);
  const onListPriceChange = (e) => {
    setInputListPrice(e.target.value);
  }
  const onChangePriceChange = (e) => {
    setInputChangePrice(e.target.value);
  }

  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  };
  console.log(queryData)
  const onClickSetApprovedForAll = async () => {
      // e.preventDefault();
      if (contract) {
          try {
              setApprovedForAllLoading(true);
              // Call the approved for all NFT function
              const {data:dataApproved,isLoading: isLoadingApproved} = await contract.call("setApprovalForAll",
              [
                MARKETPLACE_ADDRESS,
                true
              ]);
                setApprovedForAllLoading(isLoadingApproved);
              Message.sendSuccess('Successfully approved for all NFT!');
              
          } catch (error) {
              console.error('Error calling approvedForAll:', error);
              Message.sendError('ApprovedForAll was not successful');
          }
      } else {
          console.error('Contract not loaded or not connected to Web3');
          Message.sendError('Contract not loaded or not connected to Web3');
      }
  };

  const onClickListNft = async (tokenId,price) => {
     // e.preventDefault();
      if (marketplaceContract) {
          try {
              //amount bnb by wei
              
              const amountBnb = await contract.call('usdToBnb', [
                    parseInt(price),
              ]);
              console.log('amountBnb',parseBigNumber(amountBnb));

              setListNFTLoading(true);
              // Call the list NFT function
              const {data:dataListNFT,isLoading: isLoadingListNFT} = await marketplaceContract.call("listNFT",
                [
                  tokenId,
                  parseBigNumber(amountBnb)
                ]
              );
              // if (isLoadingListNFT) 
              //   setListNFTLoading(true);
                setListNFTLoading(isLoadingListNFT);     
              Message.sendSuccess('Successfully list NFT!');
              
          } catch (error) {
              console.error('Error calling list NFT:', error);
              Message.sendError('Your listing was not successful');
          }
      } else {
          console.error('Contract not loaded or not connected to Web3');
          Message.sendError('Contract not loaded or not connected to Web3');
      }
  };
  const onClickChangePrice = async (tokenId,price) => {
    // e.preventDefault();
     if (marketplaceContract) {
         try {
             //amount bnb by wei
             
             const amountBnb = await contract.call('usdToBnb', [
                   parseInt(price),
             ]);
             console.log('amountBnb',parseBigNumber(amountBnb));

             setChangePriceLoading(true);
             // Call the NFT price change function
             const {data:dataChangePrice,isLoading: isLoadingChangePrice} = await marketplaceContract.call("updateListingNFTPrice",
               [
                 tokenId,
                 parseBigNumber(amountBnb)
               ]
             );
               setChangePriceLoading(isLoadingChangePrice);
             Message.sendSuccess('Successfully change price of NFT!');
             
         } catch (error) {
             console.error('Error calling change price NFT:', error);
             Message.sendError('Your price changing was not successful');
         }
     } else {
         console.error('Contract not loaded or not connected to Web3');
         Message.sendError('Contract not loaded or not connected to Web3');
     }
 };
  const onClickUnlistNft = async (tokenId) => {
      // e.preventDefault();
      if (marketplaceContract) {
          try {
              setUnlistNFTLoading(true);
              // Call the unlist NFT function
              const {data:dataUnlistNFT,isLoading: isLoadingUnlistNFT} = await marketplaceContract.call("unlistNFT",
                [
                  tokenId
                ]
              );
                setUnlistNFTLoading(isLoadingUnlistNFT);
              Message.sendSuccess('Successfully unlist NFT!');
              
          } catch (error) {
              console.error('Error calling unlist NFT:', error);
              Message.sendError('Unlisting was not successful');
          }
      } else {
          console.error('Contract not loaded or not connected to Web3');
          Message.sendError('Contract not loaded or not connected to Web3');
      }
  };
  const onClickCancelContract = async (tokenId) => {
      // e.preventDefault();
      if (marketplaceContract) {
          try {
              setCancelLoading(true);
              // Call the cancel contract function
              const {data:dataCancelContract,isLoading: isLoadingCancelContract} = await contract.call("cancelContract",
                [
                  tokenId
                ]
              );
                setCancelLoading(isLoadingCancelContract);
              Message.sendSuccess('Successfully cancel renting contract!');
              
          } catch (error) {
              console.error('Error calling cancel contract:', error);
              Message.sendError("You cannot cancel contract. Please read our latest booking policy or contact with homestay's owner");
          }
      } else {
          console.error('Contract not loaded or not connected to Web3');
          Message.sendError('Contract not loaded or not connected to Web3');
      }
  };
  const onClickBuyNft = async (tokenId) => {
    // e.preventDefault();
     if (marketplaceContract) {
         try {
             setBuyNFTLoading(true);
             
             console.log("price",tokenId,queryData.tokens[0].price/10**18)
             // Call the buy NFT function
              const {data:dataBuyNFT,isLoading: isLoadingBuyNFT} = await marketplaceContract.call("buyNFT",
               [
                 tokenId,
               ],{
                value: queryData.tokens[0].price
               }
              );
              setBuyNFTLoading(isLoadingBuyNFT);        
             Message.sendSuccess('Successfully buy NFT!');             
         } catch (error) {
             console.error('Error calling buy NFT:', error);
             Message.sendError('Your purchase was not successful');
         }
     } else {
         console.error('Contract not loaded or not connected to Web3');
         Message.sendError('Contract not loaded or not connected to Web3');
     }
 };
  console.log(isListNFTLoading)
  useEffect(()=>{
    if (isListNFTLoading===undefined||
      isUnlistNFTLoading===undefined||
      isChangePriceLoading===undefined||
      isBuyNFTLoading===undefined||
      isApprovedForAllLoading===undefined||
      isCancelLoading===undefined) 
      setTimeout(()=>{
        window.location.reload();
      },3000)
  },[isListNFTLoading,isUnlistNFTLoading,isChangePriceLoading,isBuyNFTLoading,isApprovedForAllLoading,isCancelLoading])
  return (
    <>{!isLoading && data &&(
    <div className='flex flex-cols flex-basis'>
      <div className='basis-2/3 m-4 items-center justify-center flex '>
        <img
          src={homestay4}
          alt="Background"
          className="left-0 object-contain transition-opacity duration-1000"
          style={{ opacity: '100%' }}
        />
      </div>
      <div className='relative basis-1/3 flex rounded-xl bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-base rounded-2xl'>
        <div className="m-[2px] bg-white rounded-xl w-full p-4">
            <div className='flex flex-col space-y-3'>
            <div className='flex flex-row justify-between'>
            <div className=''>
              <div className='flex justify-left'>
                <UserIcon2 className="w-8"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Provider
                </p>
              </div>
              <p className='flex justify-left 
              font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text '>{shortenAddress(data[0])}</p>
            </div>
            <div className=''>
              <div className='flex justify-end'>
                <UserIcon2 className="w-8"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Renter
                </p>
              </div>
              <p className='flex justify-right justify-end
              font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text '>{shortenAddress(data[1])}</p>
            </div>
          </div>
       
            <div className='w-full flex justify-between'>
              <div className='flex justify-left'>
                <WaterPlant className="w-10"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Room ID
                </p>
              </div>
              <p className='flex justify-end my-auto
              font-[1000]  bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text '>{parseBigNumber(data[2])}</p>
            </div>
            <div className='w-full flex justify-between'>
              <div className='flex justify-left'>
                <Money2 className="w-10"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Rent Amount
                </p>
              </div>
              <p className='flex justify-end my-auto
              font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text'>{parseBigNumber(data[3])} $</p>
            </div>
          
          <div className='flex justify-between'>
            <div className='flex justify-left'>
              <Clock2 className="w-8 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Duration
              </p>
            </div>
            <p className='flex justify-end w-full my-auto
            font-[1000]  bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
            bg-clip-text'>{parseBigNumber(data[5])-parseBigNumber(data[4])} seconds</p>
          </div>
          <div className='flex-basis'>
            <div className='flex basis-1/3'>
              <Calendar2 className="w-10 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
              Available Time
              </p>
            </div>
            <p className='flex basis-2/3 w-full justify-end font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent bg-clip-text'>
                {formatDate(parseBigNumber(data[4])*1000)}
            </p>
          </div>
          <div className='flex-basis'>
            <div className='flex basis-1/3'>
              <Calendar2 className="w-10 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
              Due Time
              </p>
            </div>
            <p className='flex basis-2/3 w-full justify-end font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent bg-clip-text'>
                {formatDate(parseBigNumber(data[5])*1000)}
            </p>
          </div>
          {isCancelled &&
            <div className='flex-basis'>
              <div className='flex basis-1/3'>
                <Unavailable/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                This contract was cancelled
                </p>
              </div>
            </div>          
          }
          </div>
          {queryData && !(
            isListNFTLoading === true 
            || isUnlistNFTLoading === true 
            || isChangePriceLoading === true 
            || isBuyNFTLoading === true
            || isApprovedForAllLoading === true
            || isCancelLoading === true) && 
            <div className="p-4 flex w-full justify-center mt-2">
              {isApprovedForAll && queryData ? (
                queryData.tokens[0].owner === MARKETPLACE_ADDRESS.toLowerCase() ? (
                  queryData.tokens[0].renter !== address.toLowerCase() ?
                  <div>
                    {isBuyNFTLoading !== true &&
                      <div className={`flex rounded-xl justify-center ${isCancelled ? 'opacity-50' : ''}`} onClick={!isCancelled ? () => onClickBuyNft(tokenId) : null}>
                        <ButtonNFT content={"Buy NFT"} disabled={isCancelled} /> 
                    </div>}
                  </div>
                  :
                  (isChangePriceLoading !== true && isUnlistNFTLoading !== true &&
                  <div className="flex flex-col">
                    <div className={`flex rounded-xl justify-center ${isCancelled ? 'opacity-50' : ''}`} onClick={!isCancelled ? setModalChangePrice : null}>
                      <ButtonNFT content={"Change Price"} disabled={isCancelled} />
                    </div>
                    <div className={`flex rounded-xl justify-center ${isCancelled ? 'opacity-50' : ''}`} onClick={!isCancelled ? () => onClickUnlistNft(tokenId) : null}>
                      <button className="text-[#06c8d9] uppercase font-[700] text-[16px] tracking-[2px] py-[0.9em] px-[1.6em] hover:text-cyan-300" disabled={isCancelled}>
                        Unlist NFT
                      </button>
                    </div>
                  </div>)
                ) : (
                (isListNFTLoading !== true && isCancelLoading !== true &&
                <div className="flex flex-col">
                  <div className={`flex rounded-xl justify-center ${isCancelled ? 'opacity-50' : ''}`} onClick={!isCancelled ? setModalListNFT : null}>
                    <ButtonNFT content={"List NFT"} disabled={isCancelled} /> 
                  </div>
                  <div className={`flex rounded-xl justify-center ${isCancelled ? 'opacity-50' : ''}`} onClick={!isCancelled ? () => onClickCancelContract(tokenId) : null}>
                    <button className="text-[#d90629] uppercase font-[700] text-[16px] tracking-[2px] py-[0.9em] px-[1.6em] hover:text-red-300" disabled={isCancelled}>
                      Cancel contract
                    </button>
                  </div>
                </div>)
                ))
              :
              <div className={`flex rounded-xl justify-center ${isCancelled ? 'opacity-50' : ''}`} onClick={!isCancelled ? () => onClickSetApprovedForAll() : null}>
                <ButtonNFT content={"Set Approved For All"} disabled={isCancelled} />
              </div>
              }
            </div>
          }
          <Modal open={isModalListNFT} centered 
            onCancel={()=>setModalListNFT(false)}
            footer={null}
          >
            <div className="w-full h-full flex flex-col gap-[40px] ">
              <div>
                List NFT
              </div>
              <form>
                <label className="block">
                  <span className="block text-sm  pl-3">Enter Price (USD)</span>
                  <input className=" border-slate-700 w-full rounded-lg h-[48px] px-[16px]" value={inputListPrice} onChange={onListPriceChange} type="number" required/>
                  <span className="block text-sm pt-[16px] flex flex-row relative w-full">
                  <span>Est</span>
                  <span className="right-0 absolute">≈${inputListPrice?inputListPrice:0}</span>
                  </span>
                </label>
              </form>
              <span className="flex flex-col gap-[16px] text-sm text-slate-500">
                <div>Listing is FREE! When the sale succeeds, the following fees will occur.</div>
                <div className="w-full relative flex flex-row">
                  <div>Marketplace Fee</div>
                    <div className=" absolute right-0 ">5%
                    </div>
                  </div>
                <div className="w-full relative flex flex-row">
                  <div>
                    You will receive
                  </div>
                  <div className=" absolute right-0 ">
                    ${inputListPrice?inputListPrice*0.95:0}
                  </div>
                </div>
              </span>
              {isListNFTLoading!==true &&
              <button className="relative flex flex-row justify-center items-center"
                onClick={()=>{
                  onClickListNft(tokenId, inputListPrice);
                  setModalListNFT(false)}}>
                <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl">
                </div>
                <div className="relative z-20 ">
                  <ButtonNFT content={"List NFT"}/>
                </div>
              </button>}
            </div>
          </Modal>
          <Modal open={isModalChangePrice} centered 
            onCancel={()=>setModalChangePrice(false)}
            footer={null}
          >
            <div className="w-full h-full flex flex-col gap-[40px] ">
              <div>
                Change NFT's Price
              </div>
              <form>
                <label className="block">
                  <span className="block text-sm text-slate-500 pl-3">Enter Price (USD)</span>
                  <input className=" border-slate-700 w-full rounded-lg h-[48px] px-[16px]" value={inputChangePrice} onChange={onChangePriceChange} type="number" required/>
                  <span className="block text-sm text-slate-500 pt-[16px] flex flex-row relative w-full">
                  <span>Est</span>
                  <span className="right-0 absolute">≈${inputChangePrice?inputChangePrice:0}</span>
                  </span>
                </label>
              </form>
              <span className="flex flex-col gap-[16px] text-sm text-slate-500">
                <div>Listing is FREE! When the sale succeeds, the following fees will occur.</div>
                <div className="w-full relative flex flex-row">
                  <div>Marketplace Fee</div>
                    <div className=" absolute right-0 ">5%
                    </div>
                  </div>
                <div className="w-full relative flex flex-row">
                  <div>
                    You will receive
                  </div>
                  <div className=" absolute right-0 ">
                    ${inputChangePrice?inputChangePrice*0.95:0}
                  </div>
                </div>
              </span>
              {isChangePriceLoading!==true &&
              <button className="relative flex flex-row justify-center items-center"
                onClick={()=>{
                  onClickChangePrice(tokenId, inputChangePrice);
                  setModalChangePrice(false)}}>
                <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl">
                </div>
                <div className="relative z-20 ">
                  <ButtonNFT content={"Change Price"}/>
                </div>
              </button>}
            </div>
          </Modal>
        </div>
        {(isListNFTLoading === true 
          || isUnlistNFTLoading === true 
          || isChangePriceLoading === true 
          || isBuyNFTLoading === true
          || isApprovedForAllLoading === true
          || isCancelLoading === true)
          && <div className="justify-center absolute top-72 right-[20px] text-center self-center scale-150">
              <Loader/>
            </div>}
      </div>
    </div>
    )}
    
    </>
  )
}

export default BookedCard