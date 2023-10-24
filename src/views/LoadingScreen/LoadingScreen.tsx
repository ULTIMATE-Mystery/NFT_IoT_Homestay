import { FC, memo } from 'react';
import { Spin } from 'antd';
interface ILoadingScreenProps {}

const LoadingScreen: FC<ILoadingScreenProps> = memo(() => {
    return (
        <div className="loading-container">
            <Spin size="large" tip="Loading..." />
        </div>
    );
});
LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
