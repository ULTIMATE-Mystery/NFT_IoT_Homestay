import { memo, FC, useState, useCallback, useEffect } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { DEFAULT_DATE_TIME_FORMAT } from 'utils/constant';
import deviceService from 'apis/services/deviceService';
import { dateFormat } from 'utils/function/format';
import socket from 'utils/socket';

interface DashboardCardProps {
    title: string;
    icon?: any;
    feed: string;
    unit?: string;
}

const DashboardCard: FC<DashboardCardProps> = ({ title, icon, feed, unit }) => {
    const [deviceData, setDeviceData] = useState({
        value: 'N/A',
        createdAt: Date.now(),
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchLatestData = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue(feed);

            const formatNumber = (value: string) =>
                parseFloat(value).toFixed(2);

            setDeviceData({
                value: response ? formatNumber(response?.data?.value) : 'N/A',
                createdAt: response?.data?.createdAt || Date.now(),
            });
        } catch (error) {
            setDeviceData({
                value: 'N/A',
                createdAt: Date.now(),
            });
        }
    }, [feed]);

    useEffect(() => {
        fetchLatestData();
        // const interval = setInterval(fetchLatestData, 1000 * DASHBOARD_UPDATE_PERIOD);
        // return () => clearInterval(interval);
    }, [fetchLatestData]);

    useEffect(() => {
        socket.on('receive_data', (receivedFeed, receivedValue, receivedTs) => {
            if (receivedFeed === feed) {
                setDeviceData({
                    value: receivedValue,
                    createdAt: receivedTs,
                });
                console.log(dateFormat(receivedTs, DEFAULT_DATE_TIME_FORMAT));
            }
        });
    }, [feed]);

    useEffect(() => {
        if (deviceData.value === 'N/A') {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [deviceData]);

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
                    {!isLoading ? deviceData?.value : 'N/A'}
                    <span className="dashboard-card__unit">{unit}</span>
                </div>
                <div className="dashboard-card__timestamp">
                    {deviceData?.createdAt !== Date.now()
                        ? dateFormat(
                              deviceData?.createdAt,
                              DEFAULT_DATE_TIME_FORMAT
                          )
                        : 'N/A'}
                </div>
            </Spin>
        </div>
    );
};

export default memo(DashboardCard);
