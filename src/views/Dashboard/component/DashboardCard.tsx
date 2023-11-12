import { memo, FC, useState, useCallback, useEffect } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import moment from 'moment';
import { DEFAULT_DATE_TIME_FORMAT } from 'utils/constant';
import deviceService from 'apis/services/deviceService';

interface DashboardCardProps {
    title: string;
    icon?: any;
    feed: string;
    unit?: string;
}

const DashboardCard: FC<DashboardCardProps> = ({ title, icon, feed, unit }) => {
    const [deviceData, setDeviceData] = useState({
        value: '-1',
        createdAt: Date.now(),
    });

    // const [lightStatus, setLightStatus] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue(feed);

            //only temperature
            const formatNumber = (value: string) =>
                parseFloat(value).toFixed(2);

            setDeviceData({
                value: formatNumber(response?.value || -1),
                createdAt: response?.created_at || Date.now(),
            });
        } catch (error) {
            setDeviceData({
                value: '-1',
                createdAt: Date.now(),
            });
        }
    }, [feed]);
    // // Get data every 10s
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [fetchData]);
    const isLoading =
        deviceData.value === '-1' ||
        Date.now() - deviceData.createdAt > 10 * 1000;
    return (
        <div className="dashboard-card">
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={isLoading}
                tip="Connecting to server..."
            >
                <div className="dashboard-card__title">
                    {title}
                    <span className="dashboard-card__icon">{icon}</span>
                </div>
                <div className="dashboard-card__value">
                    {!isLoading ? deviceData.value : 'N/A'}
                    <span className="dashboard-card__unit">{unit}</span>
                </div>
                {/* Convert unix to HH:MM:SS - DD/MM/YY */}
                <div className="dashboard-card__timestamp">
                    {deviceData.createdAt !== Date.now()
                        ? moment(deviceData.createdAt).format(
                              DEFAULT_DATE_TIME_FORMAT
                          )
                        : 'N/A'}
                </div>
            </Spin>
        </div>
    );
};

export default memo(DashboardCard);
