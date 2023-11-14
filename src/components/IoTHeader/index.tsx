import { memo, FC } from 'react';
import './index.scss';
import Menu from 'icons/Menu';
import UserIcon2 from 'icons/UserIcon2';
import IoTSidebar from './Sidebar';
import useToggle from 'hooks/useToggle';

const IoTHeader: FC = () => {
    const [sidebarState, toggleSidebar] = useToggle(false);
    return (
        <>
            <div className="iot-header-wrapper">
                <div className="iot-header-inner">
                    <div className="iot-header__group menu">
                        <div
                            className="menu-icon"
                            onClick={() => toggleSidebar()}
                        >
                            <Menu />
                        </div>
                        <div className="text-xl">SDSC Smart Homestay</div>
                    </div>
                    <div className="iot-header__group">
                        <UserIcon2 />
                        Minh Phuc Vien
                    </div>
                </div>
            </div>
            <IoTSidebar
                open={sidebarState}
                onMaskClick={() => toggleSidebar()}
            />
        </>
    );
};

IoTHeader.displayName = 'IoT Header';

export default memo(IoTHeader);
