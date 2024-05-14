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

const BookedCard = ({tokenId,page,isApprovedForAll}) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);

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
      contract.events.addEventListener("Transfer", (event) => {
      console.log(event);
    });
    
  }
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
          <div className="p-4 flex w-full justify-center">
            {isApprovedForAll?
              <button className="w-full rounded-xl py-4 px-10 bg-slate-300 hover:bg-slate-400">
                Sell NFT 
              </button>
            :
            <button className="w-full rounded-xl py-4 px-10 bg-slate-300 hover:bg-slate-400"
            onClick={onClickSetApprovedForAll}>
              Set Approved For All
            </button>
            }
          </div>
        </div>
      </div>
    </div>
    )}
    
    </>
  )
}

export default BookedCard