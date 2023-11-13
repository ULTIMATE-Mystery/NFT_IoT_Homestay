import { memo } from 'react';
import DashboardCard from './component/DashboardCard';
import Thermometer from 'icons/Thermometer';
import Droplet from 'icons/Droplet';
import DashboardSwitch from 'views/Dashboard/component/DashboardSwitch';
import Bulb from 'icons/Bulb';

const Inner = memo(({ lightStatus }) => {
    return (
        <div className="flex">
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
                defaultChecked={lightStatus.value}
                lastChanged={lightStatus.lastChanged}
                checkedText="ON"
                uncheckedText="OFF"
            />
        </div>
    );
});

Inner.displayName = 'Dashboard Inner';

export default Inner;
