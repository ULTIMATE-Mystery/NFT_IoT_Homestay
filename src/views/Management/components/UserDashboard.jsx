import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import Booked from 'views/Booking/components/Booked';
import LogCheckout from './LogCheckout';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from 'utils/constant';
import Message from 'components/Message';
import Loading from 'components/Loading';

const UserDashboard = ({ mode, setMode }) => {
  const [isModalCheckoutOpened, setModalCheckoutOpened] = useState(false);
  const [isModalReviewLogOpened, setModalReviewLogOpened] = useState(false);
  const [isModalConfirmOpened, setModalConfirmOpened] = useState(false);

  const [contractId, selectContractId] = useState(-1);
  const [lastSuccessfulContractId, setLastSuccessfulContractId] = useState(
    Number(localStorage.getItem('lastSuccessfulContractId')) || -1
  );
  const [newContractSelected, setNewContractSelected] = useState(false);
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(
    localStorage.getItem('checkoutSuccessful') === 'true'
  );
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem('isLoading') === 'true'
  );

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: checkout } = useContractWrite(contract, "checkout");

  useEffect(() => {
    localStorage.setItem('lastSuccessfulContractId', lastSuccessfulContractId.toString());
    localStorage.setItem('checkoutSuccessful', checkoutSuccessful.toString());
    localStorage.setItem('isLoading', isLoading.toString());
  }, [lastSuccessfulContractId, checkoutSuccessful, isLoading]);

  const selectContract = (id) => {
    if (isLoading) return;
    selectContractId(id);
    setNewContractSelected(true);
    setCheckoutSuccessful(false);
  };

  const handleCheckout = async () => {
    if (contractId === -1 || isLoading || !newContractSelected) return;
    setIsLoading(true);

    try {
      const data = await checkout({ args: [contractId] });
      console.info("Contract call success", data);
      Message.sendSuccess('Successfully checked out!');
      setLastSuccessfulContractId(contractId);
      setCheckoutSuccessful(true);
    } catch (err) {
      console.error("Contract call failure", err);
      Message.sendError('Cannot check out!');
    } finally {
      setIsLoading(false);
      setModalConfirmOpened(false);
    }
  };

  const clearLogs = () => {
    setLastSuccessfulContractId(-1);
    setCheckoutSuccessful(false);
    setIsLoading(false);
    localStorage.removeItem('lastSuccessfulContractId');
    localStorage.removeItem('checkoutSuccessful');
    localStorage.removeItem('isLoading');
  };

  return (
    <div className={`mt-4 mx-4 md:mx-20 flex flex-col md:flex-row md:space-x-4 border-slate-800 border rounded-md bg-slate-900 ${isLoading ? 'relative loading-overlay' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Loading />
        </div>
      )}
      <div className='w-full p-6 md:p-10 justify-between space-y-8 md:space-y-12 '>
        <div className='w-full flex justify-between space-x-4'>
          <button onClick={() => { if (!isLoading) setMode("owner"); }}
            className="w-fit px-4 py-2 md:px-6 md:py-3 text-white font-semibold bg-gradient-to-r from-indigo-700 h-[100%] via-purple-500 to-pink-600 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
            disabled={isLoading}>
            Switch to owner's dashboard
          </button>
          <div className="flex">
            <button onClick={clearLogs}
              className={`w-fit border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[100%] md:w-full my-auto rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold ${(!checkoutSuccessful && lastSuccessfulContractId === -1) || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
              <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
              <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
              <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
              <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
              <p className="z-10 text-sm md:text-base">Clear Room Log Data</p>
            </button>
          </div>
        </div>
        <div className='text-2xl md:text-4xl font-bold text-slate-400 text-center'>
          Check out
        </div>
        <div className='flex flex-col md:flex-row md:space-x-10 w-full justify-between items-center'>
          <div className='text-lg md:text-xl text-slate-400 flex my-auto mb-4'>
            First, select the contract of your rental room that you want to check out.
          </div>
          <div className="flex items-center justify-end w-full md:w-auto">
            <div className="font-bold text-slate-400 text-sm md:text-base">{contractId > -1 ? `NFT ID: ${contractId}` : 'No contract selected'}</div>
            <button onClick={() => { if (!isLoading) setModalCheckoutOpened(true); }}
               className={`ml-4 w-fit border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] w-28 md:w-40 my-auto rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
              <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
              <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
              <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
              <p className="z-10 text-sm md:text-base">{contractId===-1?"Select contract":"Change contract"}</p>
            </button>
          </div>
          
          {isModalCheckoutOpened && (
            <Modal
              open={isModalCheckoutOpened} 
              onCancel={() => setModalCheckoutOpened(false)}
              footer={null} 
              width={1200} 
              centered
              style={{ maxHeight: '95vh', overflowY: 'auto', padding: 0 }}
              className="custom-modal"
            >
              <div className="relative pt-6">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loading />
                  </div>
                ) : (
                  <Booked 
                    isButtonClicked={isModalCheckoutOpened}
                    page={"management"}
                    contractId={contractId}
                    selectContract={selectContract}
                    setModalCheckoutOpened={setModalCheckoutOpened} 
                  />
                )}
              </div>
            </Modal>
          )}
        </div>
        <div className='flex flex-col md:flex-row md:space-x-10 w-full justify-between'>
          <div className='text-lg md:text-xl text-slate-400 flex my-auto mb-4'>
            After selection, you can check out.
          </div>
          <div className="flex justify-center w-full md:w-auto">
            <button onClick={() => { if (!isLoading && newContractSelected) setModalConfirmOpened(true); }}
              disabled={!newContractSelected || isLoading}
              className={`w-fit px-8 py-2 md:px-12 md:py-3 text-white font-semibold bg-gradient-to-r from-blue-800 via-pink-400 via-purple-600 to-blue-600 shadow-lg hover:scale-110 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer
              hover:bg-gradient-to-bl font-bold rounded-md shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer ${!newContractSelected || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Checking Out...' : 'Check Out'}
            </button>
          </div>
          {isModalConfirmOpened && (
            <Modal
              open={isModalConfirmOpened}
              onCancel={() => setModalConfirmOpened(false)}
              footer={null}
              width={500}
              centered
            >
              <div className='w-full text-center p-5'>
                <h3 className='text-xl font-semibold mb-5'>Are you sure you want to check out?</h3>
                <div>
                  <button onClick={() => {
                    handleCheckout(); // Call the handleCheckout function
                    setModalConfirmOpened(false); // Then close the modal
                  }}
                  className='mr-4 px-4 py-2 md:px-6 md:py-2.5 w-fit text-white font-semibold bg-gradient-to-r from-blue-800 via-pink-400 via-purple-600 to-blue-600 shadow-lg hover:scale-110 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer
                  hover:bg-gradient-to-bl font-bold rounded-md shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer'>
                    Confirm
                  </button>
                  <button onClick={() => setModalConfirmOpened(false)}
                    className='px-4 py-2 md:px-6 md:py-2.5 w-fit text-white font-semibold bg-gradient-to-r from-red-500 via-pink-400 via-red-600 to-pink-500 shadow-lg hover:scale-110 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer
                    hover:bg-gradient-to-bl font-bold rounded-md shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer'>
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <div className='flex flex-col md:flex-row md:space-x-10 w-full justify-between items-center'>
          <div className='text-lg md:text-xl text-slate-400 flex my-auto mb-4'>
          After successfully checking out, you can review the room log here.
          </div>
          <div className="flex items-center justify-end w-full md:w-auto">
            <div className="font-bold text-slate-400 text-sm md:text-base">{lastSuccessfulContractId > -1 ? `NFT ID: ${lastSuccessfulContractId}` : 'No room reviewed'}</div>
            <button onClick={() => { if (!isLoading) setModalReviewLogOpened(true); }}
              disabled={!checkoutSuccessful && lastSuccessfulContractId === -1 || isLoading}
              className={`ml-4 border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] w-28 md:w-32 my-auto rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold ${(!checkoutSuccessful && lastSuccessfulContractId === -1) || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
                <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
                <p className="z-10 text-sm md:text-base">Review Log</p>
            </button>
          </div>
          {isModalReviewLogOpened && (
            <Modal
              footer={null}
              open={isModalReviewLogOpened}
              onCancel={() => setModalReviewLogOpened(false)}
              width={1200}
              centered
              style={{ maxHeight: '95vh', overflowY: 'auto', padding: 0 }}
              className="custom-modal"
            >
              <div className="relative pt-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loading />
                  </div>
                ) : (
                  lastSuccessfulContractId !== -1 ? (
                    <LogCheckout isButtonClicked={isModalReviewLogOpened} contractId={lastSuccessfulContractId} />
                  ) : (
                    <div>No contract selected.</div>
                  )
                )}
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
