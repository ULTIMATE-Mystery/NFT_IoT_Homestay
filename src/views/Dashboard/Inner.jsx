import { memo, useCallback, useEffect, useState } from 'react';
import DashboardCard from './component/DashboardCard';
import Thermometer from 'icons/Thermometer';
import Droplet from 'icons/Droplet';
import DashboardSwitch from 'views/Dashboard/component/DashboardSwitch';
import Lung from 'icons/Lung';

const Inner = memo(
    ({ temperature, humidity, oxygen, lightStatus, onToggle }) => {
        return (
            <>
                <DashboardCard
                    title="Nhiệt độ"
                    icon={<Thermometer size={24} />}
                    value={temperature.value}
                    ts={temperature.ts}
                    unit="°C"
                />

                <DashboardCard
                    title="Độ ẩm"
                    icon={<Droplet size={24} />}
                    value={humidity.value}
                    ts={humidity.ts}
                    unit="%"
                />
                <DashboardCard
                    title="Ô-xi"
                    icon={<Lung size={24} />}
                    value={oxygen.value}
                    ts={oxygen.ts}
                    unit="%"
                />
                <DashboardSwitch
                    title="Đèn"
                    onChange={status => onToggle(status)}
                    checked={lightStatus}
                />
            </>
        );
    }
);

Inner.displayName = 'Dashboard Inner';

export default Inner;
