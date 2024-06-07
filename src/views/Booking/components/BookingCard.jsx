import { useEffect, useState } from 'react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import Message from 'components/Message';
import { CONTRACT_ADDRESS } from 'utils/constant';
import {  DatePicker, Modal, Space, Radio  } from 'antd';
import './Booking.scss';
import { ConnectWallet } from "@thirdweb-dev/react";
import { parseBigNumber } from 'utils/function/parseBigNumber';
import ButtonNFT from 'components/ButtonNFT';
import Loader from 'components/Loader';
import Policy from './Policy';
const { RangePicker } = DatePicker;


const BookingCard = () => {
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isBookingLoading,setBookingLoading] = useState(-1);
    const [isPolicyModalOpen,setPolicyModalOpen] = useState(false);
    const [isPrepaid, setIsPrepaid] = useState(true);
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
                let amountBnb;
                //amount bnb by wei
                if( isPrepaid) 
                    amountBnb = await contract.call('usdToBnb', [
                        amountUsd,
                    ]);
                else {
                    const percentDeposit = await contract.call('getLatestPolicy');
                    amountBnb = await contract.call('usdToBnb', [
                        amountUsd,
                    ]);
                    amountBnb = amountBnb*parseBigNumber(percentDeposit[2])/100
                };

                console.log('amountBnb',parseBigNumber(amountBnb));
                setBookingLoading(true);
                // Call the safeMint function
                console.time('Booking')
                const {data:isDataBooking, loading: isBookingLoading} = await contract.call('safeMint', [
                    roomId,
                    0,
                    Math.floor(startTimestamp/1000),
                    Math.ceil(endTimestamp/1000),
                    isPrepaid,
                ],{
                    value: amountBnb,
                });
                console.timeEnd('Booking')
                setBookingLoading(isBookingLoading)
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

    const handleContractTypeClick = (isPrepaidValue) => {
        setIsPrepaid(isPrepaidValue);
    };

    useEffect(()=>{
        if (isBookingLoading===undefined) 
          setTimeout(()=>{
            window.location.reload();
          },3000)
      },[isBookingLoading]);
    const onIsPrepaidChange = (e) => {
        setIsPrepaid(e.target.value);
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
                            className="relative min-[800px]:p-20 min-[750px]:p-10 min-[400px]:p-6 p-4 mr-0 w-full flex flex-col"
                        >
                            <div className="min-[1000px]:w-full flex justify-end min-[1000px]:space-x-4 max-[1000px]:space-y-3 mb-4 min-[1000px]:flex-row flex-col">
                                <button className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-40 my-auto  rounded-md bg-sky-600 p-2 flex justify-center items-center font-extrabold">
                                        <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                        <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                        <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                        <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                        <p className="z-10">See room validity</p>
                                </button>
                                <button className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-48 my-auto  rounded-md bg-sky-600 p-2 flex justify-center items-center font-extrabold"
                                        onClick={()=>setPolicyModalOpen(true)}
                                >
                                        <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                        <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                        <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                        <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                        <p className="z-10">Booking Policy</p>
                                </button>
                            </div>
                             {
                                    isPolicyModalOpen && 
                                    <Modal 
                                    open={isPolicyModalOpen} 
                                    onCancel={()=>setPolicyModalOpen(false)}
                                    onOk={()=>setPolicyModalOpen(false)}
                                    className='z-50'
                                    footer={null}>
                                        <Policy/>
                                    </Modal>
                                }
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
                                        className=' bg-slate-800 border border-slate-950 py-3 px-6 w-full focus:bg-slate-800'
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
                                <div className='flex items-center min-[800px]:flex-row flex-col flex-basis'>
                                    <div className='my-auto text-2xl font-bold text-slate-500 basis-1/5 '>Contract type</div>
                                    <div className="flex space-x-4">
                                        <div 
                                            className={`cursor-pointer text-lg font-bold border rounded-lg px-6 py-2 hover:scale-105 ${isPrepaid ? 'text-blue-300 border-blue-400' : 'text-slate-600 border-slate-600 hover:text-slate-500 hover:border-slate-400'}`}
                                            onClick={() => handleContractTypeClick(true)}
                                        >
                                            Prepaid
                                        </div>
                                        <div 
                                            className={`cursor-pointer text-lg font-bold border rounded-lg px-6 py-2 hover:scale-105 ${!isPrepaid ? 'text-blue-300 border-blue-400' : 'text-slate-600 border-slate-600 hover:text-slate-500 hover:border-slate-400'}`}
                                            onClick={() => handleContractTypeClick(false)}
                                        >
                                            Deposit
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center pt-8">
                                    {address && !(isBookingLoading === true) &&
                                    <button
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
                            {(isBookingLoading === true)
                            && <div className="justify-center flex absolute self-center text-center top-72 scale-150">
                                <Loader/>
                            </div>}
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
