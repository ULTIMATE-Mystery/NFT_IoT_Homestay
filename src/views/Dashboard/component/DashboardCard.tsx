import { memo, FC } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface DashboardCardProps {
    title: string;
    icon?: any;
    value?: number | string;
    unit?: string;
    timestamp: number;
}

const DashboardCard: FC<DashboardCardProps> = ({
    title,
    icon,
    value,
    unit,
    timestamp,
}) => {
    const isLoading = value === -1 || Date.now() - timestamp > 10 * 1000;
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
                    {!isLoading ? value : 'N/A'}
                    <span className="dashboard-card__unit">{unit}</span>
                </div>
                {/* Convert unix to HH:MM:SS - DD/MM/YY */}
                <div className="dashboard-card__timestamp">
                    {timestamp !== -1
                        ? new Date(timestamp).toLocaleString('vi-VN')
                        : 'N/A'}
                </div>
            </Spin>
        </div>
    );
};

export default memo(DashboardCard);
