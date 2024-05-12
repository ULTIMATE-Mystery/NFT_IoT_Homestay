import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import DashboardCard from './components/DashboardCard';
import Thermometer from 'icons/Thermometer';
import Droplet from 'icons/Droplet';
// import DashboardSwitch from './components/DashboardSwitch';
import RelaySwitch from './components/RelaySwitch';
// import Bulb from 'icons/Bulb';
import DashboardChart from './components/DashboardChart';
//import Fingerprint from './components/Fingerprint';
import RFID from './components/RFID';
import Lightning from 'icons/Lightning';
import roomService from 'apis/services/roomService';
import RegisterModal from './components/RegisterModal';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
import Message from 'components/Message';
import Loading from 'components/Loading';

const Inner = memo(({ roomId }) => {
    const chartOptions = useMemo(() => {
        return [
            {
                feed: 'temperature',
                title: 'Temperature chart',
                label: 'Temperature',
                unit: '°C',
            },
            {
                feed: 'humidity',
                title: 'Humidity chart',
                label: 'Humidity',
                unit: '%',
            },
        ];
    }, []);
    const address = useAddress();
    const [roomData, setRoomData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const navigate = useNavigate();
    const fetchRoomData = useCallback(async () => {
        console.log('useAddress', address);
        const response = await roomService.getRoomData(roomId);
        setRoomData(response?.data);
        if (response?.data?.RoomStatus !== 'BOOKED') {
            navigate('/');
            Message.sendError('You do not have permission to access this room!');
        }
        // if (!address) {
        //     navigate('/');
        //     Message.sendError('You need to connect wallet first!');
        // }
        if (response?.data?.RoomStatus === 'BOOKED' && response?.data?.AccessKey === null) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [roomId, navigate, address]);
    
    // useEffect(() => {
    //     fetchRoomData();
    // }, [fetchRoomData]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Define a timeout id
        let timeoutId;
        let loadingTimeoutId;
        const fetchData = async () => {
          // Check if address is available
            if (address) {
            // If address is available, wait for 5 seconds before fetching room data
                setIsLoading(true);
                timeoutId = setTimeout(() => {
                    fetchRoomData();
                    setIsLoading(false);
                }, 5000); // 5000 milliseconds = 5 seconds
            }
            loadingTimeoutId = setTimeout(() => {
                setIsLoading(false);
                if (!address) {
                    navigate('/');
                    Message.sendError('You need to connect wallet first!');
                }
            }, 5000);

        };
      
        fetchData();
      
        // Clear the timeout when the component unmounts
        return () => {
          clearTimeout(timeoutId);
          clearTimeout(loadingTimeoutId);
        };
    }, [fetchRoomData, address, navigate]);
      
    return (
        !isLoading ? (
        !isModalOpen ? (
        <div className="flex flex-wrap gap-[16px] ml-[32px] mt-[32px] mr-[32px] ">
            <DashboardCard
                title="Temperature"
                feed="temperature"
                icon={<Thermometer size={24} />}
                unit="°C"
            />
            <DashboardCard
                title="Humidity"
                feed="humidity"
                icon={<Droplet size={24} />}
                unit="%"
            />
            <DashboardCard
                title="Power usage"
                feed="power-usage"
                icon={<Lightning size={24} />}
                unit="W"
            />
            {/* <DashboardSwitch
                title="Electric socket #1"
                icon={<Bulb size={24} />}
                feed="socket-1"
                status={lightStatus}
                defaultChecked={lightStatus.value}
                lastChanged={lightStatus.lastChanged}
                checkedText="ON"
                uncheckedText="OFF"
            /> */}
            <RelaySwitch />
            <RFID title="Door access" />
            <DashboardChart
                defaultOption={chartOptions[0]}
                options={chartOptions}
            />
            {/* <Fingerprint title="Fingerprint" /> */}
        </div>
        ) : (
            <RegisterModal open={isModalOpen} roomData={roomData} />
        )
    ) : (
        <div className="flex items-center justify-center h-screen">
            <Loading />
        </div>
    ));
});

Inner.displayName = 'Dashboard Inner';

export default Inner;
