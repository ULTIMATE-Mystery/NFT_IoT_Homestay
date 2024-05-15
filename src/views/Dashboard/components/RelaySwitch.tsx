import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Switch } from 'antd';
import deviceService from 'apis/services/deviceService';
import Plug from 'icons/Plug';
import { memo, FC, useCallback, useState, useEffect } from 'react';

interface RelaySwitchProps {
    //feed: string;
    switchStatus?: boolean[];
    isFinishLoading: boolean;
}

const RelaySwitch: FC<RelaySwitchProps> = ({
    //feed,
    switchStatus = [false, false, false, false],
    isFinishLoading,
}) => {

    const handleControlSwitch = useCallback( async (switchIndex: number, state: boolean) => {
        await deviceService.controlSwitch('socket-' + switchIndex , state);
    }, []);

    return (
        <div className='dashboard-card'>
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={!isFinishLoading}
                tip="Connecting to server..."
            >
                <div className="dashboard-card__title">
                    Electric sockets
                     <span className="dashboard-card__icon"><Plug size={24} /></span>
                </div>
                {isFinishLoading && (
                <div className="relay-switch-wrapper">
                    <div>
                        <span style={{fontSize: 14}}>Socket #1</span>
                        <Switch
                            value={switchStatus[0]}
                            onChange={status => handleControlSwitch(1, status)}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                        />
                    </div>
                    <div>
                        <span style={{fontSize: 14}}>Socket #2</span>
                        <Switch
                            value={switchStatus[1]}
                            onChange={status => handleControlSwitch(2, status)}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                        />
                    </div>
                    <div>
                        <span style={{fontSize: 14}}>Socket #3</span>
                        <Switch
                            value={switchStatus[2]}
                            onChange={status => handleControlSwitch(3, status)}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                        />
                    </div>
                    <div>
                        <span style={{fontSize: 14}}>Socket #4</span>
                        <Switch
                            value={switchStatus[3]}
                            onChange={status => handleControlSwitch(4, status)}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                        />
                    </div>
                </div>
                 )}
            </Spin>
        </div>
    );
};

export default memo(RelaySwitch);
