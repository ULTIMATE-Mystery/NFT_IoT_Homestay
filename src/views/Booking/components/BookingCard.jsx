import { memo, useCallback, useEffect, useState } from 'react';
import './Booking.scss';
import deviceService from 'apis/services/deviceService';
import homestay1 from 'assets/image/homestay/homestay1.jpg';
import { Modal, Space, DatePicker } from 'antd';
import { useContract } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from 'utils/constant';
import Message from 'components/Message';

const { RangePicker } = DatePicker;

const BookingCard = memo(() => {
    const { contract } = useContract(CONTRACT_ADDRESS);
    const [roomData, setRoomData] = useState([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [bookModalOpen, setBookModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(-1);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');
    const fetchRoomData = useCallback(async () => {
        const response = await deviceService.getRoom();
        if (response?.data) {
            setRoomData(response?.data);
        }
    }, []);

    useEffect(() => {
        fetchRoomData();
    }, [fetchRoomData]);
    const onDateChange = (value, dateString) => {
        const startDate = new Date(value[0]);
        const endDate = new Date(value[1]);
        setStartTime(value[0]);
        setEndTime(value[1]);

        setStartTimestamp(startDate.getTime());
        setEndTimestamp(endDate.getTime());

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contract) {
            try {
                await contract.call('safeMint', [roomData[selectedRoom]?.RoomID, 10000, startTimestamp, endTimestamp]);
                Message.sendSuccess('Successfully booked!');
                console.timeEnd('safeMint');
                
            } catch (error) {
                console.error('Error calling safeMint:', error);
                Message.sendError('Oops! Your booking was not successful! Maybe check your bookings parameters and try again.');
            }
        } else {
            console.error('Contract not loaded or not connected to Web3');
            Message.sendError('Contract not loaded or not connected to Web3.');
        }
    };
    return (
        <>
            <div className='booking-card-wrapper'>
                {roomData.map((room, index) => (
                    <div key={index} className='booking-card-item'>
                        <div className='booking-card-item-inner'>
                            <img src={homestay1} alt='room' className='booking-card__img'/>
                            <div className='booking-card__info'>
                                <div className='booking-card__info__name'>{room.RoomName}</div>
                                <div className='booking-card__info__desc'>{room.RoomDescription}</div>
                            </div>
                        </div>
                        {room?.RoomStatus === 'AVAILABLE' ? (
                        <button 
                            onClick={() => {
                                setDetailModalOpen(!detailModalOpen);
                                setSelectedRoom(index);
                            }}
                            className="booking-card__btn border duration-300 group cursor-pointer text-sky-50 overflow-hidden h-[36px] w-[80px] my-auto rounded-md bg-sky-600 p-2 flex justify-center items-center">
                            <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-950"></div>
                            <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-900"></div>
                            <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                            <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                            <p className="z-10">Detail</p>
                        </button>
                        ): (
                            <div className="booking-card__btn" style={{color: 'red'}}>Room was booked</div>
                        )}
                    </div>
                )
                )}
            </div>
            {detailModalOpen && (
                <Modal 
                    open={detailModalOpen}
                    centered
                    onCancel={() => setDetailModalOpen(!detailModalOpen)}
                    closable={false}
                    width={1000}
                    okText='Book now'
                    onOk={() => setBookModalOpen(!bookModalOpen)}
                >
                    <div className='booking-modal'>
                        <img src={homestay1} alt='room' className='booking-modal__img'/>
                        <div className='booking-modal__info'>
                            <div style={{ fontWeight: 600, fontSize: 24}}>{roomData[selectedRoom]?.RoomName}</div>
                            <div>{roomData[selectedRoom]?.RoomDescription}</div>
                            <div style={{fontWeight: 500, color: 'blue' }}>Price: 600$/night.</div>
                        </div>
                    </div>
                        <Modal 
                            open={bookModalOpen}
                            centered
                            onCancel={() => setBookModalOpen(!bookModalOpen)}
                            closable={false}
                            width={500}
                            okText='Confirm'
                            maskClosable={false}
                            onOk={handleSubmit}
                        >
                            <div style={{fontWeight: 600, fontSize: 24, marginBottom: 16 }}>Confirm your booking</div>
                            <div>Book room: <span style={{fontWeight: 600}}>{roomData[selectedRoom]?.RoomName}</span></div>
                            <div className="flex items-center gap-[6px] mt-2">
                                <div>Time:</div>
                                <Space className='flex' direction="vertical" size={12}>
                                    <RangePicker
                                    
                                        showTime={{
                                            format: 'HH:mm',
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        value={[startTime,endTime]}
                                        onChange={onDateChange}
                                        disabledDate={(current) => current < Date.now()}
                                        
                                    />
                                    {console.log(startTime,endTime)}
                                </Space> 
                            </div>
                        </Modal>
                </Modal>
            )}
        </>
    )
});

BookingCard.displayName = 'BookingCard';

export default BookingCard;