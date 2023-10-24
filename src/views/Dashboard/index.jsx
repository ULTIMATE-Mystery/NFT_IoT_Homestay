import HomeLayout from 'layouts/Home';
import Inner from './Inner';
import { memo, useCallback, useEffect, useState } from 'react';
import deviceService from 'apis/services/deviceService';
import { DEVICE_ID } from 'utils/constant';
import { formatBoolean } from 'utils/function/format';

const Dashboard = memo(() => {
    const [deviceData, setDeviceData] = useState({
        temperature: { value: -1, ts: Date.now() },
        humidity: { value: -1, ts: Date.now() },
        oxygen: { value: -1, ts: Date.now() },
    });

    const [lightStatus, setLightStatus] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const temperatureResponse = await deviceService.getLatestValue('temperature,humidity', DEVICE_ID.DHT22);
            const oxygenResponse = await deviceService.getLatestValue('oxygen', DEVICE_ID.OXYGEN);
            const lightStatusResponse = await deviceService.getLightStatus();

            const formatNumber = (value) => parseFloat(value).toFixed(2);

            setDeviceData({
                temperature: {
                    value: formatNumber(temperatureResponse?.temperature?.[0]?.value || deviceData.temperature.value),
                    ts: temperatureResponse?.temperature?.[0]?.ts || deviceData.temperature.ts,
                },
                humidity: {
                    value: formatNumber(temperatureResponse?.humidity?.[0]?.value || deviceData.humidity.value),
                    ts: temperatureResponse?.humidity?.[0]?.ts || deviceData.humidity.ts,
                },
                oxygen: {
                    value: formatNumber(oxygenResponse?.oxygen?.[0]?.value || deviceData.oxygen.value),
                    ts: oxygenResponse?.oxygen?.[0]?.ts || deviceData.oxygen.ts,
                },
            });

            setLightStatus(formatBoolean(lightStatusResponse?.status?.[0]?.value));
        } catch (error) {
            setDeviceData({
                temperature: { value: -1, ts: Date.now() },
                humidity: { value: -1, ts: Date.now() },
                oxygen: { value: -1, ts: Date.now() },
            });

            setLightStatus(false);
        }
    }, [deviceData.temperature, deviceData.humidity, deviceData.oxygen]);

    const handleToggleLight = useCallback(async (status) => {
        setLightStatus(status);
        await deviceService.controlLight({ status });
    }, []);

    // Get data every 10s
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [fetchData]);

    useEffect(() => {
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]);

    return (
        <HomeLayout title="Dashboard">
            <Inner
                temperature={deviceData.temperature}
                humidity={deviceData.humidity}
                oxygen={deviceData.oxygen}
                lightStatus={lightStatus}
                onToggle={handleToggleLight}
            />
        </HomeLayout>
    );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
