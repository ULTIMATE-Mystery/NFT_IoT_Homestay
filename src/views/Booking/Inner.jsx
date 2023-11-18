import { memo, useState } from 'react';
import BookingCard from 'views/Booking/components/BookingCard';
import Booked from 'views/Booking/components/Booked';

const Inner = memo(() => {
    const [isButtonClicked, setButtonClicked] = useState(true);
    // const handleButtonClick = () => {
    //     setButtonClicked(!isButtonClicked);
    // }
    return (
        <>
            <div className=''>
                <div className="ml-40 pt-6 flex ">
                    <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                        <p>Mint NFT Stay</p>
                    </div>
                    <div className="pl-4 text-sm my-auto">
                        <p>Booking your homestay</p>
                    </div>
                </div>
                <BookingCard></BookingCard>
                <div className="ml-40 pt-6 flex ">
                    <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                        <p>Your NFT Stay</p>
                    </div>
                    <div className="pl-4 text-sm my-auto">
                        <p>Booked contract</p>
                    </div>
                </div>
                <Booked isButtonClicked={isButtonClicked}></Booked>
            </div>
            
        </>
    );
});

Inner.displayName = 'Booking Inner';

export default Inner;
