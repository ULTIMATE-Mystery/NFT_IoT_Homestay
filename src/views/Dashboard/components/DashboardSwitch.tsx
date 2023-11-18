import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import deviceService from 'apis/services/deviceService';
import Switch from 'components/Switch';
import { memo, FC, useCallback, useState } from 'react';
import { getTimestampAgo } from 'utils/function/format';

interface StatusProps {
    value: boolean;
    lastChanged: Date;
    connected: boolean;
}
interface DashboardSwitchProps {
    title: string;
    icon?: any;
    feed: string;
    status: StatusProps;
    checkedText?: string;
    uncheckedText?: string;
    checkedBg?: string;
    uncheckedBg?: string;
}

const DashboardSwitch: FC<DashboardSwitchProps> = ({
    title,
    icon = <></>,
    feed,
    status,
    checkedText = '',
    uncheckedText = '',
    checkedBg = '#0000ff',
    uncheckedBg = '#bbb',
}) => {
    const [switchStatus, setSwitchStatus] = useState(status.value);
    const [lastChangedTime, setLastChangedTime] = useState(status.lastChanged);

    const handleControlSwitch = useCallback(
        async (state: boolean) => {
            setSwitchStatus(state);
            await deviceService.controlSwitch(feed, state);
            setLastChangedTime(new Date()); //now
        },
        [feed]
    );
    return (
        <div className="dashboard-card">
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={!status.connected}
                tip="Connecting to server..."
            >
                <div className="dashboard-card__title">
                    {title}
                    <span className="dashboard-card__icon">{icon}</span>
                </div>

                <Switch
                    checked={switchStatus}
                    onChange={status => handleControlSwitch(status)}
                    checkedText={checkedText}
                    uncheckedText={uncheckedText}
                    checkedBg={checkedBg}
                    uncheckedBg={uncheckedBg}
                />
                <div className="dashboard-card__last-changed ">
                    <span className="text-[14px]">Last changed: </span>
                    <span className="text-[14px]">
                        {getTimestampAgo(lastChangedTime)}
                    </span>
                </div>
            </Spin>
        </div>
    );
};

export default memo(DashboardSwitch);
