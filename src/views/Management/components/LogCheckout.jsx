import LogCardCheckout from './LogCardCheckout';

const LogCheckout = ({isButtonClicked,contractId}) => {
    return (
        <>
            <div className='p-20'>
                <div>
                    {isButtonClicked && (
                        <>
                            <div className='flex flex-row w-full mb-6 text-3xl text-sky-800 font-[1000]'>
                                <div className="basis-1/4 flex justify-center">
                                    Device ID
                                </div>
                                <div className="basis-1/4 flex justify-center">
                                    Status/Value
                                </div>
                                <div className="basis-2/4 flex justify-center">
                                    Time
                                </div>
                            </div>
                            <LogCardCheckout
                                tokenId={contractId}
                            ></LogCardCheckout>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default LogCheckout