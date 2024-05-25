import {
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

const BookedCard = ({tokenId,page,isApprovedForAll,queryData}) => {
  const { contract: marketplaceContract } = useContract(MARKETPLACE_ADDRESS);
  const { contract } = useContract(CONTRACT_ADDRESS);
  // const [queryData,setQueryData] = useState(queryData);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);
  const [isModalListNFT, setModalListNFT] = useState(false); 
  const [isModalChangePrice,setModalChangePrice] = useState(false);
  const [inputListPrice,setInputListPrice] = useState(0);
  const [isListNFTLoading,setListNFTLoading] = useState(-1);
  const [isUnlistNFTLoading,setUnlistNFTLoading] = useState(-2);
  const [isChangePriceLoading,setChangePriceLoading] = useState(-3);
  const onListPriceChange = (e) => {
    setInputListPrice(e.target.value);
  }

  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  };
  const onClickSetApprovedForAll = async () => {
    await contract.call("setApprovalForAll",[MARKETPLACE_ADDRESS,true]);
    contract.events.listenToAllEvents((event) => {
      console.log(event.eventName) // the name of the emitted event
      console.log(event.data) // event payload
      window.location.reload();
    });
    
    // or listen to a particular event type
      contract.events.addEventListener("isApprovedForAll", (event) => {
      console.log(event);
    });
    
  }
  console.log(queryData)

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
                // or listen to a particular event type
                marketplaceContract.events.addEventListener("ListNFT", (event) => {
                console.log(event);
                });
              
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
               // or listen to a particular event type
               marketplaceContract.events.addEventListener("ChangePrice", (event) => {
               console.log(event);
               });
             
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
                // or listen to a particular event type
                marketplaceContract.events.addEventListener("UnlistNFT", (event) => {
                console.log(event);
                });
              
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
  console.log(isListNFTLoading)
  useEffect(()=>{
    if (isListNFTLoading==undefined||isUnlistNFTLoading==undefined||isChangePriceLoading==undefined) 
      setTimeout(()=>{
        window.location.reload();
      },3000)
  },[isListNFTLoading,isUnlistNFTLoading,isChangePriceLoading])
  // console.log(MARKETPLACE_ADDRESS.toLowerCase()==queryData.tokens[0].owner)
  
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
      <div className='basis-1/3 flex rounded-xl bg-gradient-to-r from-teal-200 via-cyan-300 
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
          </div>
          {queryData&&
          
          <div className="p-4 flex w-full justify-center">
            {console.log(queryData,MARKETPLACE_ADDRESS.toLowerCase())}
            {isApprovedForAll&&queryData?(
              queryData.tokens[0].owner == MARKETPLACE_ADDRESS.toLowerCase() ? (
                <div className="flex flex-col">
                  <div className="flex rounded-xl justify-center"
                  onClick={()=>onClickChangePrice(tokenId)}>
                    <ButtonNFT content={"Change Price"}/>
                  </div>
                  <div className="flex rounded-xl justify-center"
                  onClick={()=>onClickUnlistNft(tokenId)}>
                    <button className="text-[#06c8d9] uppercase font-[700] text-[16px] tracking-[2px] py-[0.9em] px-[1.6em] hover:text-cyan-300">
                      Unlist NFT
                    </button>
                  </div>
                </div>
              ) : (
              isListNFTLoading!=true &&
                <div className="flex rounded-xl justify-center"
                onClick={setModalListNFT}>
                  <ButtonNFT content={"List NFT"}/> 
                </div>)
              )
            :
            <button className="w-full rounded-xl py-4 px-10 bg-slate-300 hover:bg-slate-400"
            onClick={onClickSetApprovedForAll}>
              Set Approved For All
            </button>
            }
          </div>
          }
          <Modal open={isModalListNFT} centered 
            onCancel={()=>setModalListNFT(false)}
          >
            <div class="w-full h-full flex flex-col gap-[40px] ">
              <div>
                List NFT
              </div>
              <form>
                <label class="block">
                  <span class="block text-sm text-slate-500 pl-3">Enter Price(BUSD)</span>
                  <input class=" border-slate-700 w-full rounded-lg h-[48px] px-[16px]" value={inputListPrice} onChange={onListPriceChange} type="number" required/>
                  <span class="block text-sm text-slate-500 pt-[16px] flex flex-row relative w-full">
                  <span>Est</span>
                  <span class="right-0 absolute">≈$1,716</span>
                  </span>
                </label>
              </form>
              <span class="flex flex-col gap-[16px] text-sm text-slate-500">
                <div>Listing is FREE! When the sale succeeds, the following fees will occur.</div>
                <div class="w-full relative flex flex-row">
                  <div>Marketplace Fee</div>
                    <div class=" absolute right-0 text-white">5%
                    </div>
                  </div>
                <div class="w-full relative flex flex-row">
                  <div>
                    You will receive
                  </div>
                  <div class=" absolute right-0 text-white">
                  </div>
                </div>
              </span>
              {isListNFTLoading!=true &&
              <button class="relative flex flex-row justify-center items-center"
                onClick={()=>{
                  onClickListNft(tokenId, inputListPrice);
                  setModalListNFT(false)}}>
                <div class="absolute top-0 left-0 h-full w-full z-10 rounded-xl">
                </div>
                <div class="relative z-20 text-white">
                  <ButtonNFT content={"List NFT"}/>
                </div>
              </button>}
            </div>
          </Modal>
          {isListNFTLoading == true && <Loader/>}
          <Modal open={isModalChangePrice} centered 
            onCancel={()=>setModalChangePrice(false)}
          >
            <div class="w-full h-full flex flex-col gap-[40px] ">
              <div>
                Change NFT's Price
              </div>
              <form>
                <label class="block">
                  <span class="block text-sm text-slate-500 pl-3">Enter Price(BUSD)</span>
                  <input class=" border-slate-700 w-full rounded-lg h-[48px] px-[16px]" value={inputListPrice} onChange={onListPriceChange} type="number" required/>
                  <span class="block text-sm text-slate-500 pt-[16px] flex flex-row relative w-full">
                  <span>Est</span>
                  <span class="right-0 absolute">≈$1,716</span>
                  </span>
                </label>
              </form>
              <span class="flex flex-col gap-[16px] text-sm text-slate-500">
                <div>Listing is FREE! When the sale succeeds, the following fees will occur.</div>
                <div class="w-full relative flex flex-row">
                  <div>Marketplace Fee</div>
                    <div class=" absolute right-0 text-white">5%
                    </div>
                  </div>
                <div class="w-full relative flex flex-row">
                  <div>
                    You will receive
                  </div>
                  <div class=" absolute right-0 text-white">
                  </div>
                </div>
              </span>
              {isChangePriceLoading!=true &&
              <button class="relative flex flex-row justify-center items-center"
                onClick={()=>{
                  onClickChangePrice(tokenId, inputListPrice);
                  setModalChangePrice(false)}}>
                <div class="absolute top-0 left-0 h-full w-full z-10 rounded-xl">
                </div>
                <div class="relative z-20 text-white">
                  <ButtonNFT content={"Change Price"}/>
                </div>
              </button>}
            </div>
          </Modal>
        </div>
      </div>
    </div>
    )}
    
    </>
  )
}

export default BookedCard