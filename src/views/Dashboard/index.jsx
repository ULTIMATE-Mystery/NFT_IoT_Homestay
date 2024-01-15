import React, { memo, useState, useCallback, useEffect } from 'react';
import deviceService from 'apis/services/deviceService';
import IoTLayout from 'layouts/IoT';
import Inner from './Inner';
import { formatBoolean } from 'utils/function/format';

const Dashboard = memo(() => {
    const [lightStatus, setLightStatus] = useState({
        value: false,
        lastChanged: Date.now(),
        connected: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    const getLastSwitchStatus = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue('light');
            setLightStatus({
                value: formatBoolean(response.data.value),
                lastChanged: new Date(response.data.updatedAt),
                connected: true,
            });
        } catch (error) {
            setLightStatus(prev => ({
                ...prev,
                connected: false,
            }));
        } finally {
            setIsLoading(false);
        }
    }, []);

    //update on first render and every 1 minute (if connected) or 5 seconds (if disconnected)
    useEffect(() => {
        getLastSwitchStatus();
        const intervalPeriod = lightStatus.connected ? 60000 : 5000;
        const interval = setInterval(() => {
            getLastSwitchStatus();
        }, intervalPeriod);
        return () => clearInterval(interval);
    }, [getLastSwitchStatus, lightStatus.connected]);

    return (
        <IoTLayout title="Dashboard">
            {!isLoading && <Inner lightStatus={lightStatus} />}
        </IoTLayout>
    );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
