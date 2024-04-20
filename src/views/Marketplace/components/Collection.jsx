import React, { useState } from 'react'
import homestay from 'assets/image/homestay/homestay6.jpg';
import { DownOutlined } from '@ant-design/icons';

const Collection = ({setNoCollection,index}) => {
    const [mode,setMode] = useState("item");
    const [isDropdown,setIsDropdown] = useState({
        price: false,
        status: false,
        homestay: false,
    })
    const [priceRange, setPriceRange] = useState({min:0,max:320000});
    const [status, setStatus] = useState({
        onSale: false,
        notForSale: false,
        minted: false,
        auction: false,
    })
    const [homestay, setHomestay] = useState({
        Alexander: false,
        LayGarden: false,
    });
    const handlePriceRange = (e, field) => {
        setPriceRange((prev) => ({
            ...prev,
            [field]: parseInt(e.target.value) || 0,
        }));
    }
    const handleStatusChange = (e) => {
        setStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    }
    const handleHomestayChange = (e) => {
        setHomestay((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    }
    const toggleDropdown = (field) => {
        setIsDropdown((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    } 
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
        <div className='flex flex-row justify-between'>
            <div className='bg-slate-900 flex flex-col divide-y divide-slate-700 p-2 rounded-xl w-96'>
                <div className='p-4'>
                Filters
                </div>
                <div className='flex flex-col justify-between p-4'>
                <div className='w-full flex justify-between'>
                    <div>Price</div>
                    <DownOutlined
                    className={`${isDropdown.price ? 'transform rotate-180' : ''}`}
                    onClick={() => toggleDropdown('price')}
                    />
                </div>
                {isDropdown.price && (
                    <div className='w-full flex items-center justify-between space-x-4 pt-4'>
                    <input
                        type="number"
                        min="0"
                        value={priceRange.min}
                        onChange={(e) => handlePriceRange(e, 'min')}
                        className="p-2 bg-slate-800 border-1 focus:border-slate-800 focus:border-1 focus:outline-none rounded-xl w-[calc(50%-8px)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="From"
                    />
                    <input
                        type="number"
                        min="0"
                        value={priceRange.max}
                        onChange={(e) => handlePriceRange(e, 'max')}
                        className="p-2 bg-slate-800 border-1 focus:border-slate-800 focus:border-1 focus:outline-none rounded-xl w-[calc(50%-8px)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    </div>
                )}
                </div>
                <div className='flex flex-col justify-between p-4'>
                <div className='w-full flex justify-between'>
                    <div>Status</div>
                    <DownOutlined
                    className={`${isDropdown.status ? 'transform rotate-180' : ''}`}
                    onClick={() => toggleDropdown('status')}
                    />
                </div>
                {isDropdown.status && (
                <div className='w-full pt-4'>
                    <label className="block">
                        <input
                        type="checkbox"
                        name="onSale"
                        checked={status.onSale}
                        onChange={handleStatusChange}
                        className="mr-2 accent-slate-900 bg-slate-90 hover:accent-slate-800"
                        />
                        On sale
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            name="notForSale"
                            checked={status.notForSale}
                            onChange={handleStatusChange}
                            className="mr-2 accent-slate-900 bg-slate-90 hover:accent-slate-800"
                        />
                        Not for sale
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            name="minted"
                            checked={status.minted}
                            onChange={handleStatusChange}
                            className="mr-2 accent-slate-900 bg-slate-90 hover:accent-slate-800"
                        />
                        Minted
                    </label>
                    <label className="block">
                        <input
                            type="checkbox"
                            name="auction"
                            checked={status.auction}
                            onChange={handleStatusChange}
                            className="mr-2 accent-slate-900 bg-slate-90 hover:accent-slate-800"
                        />
                        Auction
                    </label>
                </div>
                )}
                </div>
                <div className='flex flex-col justify-between p-4'>
                <div className='w-full flex justify-between'>
                    <div>Homestay</div>
                    <DownOutlined
                    className={`${isDropdown.homestay ? 'transform rotate-180' : ''}`}
                    onClick={() => toggleDropdown('homestay')}
                    />
                </div>
                {isDropdown.homestay && (
                    <div className='w-full pt-4'>
                    <label className="block">
                        <input
                        type="checkbox"
                        name="Alexander"
                        checked={homestay.Alexander}
                        onChange={handleHomestayChange}
                        className="mr-2 accent-slate-900 bg-slate-90 hover:accent-slate-800"
                        />
                        Alexander
                    </label>
                    <label className="block">
                        <input
                        type="checkbox"
                        name="LayGarden"
                        checked={homestay.LayGarden}
                        onChange={handleHomestayChange}
                        className="mr-2 accent-slate-900 bg-slate-90 hover:accent-slate-800"
                        />
                        Lay Garden
                    </label>
                    </div>
                )}
                </div>
            </div>
            <div className='nft-cards'>

            </div>
        </div>
    </div>
  )
}

export default Collection