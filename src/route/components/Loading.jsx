import { Spin } from 'antd';
import { memo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Loading = memo(() => {
    return (
        <div className="loading-container">
            <Spin size="large" tip="Loading..." />
        </div>
    );
});
Loading.displayName = 'Loading';

export default Loading;
