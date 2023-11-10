import { memo, FC, useState } from 'react';
import './index.scss';
import Menu from 'icons/Menu';
import UserIcon2 from 'icons/UserIcon2';
import IoTSidebar from './Sidebar';

const IoTHeader: FC = () => {
    const [sidebarState, setSidebarState] = useState(false);
    return (
        <>
            <div className="iot-header-wrapper">
                <div className="iot-header-inner">
                    <div className="iot-header__group menu">
                        <div onClick={() => setSidebarState(!sidebarState)}>
                            <Menu />
                        </div>
                        <div className="text-xl">SDSC IoT</div>
                    </div>
                    <div className="iot-header__group">
                        <UserIcon2 />
                        Minh Phuc Vien
                    </div>
                </div>
            </div>
            <IoTSidebar open={sidebarState} />
        </>
    );
};

IoTHeader.displayName = 'IoT Header';

export default memo(IoTHeader);
