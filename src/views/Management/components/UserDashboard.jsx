import { Modal } from 'antd';
import { useState } from 'react';
import Booked from 'views/Booking/components/Booked';
import LogCheckout from './LogCheckout';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from 'utils/constant';
import Message from 'components/Message';

const UserDashboard = ({ mode, setMode }) => {
  const [isModalCheckoutOpened, setModalCheckoutOpened] = useState(false);
  const [isModalReviewLogOpened, setModalReviewLogOpened] = useState(false);
  const [contractId, selectContractId] = useState(-1);
  const [lastSuccessfulContractId, setLastSuccessfulContractId] = useState(-1);
  const [newContractSelected, setNewContractSelected] = useState(false);
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: checkout } = useContractWrite(contract, "checkout");

  const selectContract = (id) => {
    selectContractId(id);
    setNewContractSelected(true);
  };

  const Checkout = async () => {
    if (contractId === -1) return;
    setIsLoading(true);
    try {
      const data = await checkout({ args: [contractId] });
      console.info("Contract call success", data);
      Message.sendSuccess('Successfully checked out!');
      setLastSuccessfulContractId(contractId);
      setCheckoutSuccessful(true);
      selectContractId(-1);
      setNewContractSelected(false);
    } catch (err) {
      console.error("Contract call failure", err);
      Message.sendError('Cannot check out!');
    }
    setIsLoading(false);
    setCheckoutSuccessful(false);
  };

  return (
    <div className='mt-4 mx-20 flex flex-col md:flex-row md:space-x-4 border-slate-800 border rounded-md bg-slate-900'>
      <div className='w-full p-10 justify-between space-y-12'>
        <div className='w-full flex justify-end'>
          <button className="w-fit px-6 py-3 text-white font-semibold bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-600 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
            onClick={()=>setMode("owner")}>
            Switch to owner's dashboard
          </button>
        </div>
        <div className='flex flex-row space-x-10 w-full justify-between'>
          <div className='text-xl text-slate-400 h-full align-center flex my-auto'>
            First, select the contract of your rental room that you want to check out.
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-slate-400">{contractId > -1 ? `Room ID: ${contractId}` : 'No contract selected'}</div>
            <button onClick={() => setModalCheckoutOpened(true)}
              className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] w-36 my-auto rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
              Select Contract
            </button>
          </div>
          {isModalCheckoutOpened && (
            <Modal
             open={isModalCheckoutOpened} onCancel={()=>setModalCheckoutOpened(false)}
             onOk={()=>setModalCheckoutOpened(false)} width={1200}>
               <Booked isButtonClicked={isModalCheckoutOpened}
                page={"management"} 
                contractId={contractId}
                selectContract={selectContract}
                setModalCheckoutOpened={setModalCheckoutOpened}/>
            </Modal>
          )}
        </div>
        <div className='flex flex-row space-x-10 w-full justify-between'>
          <div className='text-xl text-slate-400 h-full align-center flex my-auto'>
            After selection, you can check out.
          </div>
          <button onClick={Checkout}
            disabled={!newContractSelected || isLoading}
            className={`border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] w-32 my-auto rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold ${!newContractSelected || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? 'Checking Out...' : 'Check Out'}
          </button>
        </div>
        <div className='flex flex-row space-x-10 w-full justify-between'>
          <div className='text-xl text-slate-400 h-full align-center flex my-auto'>
            After checking out successfully, you can review the room logs here.
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-slate-400">{lastSuccessfulContractId > -1 ? `Room ID: ${lastSuccessfulContractId}` : 'No room reviewed'}</div>
            <button onClick={() => setModalReviewLogOpened(true)}
              disabled={!checkoutSuccessful && lastSuccessfulContractId === -1}
              className={`border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-[44px] w-32 my-auto rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold ${!checkoutSuccessful && lastSuccessfulContractId === -1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Review Logs
            </button>
          </div>
          {isModalReviewLogOpened && (
            <Modal
            footer={null}
             open={isModalReviewLogOpened} onCancel={()=>setModalReviewLogOpened(false)}
             onOk={()=>setModalReviewLogOpened(false)} width={1200}>
               {lastSuccessfulContractId !== -1 ? (
                  <LogCheckout isButtonClicked={isModalReviewLogOpened} contractId={lastSuccessfulContractId}/>
                ) : (
                  <div>You need to select a contract</div>
                )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
