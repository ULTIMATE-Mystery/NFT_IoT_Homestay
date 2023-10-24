import { memo } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstants';
const Inner = memo(() => {
    const navigate = useNavigate();
    return (
        <>
            <div className="text-6xl text-cyan-600">LOGIN PAGE</div>
        </>
    );
});

Inner.displayName = 'Login Inner';

export default Inner;
