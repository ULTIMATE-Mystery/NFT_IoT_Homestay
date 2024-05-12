import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import DashboardCard from './components/DashboardCard';
import Thermometer from 'icons/Thermometer';
import Droplet from 'icons/Droplet';
import DashboardSwitch from './components/DashboardSwitch';
import RelaySwitch from './components/RelaySwitch';
import Bulb from 'icons/Bulb';
import DashboardChart from './components/DashboardChart';
//import Fingerprint from './components/Fingerprint';
import RFID from './components/RFID';
import Lightning from 'icons/Lightning';
import roomService from 'apis/services/roomService';
import { Modal } from 'antd';
import RegisterModal from './components/RegisterModal';

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
    const [roomData, setRoomData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);  
  
    const fetchRoomData = useCallback(async () => {
        const response = await roomService.getRoomData(roomId);
        setRoomData(response?.data);
        if (response?.data?.RoomStatus === 'BOOKED' && response?.data?.AccessKey === null) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [roomId]);

    useEffect(() => {
        fetchRoomData();
    }, [fetchRoomData]);
    return (
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
    );
});

Inner.displayName = 'Dashboard Inner';

export default Inner;
