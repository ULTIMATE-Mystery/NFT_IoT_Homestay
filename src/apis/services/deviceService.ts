import ApiBase from 'apis/config';
import { DEVICE_ID } from 'utils/constant';

class DeviceService extends ApiBase {
    getAllValues = (params: any) => {
        const url = `/plugins/telemetry/DEVICE/${DEVICE_ID.DHT22}/values/timeseries`;
        return this.get(url, { params });
    };

    getLatestValue = (keys: string, deviceId: string) => {
        const url = `/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`;
        return this.get(url, { params: { keys } });
    };
    getLightStatus = () => {
        const url = `/plugins/telemetry/DEVICE/${DEVICE_ID.LIGHT}/values/timeseries`;
        return this.get(url, {
            params: {
                keys: 'status',
            },
        });
    };

    controlLight = (requestBody: any) => {
        const url = `/plugins/telemetry/DEVICE/${DEVICE_ID.LIGHT}/timeseries/SERVER_SCOPE?scope=ANY`;
        return this.post(url, { body: requestBody });
    };
}

const deviceService = new DeviceService();

export default deviceService;
