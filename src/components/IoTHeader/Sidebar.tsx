import { FC, memo } from 'react';
import './index.scss';
interface IoTSidebarProps {
    open: boolean;
}
const IoTSidebar: FC<IoTSidebarProps> = ({ open = false }) => {
    return (
        <>
            <div className={`iot-sidebar ${open ? 'open' : ''}`}>Sidebar</div>
            <div className={`iot-sidebar-mask ${open ? 'open' : ''}`}></div>
        </>
    );
};

IoTSidebar.displayName = 'Sidebar';

export default memo(IoTSidebar);
