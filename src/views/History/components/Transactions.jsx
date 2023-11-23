import React,{useState} from 'react'
import Filter from "icons/Filter";
import { SearchOutlined } from '@ant-design/icons';
import { ExportOutlined } from '@ant-design/icons';
import TransactionCard from './TransactionCard';
import GetAllContractsHomestay from '../GetAllContractsHomestay';
const Transactions = () => {
  const { data, isLoading } = GetAllContractsHomestay();
  const [mode,setMode] = useState(0);
  return (
    <>
      {/*Transaction history body */}
        <div className='w-full flex-row space-y-12'>
            {/*Search and filter*/}
            <div className='w-full flex justify-between space-x-6'>
              {/*Search*/}
              <div className='w-full flex flex-start p-2 bg-slate-800 rounded-lg'>
                  <div className='w-full flex flex-cols w-full justify-between space-x-2'>
                      <SearchOutlined/>
                      <input type='text' placeholder='Seach for transactions...'
                      className='bg-slate-800 flex w-full outline-none'/>
                  </div>
              </div>
              {/*Filter*/}
              <button className='border border-white rounded-lg flex flex-end p-2 justify-between space-x-2'>
                  <Filter/>
                  <p>
                    Filter 
                  </p>
              </button>
              {/*Export*/}
              <button className='border border-white rounded-lg flex flex-end p-2 justify-between space-x-2'>
                  <ExportOutlined/>
                  <p>
                    Export
                  </p>
              </button>
            </div>
            {/*Mode*/}
            <div className='flex space-x-4'>
              <button
                className={`${!mode ? 'bg-slate-600' : 'bg-slate-800'} p-3 rounded-lg`}
                onClick={() => setMode(0)}>
                All transactions
              </button>
              <button
                className={`${!mode ? 'bg-slate-800' : 'bg-slate-600'} p-3 rounded-lg`}
                onClick={() => setMode(1)}>
                Analytics
              </button>
            </div>
            {/*Transactions card*/}
            {!mode
            ?(<div>
              <div className='w-full flex flex-row text-slate-500 p-4'>
              <div class="basis-1/12 flex justify-center">Nft ID</div>
              <div class="basis-1/4 flex justify-center">Transaction hash</div>
              <div class="basis-1/6 flex justify-center">Timestamp</div>
              <div class="basis-1/4 flex justify-center flex justify-center">From</div>
              <div class="basis-1/12 flex justify-center">Room ID</div>
              <div class="basis-1/6 flex justify-center">Price</div>
            </div>
            <div>
            {isLoading && <p>Loading data...</p>}
            {data && !isLoading && (
                        <>
                            {data.map((data, index) => (
                                <TransactionCard
                                    key={index}
                                    tokenId={parseInt(data)}
                                ></TransactionCard>)
                                      )
                            }
                        </>
                    )}
            {!isLoading && !data && <div>No contracts was created.</div>}
            </div>
            </div>)
            :(<div>
              
            </div>)}
            
        </div>
    </>
    
  )
}

export default Transactions