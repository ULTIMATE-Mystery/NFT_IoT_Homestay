import { memo } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstants';
const Inner = memo(() => {
    const navigate = useNavigate();
    return (
        <>
            <div>404 Not Found</div>
            <Button
                type="primary"
                onClick={() => navigate(routeConstants.HELLO)}
            >
                Back to Home
            </Button>
        </>
    );
});

Inner.displayName = '404 Inner';

export default Inner;
