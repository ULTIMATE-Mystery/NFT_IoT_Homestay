import { useCallback, useEffect, useState } from 'react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import { DatePicker, Space, Select, Modal, Button } from 'antd';
import './Booking.scss';
import { ConnectWallet } from "@thirdweb-dev/react";
import Message from 'components/Message';
import { CONTRACT_ADDRESS } from 'utils/constant';
import WaterPlant from 'icons/WaterPlant';
import deviceService from 'apis/services/deviceService';
import Info from 'icons/Info';
import Home from 'icons/Home';
import Calendar3 from 'icons/Calendar3';
import Calendar2 from 'icons/Calendar2';
import homestay1 from 'assets/image/homestay/homestay1.jpg';

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingCard = () => {
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [roomData, setRoomData] = useState([]);

    const fetchRoomData = useCallback(async () => {
        try {
            const response = await deviceService.getRoom();
            if (response?.data) {
                setRoomData(response.data);
            } else {
                console.error('No data property in response:', response);
                setRoomData([]); // Setting to empty if no data found
            }
        } catch (error) {
            console.error('Failed to fetch room data:', error);
        }
    }, []);

    useEffect(() => {
        fetchRoomData();
    }, [fetchRoomData]);

    const handleRoomChange = (value) => {
        const room = roomData.find(r => r.RoomID.toString() === value);
        setSelectedRoom(room);
    };

    const showRoomDetails = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if a room is selected
        if (!selectedRoom) {
            Message.sendError('Please select a room first!');
            return;
        }
    
        // Check room availability
        if (selectedRoom.RoomStatus === 'UNAVAILABLE' || selectedRoom.RoomStatus === 'BOOKED') {
            Message.sendError(`Cannot book! Reason: Room is ${selectedRoom.RoomStatus.toLowerCase()}`);
            return;
        }
    
        // Proceed if the contract is loaded and the room is available
        if (contract) {
            try {
                await contract.call('safeMint', [selectedRoom.RoomID, 1, startTimestamp, endTimestamp]);
                Message.sendSuccess('Successfully booked!');
            } catch (error) {
                console.error('Error calling safeMint:', error);
                Message.sendError('Oops! Your booking was not successful! Maybe check your bookings parameters and try again.');
            }
        } else {
            console.error('Contract not loaded or not connected to Web3');
            Message.sendError('Contract not loaded or not connected to Web3.');
        }
    };

    const onChange = (value, dateString) => {
        const startDate = new Date(value[0]);
        const endDate = new Date(value[1]);
        setStartTime(value[0]);
        setEndTime(value[1]);

        setStartTimestamp(startDate.getTime());
        setEndTimestamp(endDate.getTime());
    };

    const onOk = (value) => {
        console.log('onOk: ', value);
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
                                <div className="flex min-[800px]:flex-row flex-col flex-basis items-center">
                                    <label className="my-auto text-2xl font-bold text-slate-500 basis-1/4">
                                        Select Room
                                    </label>
                                    <Select
                    placeholder="Select a room"
                    onChange={handleRoomChange}
                    value={selectedRoom ? selectedRoom.RoomID.toString() : undefined} // This ensures the selected room is correctly highlighted
                    className="rounded-lg w-[70%] mr-[4%]">
                    {roomData.map(room => (
                        <Option key={room.RoomID} value={room.RoomID.toString()}>
                            <div className="flex items-center">
                                <span className={`h-3 w-3 rounded-full ${
                                    room.RoomStatus === "AVAILABLE" ? "bg-green-500" :
                                    room.RoomStatus === "BOOKED" ? "bg-red-500" :
                                    "bg-gray-500"} mr-2`}></span>
                                {`${room.RoomName} - ${room.RoomStatus}`}
                            </div>
                        </Option>
                    ))}
                </Select>
                                <button type="button" disabled={!selectedRoom} class="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-[44px] w-64 my-auto  rounded-md bg-sky-600 p-2 flex justify-center items-center font-extrabold" onClick={showRoomDetails}>
                                        <div class="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                                        <div class="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                                        <div class="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                                        <div class="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                                        <p class="z-10">Room Details</p>
                                </button>
                                {/* Modal for room details */}
                                <Modal
  title={null}
  visible={isModalVisible}
  footer={null}
  onCancel={handleCancel}
  className="bg-white text-gray-800 rounded-lg overflow-hidden mx-auto max-w-6xl shadow-2xl"
  width={1150}
  centered
>
  {isLoading ? (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : selectedRoom && (
    <div className="flex rounded-lg overflow-hidden">
      <div className="w-1/2">
        <img
          src={homestay1}
          alt="Room image"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>
      <div className="w-1/2 p-8 bg-white rounded-r-lg">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">
          {selectedRoom.RoomName}
        </h3>
        <div className="grid grid-cols-1 gap-y-4 text-lg text-gray-700 mb-10 overflow-auto">
          <p className="text-justify">
            <WaterPlant className="inline-block w-6 h-6 mr-2 text-green-500" />
            <span className="font-bold text-gray-900">Room ID:</span> {selectedRoom.RoomID}
          </p>
          <p className="text-justify flex items-center">
            <Info className="inline-block w-6 h-6 mr-2 text-blue-500" />
            <span className="font-bold text-gray-900" style={{ marginRight: '8px' }}>Status:</span> 
            {selectedRoom.RoomStatus}
            <span className={`inline-block w-3 h-3 ml-2 rounded-full ${selectedRoom.RoomStatus === 'AVAILABLE' ? 'bg-green-500' : selectedRoom.RoomStatus === 'BOOKED' ? 'bg-red-500' : 'bg-gray-500'}`} />
          </p>
          <p className="text-justify overflow-visible">
            <Home className="inline-block w-6 h-6 mr-2 text-yellow-500" />
            <span className="font-bold text-gray-900">Description:</span> {selectedRoom.RoomDescription}
          </p>
          <p className="text-justify">
            <Calendar3 className="inline-block w-6 h-6 mr-2 text-pink-500" />
            <span className="font-bold text-gray-900">Created At:</span> {new Date(selectedRoom.createdAt).toLocaleString()}
          </p>
          <p className="text-justify">
            <Calendar2 className="inline-block w-6 h-6 mr-2 text-purple-500" />
            <span className="font-bold text-gray-900">Updated At:</span> {new Date(selectedRoom.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-5 px-[-16] py-[-8] flex justify-end">
          <Button
            onClick={handleCancel}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-1 px-4 rounded-full shadow-md transition-colors duration-300"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )}
</Modal>

                                </div>
                                <div className='flex min-[800px]:flex-row flex-col flex-basis'>
                                    <div className='my-auto text-2xl font-bold text-slate-500 basis-1/4'>
                                        Time
                                    </div>
                                    <Space className='flex w-full' direction="vertical" size={12}>
                                        <RangePicker
                                        className=' bg-slate-800 border border-slate-950 py-2.5 px-6 w-full'
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
                                        className="rounded-xl text-white bg-gradient-to-r 
                                        from-blue-700 via-pink-400 via-purple-600 to-blue-600 
                                        shadow-lg hover:scale-110 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer
                                        hover:bg-gradient-to-bl font-bold rounded-md 
                                        text-sm py-4 px-16 text-center flex w-fit "
                                    >
                                        <p className="text-xl">
                                            Book now
                                        </p>
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
