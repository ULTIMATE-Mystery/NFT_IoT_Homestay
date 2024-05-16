import { FC, memo } from 'react';
import './index.scss';
import routeConstants from 'route/routeConstants';
import { Navigate, useNavigate } from 'react-router-dom';
interface IoTSidebarProps {
    open: boolean;
    onMaskClick: () => void;
}
const IoTSidebar: FC<IoTSidebarProps> = ({ open = false, onMaskClick }) => {
    const thisPathname = window.location.pathname;
    const navigate = useNavigate();
    return (
        <>
            <div className={`iot-sidebar ${open ? 'open' : ''}`}>
                <div className="iot-sidebar-options">
                    <div className={`iot-sidebar-options__item ${thisPathname === routeConstants.DASHBOARD ? 'active' : ''}`}>Dashboard</div>
                    <div className="iot-sidebar-options__item" onClick={() => navigate('/management')}>Back to management page</div>
                </div>
            </div>
            <div
                className={`iot-sidebar-mask ${open ? 'open' : ''}`}
                onClick={onMaskClick}
            ></div>
        </>
    );
};

IoTSidebar.displayName = 'IoT Sidebar';

export default memo(IoTSidebar);
