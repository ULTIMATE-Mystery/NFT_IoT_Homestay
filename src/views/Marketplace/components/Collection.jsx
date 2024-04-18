import React, { useState } from 'react'
import homestay from 'assets/image/homestay/homestay6.jpg';

const Collection = ({setNoCollection,index}) => {
    const [mode,setMode] = useState("item");
  return (
    <div className='mt-10 mb-10 text-white min-[1200px]:mx-40 min-[800px]:mx-20 min-[600px]:mx-10 min-[400px]:mx-4 mx-2 flex flex-col space-y-8'>
        <div className='flex flex-row'>
            <div className='text-slate-400 cursor-pointer' 
                onClick={()=>setNoCollection(-1)}>
                Collections  
            </div>
            <div className='text-slate-500'> &nbsp;{'>'} &nbsp;</div> 
            {index}
        </div>
        <div className='p-10 bg-slate-900 flex min-[1100px]:flex-row max-[1100px]:space-y-10 flex-col justify-between align-center my-auto rounded-xl'>
            <div className='flex flex-row space-x-4'>
                <div className="w-16 h-16 bg-white rounded-xl"
                style={{
                    backgroundImage: `url(${homestay})`,
                    backgroundSize: `100% 100%`,

                }}>
                </div>
                <div className='flex flex-col my-auto space-y-2'>
                    <div className='font-bold'>
                        Alexander Homestay
                    </div>
                    <div className='flex flex-row space-x-1'>
                        <div className='text-slate-400 my-auto'>Created by </div>
                        <div className='bg-slate-800 hover:bg-slate-700 cursor-pointer py-1 px-2 rounded-xl align-center flex'>
                            <img src=''/>
                            <div className='flex align-center font-[700]'>Alexander</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row my-auto space-x-4'>
                <div className='flex flex-col space-y-1'>
                    <div className='text-slate-400'>NFTS</div>
                    <div className='flex justify-end font-bold'>100</div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <div className='text-slate-400'>FLOOR PRICE</div>
                    <div className='flex justify-end font-bold'>100</div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <div className='text-slate-400'>WEEK CHANGE</div>
                    <div className='flex justify-end font-bold'>+12.3%</div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <div className='text-slate-400 flex justify-end'>VOLUME</div>
                    <div className='flex justify-end font-bold'>24.2K BNB</div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <div className='text-slate-400'>ROYALTY</div>
                    <div className='flex justify-end font-bold'>5%</div>
                </div>
                <div className='flex flex-col space-y-1'>
                    <div className='text-slate-400 flex justify-end'>CONTRACT</div>
                    <div className='flex justify-end font-bold'>0x1234...df</div>
                </div>
            </div>
        </div>
        <div className="bg-slate-900 flex flex-row w-fit rounded-xl p-1">
            <button className={`text-white ${mode=="item"?"bg-slate-800 font-bold":""} px-6 py-2 rounded-xl`}
            onClick={()=>setMode("item")}>
                Items
            </button>
            <button className={`text-white ${mode=="activity"?"bg-slate-800 font-bold":""} px-6 py-2 rounded-xl`}
            onClick={()=>setMode("activity")}>
                Activity
            </button>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Collection