import { memo } from 'react';
import BookingCard from 'views/Booking/components/BookingCard';
import Booked from 'views/Booking/components/Booked';
import { useAddress } from '@thirdweb-dev/react';

const Inner = memo(() => {
    // const [isButtonClicked, setButtonClicked] = useState(true);
    const isButtonClicked = true;
    const address = useAddress();
    return (
        <>{address === undefined ? (
            <div className='justify-center flex'>
                <div className="text-4xl mt-60 mx-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                You need to connect wallet first
                </div>  
            </div>
            
        ):(
            <div className='flex flex-col min-[800px]:mx-40 min-[600px]:mx-10 min-[400px]:mx-4 mx-2 '>
                <div className="pt-6 flex ">
                    <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                        <p>Mint NFT Stay</p>
                    </div>
                    <div className="pl-4 text-sm my-auto">
                        <p>Booking your homestay</p>
                    </div>
                </div>
                <BookingCard></BookingCard>
                <div className="pt-6 flex ">
                    <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                        <p>Your NFT Stay</p>
                    </div>
                    <div className="pl-4 text-sm my-auto">
                        <p>Booked contract</p>
                    </div>
                </div>
                <Booked isButtonClicked={isButtonClicked}
                page={"booking"}
                ></Booked>
            </div>
        )}
        </>
    );
});

Inner.displayName = 'Booking Inner';

export default Inner;
