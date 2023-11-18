import { FC, memo } from 'react';
import './index.scss';
interface IoTSidebarProps {
    open: boolean;
    onMaskClick: () => void;
}
const IoTSidebar: FC<IoTSidebarProps> = ({ open = false, onMaskClick }) => {
    return (
        <>
            <div className={`iot-sidebar ${open ? 'open' : ''}`}>Sidebar</div>
            <div
                className={`iot-sidebar-mask ${open ? 'open' : ''}`}
                onClick={onMaskClick}
            ></div>
        </>
    );
};

IoTSidebar.displayName = 'IoT Sidebar';

export default memo(IoTSidebar);
