import { FC, PropsWithChildren, memo } from 'react';
import IoTHeader from 'components/IoTHeader';
// import './index.scss'; Import if needed

interface Props {
    title?: string;
    subTitle?: string;
}

const IoTLayout: FC<PropsWithChildren<Props>> = memo(
    ({ children, title, subTitle }) => {
        return (
            <div style={{ width: '100%' }}>
                <IoTHeader />
                {children}
            </div>
        );
    }
);
IoTLayout.displayName = 'IoT Layout';

export default IoTLayout;
