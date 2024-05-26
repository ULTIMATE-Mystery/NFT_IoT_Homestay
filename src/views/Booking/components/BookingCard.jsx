import { useState } from 'react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import Message from 'components/Message';
import { CONTRACT_ADDRESS } from 'utils/constant';
import {  DatePicker, Space  } from 'antd';
import './Booking.scss';
import { ConnectWallet } from "@thirdweb-dev/react";
import { parseBigNumber } from 'utils/function/parseBigNumber';
import ButtonNFT from 'components/ButtonNFT';
const { RangePicker } = DatePicker;


const BookingCard = () => {
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');
    const [roomId, setRoomId] = useState('');

    const onChange = (value, dateString) => {
        const startDate = new Date(value[0]);
        const endDate = new Date(value[1]);
        setStartTime(value[0]);
        setEndTime(value[1]);
      
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();
        setStartTimestamp(startTimestamp);
        setEndTimestamp(endTimestamp);
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const handleRoomIdChange = e => {
        setRoomId(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (contract) {
            try {
                const amountUsd = await contract.call('calculateRentAmount', [
                    Math.floor(endTimestamp/1000)-Math.ceil(startTimestamp/1000),
                ]);
                //amount bnb by wei
                const amountBnb = await contract.call('usdToBnb', [
                    amountUsd,
                ]);
                console.log('amountBnb',parseBigNumber(amountBnb));
                // Call the safeMint function
                await contract.call('safeMint', [
                    roomId,
                    0,
                    Math.floor(startTimestamp/1000),
                    Math.ceil(endTimestamp/1000),
                ],{
                    value: amountBnb,
                });
                
                Message.sendSuccess('Successfully booked!');
            } catch (error) {
                console.error('Error calling safeMint:', error);
                Message.sendError('Oops! Your booking was not successful! Maybe check your bookings parameters and try again');
            }
        } else {
            console.error('Contract not loaded or not connected to Web3');
            Message.sendError('Contract not loaded or not connected to Web3');
        }
    };

    return (
        <>
        <div className=''>
            
                <div
                    className="flex rounded-xl bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-base rounded-2xl mt-8 text-white"
                >
                    <div className="m-[2px] bg-slate-950 rounded-xl w-full flex">
                        <div
                            to="/home"
                            className="min-[800px]:p-20 min-[750px]:p-10 min-[400px]:p-6 p-4 mr-0 w-full flex flex-col"
                        >
                            <div className="min-[1000px]:w-full flex justify-end min-[1000px]:space-x-4 max-[1000px]:space-y-3 mb-4 min-[1000px]:flex-row flex-col">
                                <button class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-40 my-auto  rounded-md bg-sky-600 p-2 flex justify-center items-center font-extrabold">
                                        <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                        <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                        <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                        <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                        <p class="z-10">See room validity</p>
                                </button>
                                <button class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-64 my-auto  rounded-md bg-sky-600 p-2 flex justify-center items-center font-extrabold">
                                        <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                        <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                        <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                        <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                        <p class="z-10">Change homestay contract</p>
                                </button>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-6"
                            >   <div className='flex flex-col'>
                                    <label className='text-2xl font-bold text-slate-500'>Homestay Name</label>
                                    <p className="text-4xl bg-gradient-to-r from-primary to-danger bg-clip-text
                                     text-transparent w-fit font-[1000]">
                                        Alexander Homestay
                                    </p>
                                </div>
                                <div className="flex min-[800px]:flex-row flex-col flex-basis">
                                    <label className="my-auto text-2xl font-bold text-slate-500 basis-1/4">
                                        Room ID
                                    </label>
                                    <input
                                        className=" border-2 border-slate-950 px-6 py-3 rounded-lg focus:border-sky-500 focus:border-2 focus:outline-none 
                                        w-full bg-slate-800 text-white placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Room No"
                                        type="number"
                                        onChange={handleRoomIdChange}
                                    />
                                </div>
                                <div className='flex min-[800px]:flex-row flex-col flex-basis'>
                                    <div className='my-auto text-2xl font-bold text-slate-500 basis-1/4'>
                                        Time
                                    </div>
                                    <Space className='flex w-full' direction="vertical" size={12}>
                                        <RangePicker
                                        className=' bg-slate-800 border border-slate-950 py-3 px-6 w-full'
                                        showTime={{
                                            format: 'HH:mm',
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        value={[startTime,endTime]}
                                        onChange={onChange}
                                        onOk={onOk}
                                        />
                                        {console.log(startTime,endTime)}
                                    </Space> 
                                </div>
                                
                                <div className="w-full flex justify-center pt-8">
                                    {address&&<button
                                        type="submit"
                                        className="!text-white"
                                    >
                                        <ButtonNFT content={"Book now"} className={" !py-4 !px-16"}/>
                                    </button>}
                                    {
                                    !address && (
                                        <ConnectWallet
                                            btnTitle="Connect wallet" 
                                            className='!rounded-xl !text-white !bg-gradient-to-r 
                                            !from-blue-700 !via-pink-400 !via-purple-600 !to-blue-600 
                                            !shadow-lg !hover:scale-110 !duration-200 !hover:drop-shadow-2xl 
                                            !hover:shadow-[#7dd3fc] !hover:cursor-pointer !hover:bg-gradient-to-bl 
                                            !font-bold !rounded-md !text-lg !py-4 !px-16 !text-center !flex !w-fit'
                                        />
                                    )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
            {/* {!address && (
                <div className="text-center">
                    You need to collect wallet first.
                </div>
            )} */}
        </div>
        </>
    );
};

export default BookingCard;
