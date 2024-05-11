import LogCardCheckout from './LogCardCheckout';

const LogCheckout = ({isButtonClicked, contractId}) => {
    return (
      <>
        <div className='p-2' style={{ maxHeight: 'inherit', overflowY: 'auto' }}> 
          <div>
            {isButtonClicked && (
              <>
                <div className='flex flex-row w-full mb-6 text-2xl text-sky-800 font-[1000]' style={{ marginBottom: '1rem' }}>
                  <div className="basis-1/4 flex justify-center">
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

export default LogCheckout