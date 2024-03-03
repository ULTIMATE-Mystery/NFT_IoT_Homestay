import { Modal } from 'antd'
import React, { useState } from 'react'
import Booked from 'views/Booking/components/Booked';
import LogCheckout from './LogCheckout';
import { parseBigNumber } from 'utils/function/parseBigNumber';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from 'utils/constant';
import Message from 'components/Message';

  

const UserDashboard = ({mode,setMode}) => {
  const [isModalCheckoutOpened, setModalCheckoutOpened] = useState(false);
  const [isModalLogOpened, setModalLogOpened] = useState(false);
  const [isModalReviewLogOpened, setModalReviewLogOpened] = useState(false);
  const [isModalConfirmOpened, setModalConfirmOpened] = useState(false);
  const [contractId,selectContractId] = useState(-1);
  const selectContract = (id)=>{
    selectContractId(id);
  }
  const devices = [[4,true,3579],[5,true,3600],[4,false,4078],[5,false,5662]];
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: checkout, isLoading } = useContractWrite(contract, "checkout")
  const Checkout = async () => {
    try {
      const data = await checkout({ args: [contractId, devices] });
      console.info("contract call successs", data);
      Message.sendSuccess('Successfully checkout!');
    } catch (err) {
      console.error("contract call failure", err);
      Message.sendError('Can not checkout!');
    }
  }
  
  return (
    <div className='mt-4 mx-20 flex flex-col md:flex-row md:space-x-4 border-slate-800 border rounded-md bg-slate-900'>
      <div className='w-full p-10 justify-between space-y-12'>
        <div className='w-full flex justify-end'>
          <button
            class="w-fit px-6 py-3 text-white font-semibold bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-600 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
            onClick={()=>setMode("owner")}>
            Switch to owner's dashboard
          </button>
        </div>
        <div className='text-4xl font-bold text-slate-400'>
          Check out
        </div>
        <div className='flex flex-row space-x-10 w-full justify-between'>
          <div className='text-xl text-slate-400 h-full align-center flex my-auto'>
            First, you should select contract that you want check out. 
          </div>
          <div className='flex flex-row'>
            <div className={`text-4xl mr-4 my-auto font-bold ${contractId!=-1?"py-[2px] px-4 rounded-lg bg-sky-950 border-[2px] border-sky-300":""} `}>
              {contractId!=-1?(<div>
                {parseBigNumber(contractId)}
                </div>
                ):""}
            </div>
            <button onClick={()=>setModalCheckoutOpened(true)}
            class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-36 my-auto  rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
              <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
              <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
              <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
              <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
              <p class="z-10">{contractId==-1?"Select contract":"Change contract"}</p>
            </button>
          </div>
          
          {isModalCheckoutOpened&&(
            <Modal 
             open={isModalCheckoutOpened} onCancel={()=>setModalCheckoutOpened(false)} 
             onOk={()=>setModalCheckoutOpened(false)} width={1200}>
               <Booked isButtonClicked={isModalCheckoutOpened}
                page={"management"} 
                contractId ={contractId}
                selectContract={selectContract}
                setModalCheckoutOpened={setModalCheckoutOpened}/>
            </Modal>
               
          )}
        </div>
        <div className='flex flex-row space-x-10 w-full justify-between'>
          <div className='text-xl text-slate-400 h-full align-center flex my-auto'>
            After selection, you'ld check iot's history logs of devices. 
          </div>
          <div className='flex flex-row space-x-4'>
            <button onClick={()=>setModalReviewLogOpened(true)}
            class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-32 my-auto  rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
              <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
              <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
              <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
              <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
              <p class="z-10">Review logs</p>
            </button>
            <button onClick={()=>setModalLogOpened(true)}
            class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-36 my-auto  rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
              <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
              <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
              <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
              <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
              <p class="z-10">Confirmed Logs</p>
            </button>
          </div>
          {isModalReviewLogOpened&&(
            <Modal 
             open={isModalReviewLogOpened} onCancel={()=>setModalReviewLogOpened(false)} 
             onOk={()=>setModalReviewLogOpened(false)} width={1200}>
               {devices}
            </Modal>
          )}
          {isModalLogOpened&&(
            <Modal 
             open={isModalLogOpened} onCancel={()=>setModalLogOpened(false)} 
             onOk={()=>setModalLogOpened(false)} width={1200}>
               <LogCheckout isButtonClicked={isModalLogOpened} contractId={contractId}/>
            </Modal>
          )}
        </div>
        <div className='flex flex-row space-x-10 align-center'>
          <div className='text-xl text-slate-400 h-full align-center flex my-auto'>
            After check carefully, you can press the button check out here. 
          </div>
        </div>
        <div className='w-full justify-center flex'>
          <button onClick={()=>setModalConfirmOpened(true)}
            class="w-fit px-12 py-3 text-white font-semibold bg-gradient-to-r from-blue-800 via-pink-400 via-purple-600 to-blue-600 shadow-lg hover:scale-110 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer
            hover:bg-gradient-to-bl font-bold rounded-md shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer">
            Check out
          </button>
          {isModalConfirmOpened&&(
            <Modal 
             open={isModalConfirmOpened} onCancel={()=>setModalConfirmOpened(false)} 
             onOk={()=>setModalConfirmOpened(false)} width={1200}>
              <div className='w-full'>
                <div className='w-full justify-center flex text-3xl mt-6 '>
                  After checkout, you can not turn back!
                </div>
                <button onClick={()=>{
                  Checkout(contractId);
                  setModalConfirmOpened(false);
                }}
                 className='"w-fit px-12 py-3 text-white font-semibold bg-gradient-to-r from-blue-800 via-pink-400 via-purple-600 to-blue-600 shadow-lg hover:scale-110 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer
            hover:bg-gradient-to-bl font-bold rounded-md shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer flex justify-center px-auto mx-auto mt-8 text-white text-2xl font-bold'>
              Confirm
              </button>
              </div>
            </Modal>
               
          )}
        </div>
        
      </div>
      
    </div>
  )
}

export default UserDashboard