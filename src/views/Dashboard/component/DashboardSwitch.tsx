import deviceService from 'apis/services/deviceService';
import Switch from 'components/Switch';
import { memo, FC, useCallback, useState } from 'react';
import { getMinutesAgo } from 'utils/function/format';
interface DashboardSwitchProps {
    title: string;
    icon?: any;
    feed: string;
    defaultChecked?: boolean;
    lastChanged: Date;
    checkedText?: string;
    uncheckedText?: string;
    checkedBg?: string;
    uncheckedBg?: string;
}

const DashboardSwitch: FC<DashboardSwitchProps> = ({
    title,
    icon = <></>,
    feed,
    defaultChecked = false,
    lastChanged,
    checkedText = '',
    uncheckedText = '',
    checkedBg = '#0000ff',
    uncheckedBg = '#bbb',
}) => {
    const [switchStatus, setSwitchStatus] = useState(defaultChecked);
    const [lastChangedTime, setLastChangedTime] = useState(lastChanged);

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
                <div className="text-[14px]">Last changed:</div>
                <div className="text-[14px]">
                    {/* if 0, convert to <1 */}
                    {getMinutesAgo(lastChangedTime)} minute(s) ago
                </div>
            </div>
        </div>
    );
};

export default memo(DashboardSwitch);
