import LogCardCheckout from './LogCardCheckout';

const LogCheckout = ({ isButtonClicked, contractId }) => {
  return (
    <>
      <div className='max-h-full overflow-y-auto'>
        <div>
          {isButtonClicked && (
            <>
              <div className='flex flex-row w-full mb-1 text-[16px] text-sky-800 font-bold'>
                <div className="basis-2/4 flex justify-center">
                  Device Name
                </div>
                <div className="basis-1/4 flex justify-center">
                  Status/Value
                </div>
                <div className="basis-2/4 flex justify-center">
                  Time
                </div>
              </div>
              <LogCardCheckout tokenId={contractId}></LogCardCheckout>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LogCheckout;