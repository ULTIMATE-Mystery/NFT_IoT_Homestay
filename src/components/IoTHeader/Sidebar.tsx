import { FC, memo } from 'react';
import './index.scss';
interface IoTSidebarProps {
    open: boolean;
    onMaskClick: (arg: boolean) => void;
}
const IoTSidebar: FC<IoTSidebarProps> = ({ open = false, onMaskClick }) => {
    return (
        <>
            <div className={`iot-sidebar ${open ? 'open' : ''}`}>Sidebar</div>
            <div
                className={`iot-sidebar-mask ${open ? 'open' : ''}`}
                onClick={() => onMaskClick(false)}
            ></div>
        </>
    );
};

IoTSidebar.displayName = 'IoT Sidebar';

export default memo(IoTSidebar);
