import { memo, useState } from 'react';
import BookingCard from 'views/Booking/components/BookingCard';
import Booked from 'views/Booking/components/Booked';
import { useAddress } from '@thirdweb-dev/react';
import { useQuery, gql } from '@apollo/client';
const GET_TOKENS = gql`
    {
        tokens(first: 5) {
          id
          roomId
          provider
          renter
          price
        }
      }
`;
const Inner = memo(() => {
    const [assetsStatus, setAssetsStatus] = useState("myassets");
    const isButtonClicked = true;
    const address = useAddress();
    const { loading, error, data } = useQuery(GET_TOKENS);
    // console.log(data)

    return (
        <>
            <div className='flex flex-col min-[800px]:mx-40 min-[600px]:mx-10 min-[400px]:mx-4 mx-2 mb-20'>
                <div className="pt-6 flex ">
                    <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                        <p>Mint NFT Stay</p>
                    </div>
                    <div className="pl-4 text-sm my-auto">
                        <p>Booking your homestay</p>
                    </div>
                </div>
                <BookingCard />
                <div className="pt-6 flex ">
                    <div className="border-r-2 pr-4 w-fit text-xl font-bold text-cyan-700">
                        <p>Your NFT Stay</p>
                    </div>
                    <div className="pl-4 text-sm my-auto">
                        <p>Booked contract</p>
                    </div>
                </div>
                <div className='w-full flex flex-row space-x-10 justify-end mr-4'>
                    <div
                        onClick={() => setAssetsStatus("myassets")}
                        className={`${assetsStatus === "myassets" ? "text-sky-500 border-b-2 border-[#0e7490]" : "text-slate-500"}  cursor-pointer font-bold text-xl w-fit`}
                    >
                        My Assets
                    </div>
                    <div
                        onClick={() => setAssetsStatus("listings")}
                        className={`${assetsStatus === "listings" ? "text-sky-500 border-b-2 border-[#0e7490]" : "text-slate-500"}  cursor-pointer font-bold text-xl w-fit`}
                        style={{
                            cursor: 'pointer'
                        }}
                    >
                        Listings
                    </div>
                </div>
                <Booked isButtonClicked={isButtonClicked} page={"booking"} assetsStatus={assetsStatus}/>
            </div>
        </>
    );
});

Inner.displayName = 'Booking Inner';

export default Inner;
