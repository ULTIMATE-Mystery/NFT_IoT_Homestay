import ApiBase from 'apis/config';

class DeviceService extends ApiBase {
    getLatestValue = (feedName: string) => {
        const url = `/${process.env.REACT_APP_AIO_USERNAME}/feeds/${feedName}/data/last`;
        return this.get(url);
    };
    controlSwitch = (feedName: string, state: boolean) => {
        const url = `/${process.env.REACT_APP_AIO_USERNAME}/feeds/${feedName}/data`;
        const body = {
            value: state ? 1 : 0,
        };
        return this.post(url, { body });
    };
    getChartData = (feedName: string, params: any) => {
        const url = `/${process.env.REACT_APP_AIO_USERNAME}/feeds/${feedName}/data/chart`;
        return this.get(url, { params });
    };
    publishData = (feedName: string, payload: any) => {
        const url = `/${process.env.REACT_APP_AIO_USERNAME}/feeds/${feedName}/data`;
        const body = {
            value: payload,
        };
        return this.post(url, { body });
    };
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
