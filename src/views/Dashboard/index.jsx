import React, { memo, useState, useCallback, useEffect } from 'react';
import deviceService from 'apis/services/deviceService';
import IoTLayout from 'layouts/IoT';
import Inner from './Inner';

const Dashboard = memo(() => {
    const [lightStatus, setLightStatus] = useState({
        value: false,
        lastChanged: Date.now(),
    });
    const [isLoading, setIsLoading] = useState(true);

    const getLastSwitchStatus = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue('light');
            setLightStatus({
                value: response.value === '1',
                lastChanged: new Date(response.created_at),
            });
        } catch (error) {
            console.error('Error occurred: ', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    //update on first render and every 1 minute
    useEffect(() => {
        getLastSwitchStatus();
        const interval = setInterval(() => {
            getLastSwitchStatus();
        }, 60000);
        return () => clearInterval(interval);
    }, [getLastSwitchStatus]);

    return (
        <IoTLayout title="Dashboard">
            {!isLoading && <Inner lightStatus={lightStatus} />}
        </IoTLayout>
    );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
