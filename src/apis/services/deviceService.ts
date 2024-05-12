import ApiBase from 'apis/config';

class DeviceService extends ApiBase {
    getLatestValue = (feedName: string) => {
        const url = `/data/${feedName}/latest`;
        return this.get(url);
    };
    controlSwitch = (feedName: string, state: boolean) => {
        const url = `/data/${feedName}/create`;
        const body = {
            value: state ? '1' : '0',
        };
        return this.post(url, { body });
    };
    getChartData = (feedName: string, params: any) => {
        const url = `/data/${feedName}/chart`;
        return this.get(url, { params });
    };
    publishData = (feedName: string, payload: any) => {
        const url = `/data/${feedName}/create`;
        const body = {
            value: payload,
        };
        return this.post(url, { body });
    };
    scanRFID = () => {
        const url = '/room/scan-rfid';
        const body = {
            roomId: 1,
        };
        return this.post(url, { body });
    };
    getDeviceData = () => {
        const url = '/device';
        return this.get(url, {});
    };
    getRoomData = (roomId: number) => {
        const url = `/room/${roomId}`;
        return this.get(url, {});
    }
    // getAllValues = (params: any) => {
    //     const url = `/plugins/telemetry/DEVICE/${DEVICE_ID.DHT22}/values/timeseries`;
    //     return this.get(url, { params });
    // };

    // getLatestValue = (keys: string, deviceId: string) => {
    //     const url = `/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`;
    //     return this.get(url, { params: { keys } });
    // };
    // getLightStatus = () => {
    //     const url = `/plugins/telemetry/DEVICE/${DEVICE_ID.LIGHT}/values/timeseries`;
    //     return this.get(url, {
    //         params: {
    //             keys: 'status',
    //         },
    //     });
    // };

    // controlLight = (requestBody: any) => {
    //     const url = `/plugins/telemetry/DEVICE/${DEVICE_ID.LIGHT}/timeseries/SERVER_SCOPE?scope=ANY`;
    //     return this.post(url, { body: requestBody });
    // };
}

const deviceService = new DeviceService();

export default deviceService;
