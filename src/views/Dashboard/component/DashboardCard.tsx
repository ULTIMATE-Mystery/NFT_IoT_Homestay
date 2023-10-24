import { memo, FC } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface DashboardCardProps {
    title: string;
    icon?: any;
    value?: number | string;
    unit?: string;
    ts: number;
}

const DashboardCard: FC<DashboardCardProps> = ({
    title,
    icon,
    value,
    unit,
    ts,
}) => {
    const isLoading = value === -1 || Date.now() - ts > 10 * 1000;
    return (
        <div className="dashboard-card">
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={isLoading}
                tip="Đang kết nối..."
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
                <div className="dashboard-card__ts">
                    {ts !== -1 ? new Date(ts).toLocaleString('vi-VN') : 'N/A'}
                </div>
            </Spin>
        </div>
    );
};

export default memo(DashboardCard);
