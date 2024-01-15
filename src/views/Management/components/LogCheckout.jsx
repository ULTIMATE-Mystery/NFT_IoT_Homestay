import Loading from 'components/Loading';
import React from 'react'
import GetBookedContracts from 'views/Booking/GetBookedContracts';
import LogCardCheckout from './LogCardCheckout';

const LogCheckout = ({isButtonClicked}) => {
    const { data, isLoading } = GetBookedContracts();
    return (
        <>
            <div className='p-20'>
                <div>
                    {isLoading && <div className='absolute w-full h-full flex mx-auto px-auto align-center justify-center py-40'>
                                        <Loading/>
                                    </div>}
                    {isButtonClicked && data && !isLoading && (
                        <>
                            <div className='flex flex-row w-full mb-6 text-3xl text-sky-800 font-[1000]'>
                                <div className="basis-1/4 flex justify-center">
                                    Device ID
                                </div>
                                <div className="basis-1/4 flex justify-center">
                                    Status
                                </div>
                                <div className="basis-2/4 flex justify-center">
                                    Time
                                </div>
                            </div>
                            <LogCardCheckout
                                tokenId={data[data.length-1]}
                            ></LogCardCheckout>
                        </>
                    )}
                </div>
            </div>
            {!isLoading && data.length==0 && 
                    <div className='justify-center flex w-full'>
                        <div className="text-4xl p-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                            No contracts were created.
                        </div>  
                    </div>}
        </>
    );
}

export default LogCheckout