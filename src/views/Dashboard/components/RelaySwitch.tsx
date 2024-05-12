import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import deviceService from 'apis/services/deviceService';
import Switch from 'components/Switch';
import Plug from 'icons/Plug';
import { memo, FC, useCallback, useState, useEffect } from 'react';
import { getTimestampAgo } from 'utils/function/format';

interface StatusProps {
    value: boolean;
    //lastChanged: Date;
    connected: boolean;
}
interface RelaySwitchProps {
    //feed: string;
    status: StatusProps;
    checkedText?: string;
    uncheckedText?: string;
    checkedBg?: string;
    uncheckedBg?: string;
}

const RelaySwitch: FC<RelaySwitchProps> = ({
    //feed,
    status = { value: false, connected: true },
    checkedText = 'ON',
    uncheckedText = 'OFF',
    checkedBg = '#0000ff',
    uncheckedBg = '#bbb',
}) => {
    //const [switchStatus, setSwitchStatus] = useState(status.value);
   // const [lastChangedTime, setLastChangedTime] = useState(status.lastChanged);

    // const handleControlSwitch = useCallback(
    //     async (state: boolean) => {
    //         setSwitchStatus(state);
    //         await deviceService.controlSwitch(feed, state);
    //         //setLastChangedTime(new Date()); //now
    //     },
    //     [feed]
    // );
    //const switchStatus = status.value;
    const [switchStatus, setSwitchStatus] = useState([false, false, false, false]);
    const [isFinishLoading, setIsFinishLoading] = useState(false);
    const getLatestSwitchStatus = useCallback(async () => {
        const switchStatus = await Promise.all([1, 2, 3, 4].map(async (index) => {
            const response = await deviceService.getLatestValue('socket-' + index);
            return response?.data?.value === '1';
        }));
        setIsFinishLoading(true);
        setSwitchStatus(switchStatus);
    }, []);
    useEffect(() => {
        getLatestSwitchStatus();
    }, [getLatestSwitchStatus]);

    const handleControlSwitch = useCallback( async (switchIndex: number, state: boolean) => {
        await deviceService.controlSwitch('socket-' + switchIndex , state);
    }
    , []);
    return (
        <div className='dashboard-card'>
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={!status.connected}
                tip="Connecting to server..."
            >
                <div className="dashboard-card__title">
                    Electric sockets
                     <span className="dashboard-card__icon"><Plug size={24} /></span>
                </div>
                {isFinishLoading && (
                <div className="relay-switch-wrapper">
                    <div>
                        <span>Socket #1</span>
                        <Switch
                            checked={switchStatus[0]}
                            onChange={status => handleControlSwitch(1, status)}
                            checkedText={checkedText}
                            uncheckedText={uncheckedText}
                            checkedBg={checkedBg}
                            uncheckedBg={uncheckedBg}
                        />
                    </div>
                    <div>
                        <span>Socket #2</span>
                        <Switch
                            checked={switchStatus[1] || false}
                            onChange={status => handleControlSwitch(2, status)}
                            checkedText={checkedText}
                            uncheckedText={uncheckedText}
                            checkedBg={checkedBg}
                            uncheckedBg={uncheckedBg}
                        />
                    </div>                   
                    <div>
                        <span>Socket #3</span>
                        <Switch
                            checked={switchStatus[2] || false}
                            onChange={status => handleControlSwitch(3, status)}
                            checkedText={checkedText}
                            uncheckedText={uncheckedText}
                            checkedBg={checkedBg}
                            uncheckedBg={uncheckedBg}
                        />
                    </div>                   
                    <div>
                        <span>Socket #4</span>
                        <Switch
                            checked={switchStatus[3] || false}
                            onChange={status => handleControlSwitch(4, status)}
                            checkedText={checkedText}
                            uncheckedText={uncheckedText}
                            checkedBg={checkedBg}
                            uncheckedBg={uncheckedBg}
                        />
                    </div>
                   
                </div>
                 )}
                {/* <div className="dashboard-card__last-changed ">
                    <span className="text-[14px]">Last changed: </span>
                    <span className="text-[14px]">
                        {getTimestampAgo(lastChangedTime)}
                    </span>
                </div> */}
            </Spin>
        </div>
    );
};

export default memo(RelaySwitch);
