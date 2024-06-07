import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import Message from 'components/Message';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from 'utils/constant';
import { parseBigNumber } from 'utils/function/parseBigNumber';

const Policy = () => {
  const [isAddVersionPolicyLoading, setAddVersionLoading] = useState(-1);
  const [showInputForm, setShowInputForm] = useState(false);
  const [minTimeToCancelPrepaid, setMinTimeToCancelPrepaid] = useState(0);
  const [minTimeToCancelDeposit, setMinTimeToCancelDeposit] = useState(0);
  const [percentDeposit, setPercentDeposit] = useState(0);

  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading, error } = useContractRead(contract, "getLatestPolicy", []);
  const { data: dataOwner, isLoading: isLoadingOwner, error: isErrorOwner } = useContractRead(contract, "owner", []);
  const address = useAddress();
  const handleAddVersion = async () => {
    if (contract) {
      try {
        setAddVersionLoading(true);
        // Call the add version function
        await contract.call('newPolicyVersion', [
          minTimeToCancelPrepaid*3600,
          minTimeToCancelDeposit*3600,
          percentDeposit
        ]);
        setAddVersionLoading(false);
        Message.sendSuccess('Successfully Added New Version Of Policy!');
        setShowInputForm(false);
      } catch (error) {
        console.error('Error calling newPolicyVersion:', error);
        Message.sendError('Oops! Your transaction about adding new policy version was not successful! Maybe check your policy parameters and try again');
        setAddVersionLoading(false);
      }
    } else {
      console.error('Contract not loaded or not connected to Web3');
      Message.sendError('Contract not loaded or not connected to Web3');
    }
  };

  useEffect(() => {
    if (isAddVersionPolicyLoading === undefined) 
      setTimeout(() => {
        window.location.reload();
      }, 3000);
  }, [isAddVersionPolicyLoading]);

  return (
    <div className='flex flex-col space-y-2 text-[16px]'>
      <div className='text-3xl mb-4'>
        Latest Booking Policy
      </div>
      {data && data.length && dataOwner > 0 ? (
        <>
          <div>
            <div>1. Minimum time that renter can cancel contract:</div>
            <ul className='ml-4 flex flex-col gap-[4px]'>
              <li>1.2 For prepaid contract: <span className='font-bold'>{parseBigNumber(data[0]) / 3600} hours</span> before check-in time.</li>
              <li>1.3 For deposit contract: <span className='font-bold'>{parseBigNumber(data[1]) / 3600} hours</span> before check-in time.</li>
            </ul>
          </div>
          <div>
            <div>2. Deposit booking contract</div>
            <ul className='ml-4 flex flex-col gap-[4px]'>
              <li>2.1 Percentage of total renting amount that renter need to pay for deposit booking: <span className='font-bold'>{parseBigNumber(data[2])}%</span>.</li>
              <li>2.2 Renter need to pay the remaining amount to be able to make contract available. Then renter can access and use all smart IoT features in the room. </li>
              <li>2.3 If the renter do not pay the remaining amount, the deposit amount will be transferred automatically to owner wallet and the contract will be cancelled. It means renter will lose all their deposit money.</li>
              <li>2.4 Unpaid-remaining contracts are prohibited from listing on Marketplace.</li>
            </ul>
          </div>
          <div>
            3. Renter have to checkout before ended time of the contract, otherwise renter need to deal directly with the owner and do the checkout.
          </div>
          <button onClick={() => setShowInputForm(true)} className='btn btn-primary mt-4'>
            Add New Policy Version
          </button>
          {showInputForm && (
            <div className='mt-4'>
              <div className='flex flex-col space-y-2'>
                <label>
                  Minimum Time to Cancel Prepaid (hours):
                  <input 
                    type='number' 
                    value={minTimeToCancelPrepaid} 
                    onChange={(e) => setMinTimeToCancelPrepaid(e.target.value)} 
                    className=' border-2 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                    w-full placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                  />
                </label>
                <label>
                  Minimum Time to Cancel Deposit (hours):
                  <input 
                    type='number' 
                    value={minTimeToCancelDeposit} 
                    onChange={(e) => setMinTimeToCancelDeposit(e.target.value)} 
                    className="border-2 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                    w-full placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </label>
                <label>
                  Percent Deposit:
                  <input 
                    type='number' 
                    value={percentDeposit} 
                    onChange={(e) => setPercentDeposit(e.target.value)} 
                    className=' border-2 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                    w-full placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                  />
                </label>
                <button onClick={handleAddVersion} className='w-fit px-12 py-3 mx-auto rounded-lg border text-lg font-bold text-slate-600 hover:scale-105 hover:text-slate-400 bg-slate-200 hover:bg-slate-100 hover:border-blue-400'>
                  Submit
                </button>
                <div onClick={() => setShowInputForm(false)} className='w-fit px-12 py-3 mx-auto rounded-lg border text-lg font-bold text-slate-600 hover:scale-105 hover:text-slate-400 bg-slate-200 hover:bg-slate-100 hover:border-blue-400'>
                  Cancel
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className='text-xl'>No policy found. Please add a new policy version.</div>
          <div className='mt-4'>
            <div className='flex flex-col space-y-2'>
              <label className='text-lg'>
                Minimum Time to Cancel Prepaid (hours):
                <input 
                  type='number' 
                  value={minTimeToCancelPrepaid} 
                  onChange={(e) => setMinTimeToCancelPrepaid(e.target.value)} 
                  className=' border-2 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                  w-full placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                />
              </label>
              <label className='text-lg'>
                Minimum Time to Cancel Deposit (hours):
                <input 
                  type='number' 
                  value={minTimeToCancelDeposit} 
                  onChange={(e) => setMinTimeToCancelDeposit(e.target.value)} 
                  className=' border-2 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                  w-full placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                />
              </label>
              <label className='text-lg'>
                Percent Deposit:
                <input 
                  type='number' 
                  value={percentDeposit} 
                  onChange={(e) => setPercentDeposit(e.target.value)} 
                  className=' border-2 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                  w-full placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                />
              </label>
              <button onClick={handleAddVersion} className='w-fit px-12 py-3 mx-auto rounded-lg border text-lg font-bold text-slate-600 hover:scale-105 hover:text-slate-400 bg-slate-200 hover:bg-slate-100 hover:border-blue-400'>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policy;
