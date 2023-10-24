import { memo, FC } from 'react';
import { Switch } from 'antd';
interface DashboardSwitchProps {
    title: string;
    icon?: any;
    checked: boolean;
    defaultChecked?: boolean;
    onChange: (value: boolean) => void;
}

const DashboardSwitch: FC<DashboardSwitchProps> = ({
    title,
    icon = <></>,
    checked,
    defaultChecked = false,
    onChange,
}) => {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card__title">
                {title}
                <span className="dashboard-card__icon">{icon}</span>
            </div>

            <Switch checked={checked} onChange={onChange} />
        </div>
    );
};

export default memo(DashboardSwitch);
