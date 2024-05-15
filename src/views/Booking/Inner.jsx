import { memo, useState } from 'react';
import Booked from 'views/Booking/components/Booked';
import { useAddress } from '@thirdweb-dev/react';
import BookingCard from './components/BookingCard';

const Inner = memo(() => {
    // const [isButtonClicked, setButtonClicked] = useState(true);
    const isButtonClicked = true;
    const [isBookingUI, setBookingUI] = useState(true);
    const address = useAddress();
    return (
        address ? (
            <div className='flex flex-col min-[800px]:mx-40 min-[600px]:mx-10 min-[400px]:mx-4 mx-2 '>
                    <div className="pt-6 flex gap-[16px] justify-between items-center">
                        <div className='flex items-center'>
                            <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                                {isBookingUI ? <p>Mint NFT Stay</p> : <p>Your NFT info</p>}
                            </div>
                            <div className="pl-4 text-sm my-auto">
                                {isBookingUI ? <p>Booking your homestay</p> : <p>Your booked rooms</p>}
                            </div>
                        </div>
                        <div className='flex'>
                            {isBookingUI ? (
                            <>
                                <button className="border border-r-0 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] my-auto rounded-l-md bg-sky-600 p-2 flex justify-center items-center font-bold"
                                >
                                    <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                    <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                    <p className="z-10">Book your room</p>
                                </button>
                                <button className="border border-l-0 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] my-auto rounded-r-md p-2 flex justify-center items-center font-bold"
                                        onClick={() => setBookingUI(false)}
                                >
                                    <p>Check contracts</p>
                                </button>
                            </>
                            ) : (
                            <>
                                <button className="border border-r-0 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] my-auto rounded-l-md p-2 flex justify-center items-center font-bold"
                                        onClick={() => setBookingUI(true)}
                                >
                                    <p>Book your room</p>
                                </button>
                                <button className="border border-l-0 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] my-auto rounded-r-md bg-sky-600 p-2 flex justify-center items-center font-bold">
                                    <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                    <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                    <p className="z-10">Check contracts</p>
                                </button>
                            </>
                            )}
                        </div>
                    </div>
                    {isBookingUI ? (
                        <BookingCard></BookingCard>
                    ) : (
                        <Booked 
                            isButtonClicked={isButtonClicked}
                            page={"booking"}
                        />
                    )}
            </div> 
            ) : (
            <div className='justify-center flex'>
                <div className="text-4xl mt-60 mx-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                You need to connect wallet first
                </div>  
            </div> 
        )
  
        
    );
});

Inner.displayName = 'Booking Inner';

export default Inner;
