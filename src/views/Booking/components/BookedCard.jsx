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
import { CONTRACT_ADDRESS } from 'utils/constant';
import { formatDate } from "utils/function/formatDate";

const BookedCard = ({tokenId,page}) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);

  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  };
  return (
    <>{!isLoading && data &&(
    <div className='flex flex-cols'>
      <div className='m-4 items-center justify-center flex '>
        <img
                    src={homestay4}
                    alt="Background"
                    className="left-0 w-100 h-100 object-contain transition-opacity duration-1000"
                    style={{ opacity: '100%' }}
        />
        </div>
      <div className='flex m-4 rounded-xl bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-base rounded-2xl'>
        
        <div className="m-[2px] bg-white rounded-xl w-full p-4">
            <div className='w-fit mx-auto'>
            <div className='flex flex-row justify-between gap-2'>
            <div className='w-full'>
              <div className='flex justify-center'>
                <UserIcon2 className="w-8"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Provider
                </p>
              </div>
              <p className='flex justify-center 
              font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text '>{shortenAddress(data[0])}</p>
            </div>
            <div className='w-full'>
              <div className='flex justify-center'>
                <UserIcon2 className="w-8"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Renter
                </p>
              </div>
              <p className='flex justify-center 
              font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text '>{shortenAddress(data[1])}</p>
            </div>
          </div>
          <div className='flex flex-row justify-between gap-4'>
            <div className='w-full'>
              <div className='flex justify-center'>
                <WaterPlant className="w-10"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Room ID
                </p>
              </div>
              <p className='flex justify-center 
              font-[1000]  bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text '>{parseBigNumber(data[2])}</p>
            </div>
            <div className='w-full'>
              <div className='flex justify-center'>
                <Money2 className="w-10"/>
                <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Rent Amount
                </p>
              </div>
              <p className='flex justify-center
              font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
              bg-clip-text'>{parseBigNumber(data[3])} VNĐ</p>
            </div>
          </div>
          <div className='justify-center'>
            <div className='flex justify-center'>
              <Clock2 className="w-8 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
                Duration
              </p>
            </div>
            <p className='flex w-full justify-center
            font-[1000]  bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
            bg-clip-text'>{parseBigNumber(data[5])-parseBigNumber(data[4])} seconds</p>
          </div>
          <div className='justify-center'>
            <div className='flex justify-center'>
              <Calendar3 className="mb-6 w-10 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
              Contract Creation Time
              </p>
            </div>
            <p className='flex w-full justify-center
            font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent 
            bg-clip-text'>{formatDate(parseBigNumber(data[6])*1000)}</p>
          </div>
          <div className='justify-center'>
            <div className='flex justify-center'>
              <Calendar2 className="w-10 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
              Available Time
              </p>
            </div>
            <p className='flex w-full justify-center font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent bg-clip-text'>
                {formatDate(parseBigNumber(data[4]))}
            </p>
          </div>
          <div className='justify-center'>
            <div className='flex justify-center'>
              <Calendar2 className="w-10 mr-2"/>
              <p className='flex my-auto justify-center font-extrabold text-sky-600'>
              Due Time
              </p>
            </div>
            <p className='flex w-full justify-center font-[1000] bg-gradient-to-r from-sky-500 to-purple-500 text-transparent bg-clip-text'>
                {formatDate(parseBigNumber(data[5]))}
            </p>
          </div>
            </div>
        </div>
      </div>
    </div>
    )}
    
    </>
  )
}

export default BookedCard