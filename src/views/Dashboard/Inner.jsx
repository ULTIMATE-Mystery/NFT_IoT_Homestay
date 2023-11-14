import { memo, useMemo } from 'react';
import DashboardCard from './components/DashboardCard';
import Thermometer from 'icons/Thermometer';
import Droplet from 'icons/Droplet';
import DashboardSwitch from './components/DashboardSwitch';
import Bulb from 'icons/Bulb';
import DashboardChart from './components/DashboardChart';

const Inner = memo(({ lightStatus }) => {
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

    return (
        <div className="flex flex-wrap gap-[24px] ml-[32px] mt-[32px] mr-[32px]">
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
            <DashboardSwitch
                title="Room light"
                icon={<Bulb size={24} />}
                feed="light"
                status={lightStatus}
                defaultChecked={lightStatus.value}
                lastChanged={lightStatus.lastChanged}
                checkedText="ON"
                uncheckedText="OFF"
            />
            <DashboardChart
                // feed="temperature"
                // title="Temperature chart"
                // label="Temperature"
                // unit="°C"
                defaultOption={chartOptions[0]}
                options={chartOptions}
            />
        </div>
    );
});

Inner.displayName = 'Dashboard Inner';

export default Inner;
