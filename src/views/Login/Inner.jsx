import { memo } from 'react';
// import { useNavigate } from 'react-router-dom';
const Inner = memo(() => {
    // const navigate = useNavigate();
    return (
        <>
            <div className="text-6xl text-cyan-600">LOGIN PAGE</div>
        </>
    );
});

Inner.displayName = 'Login Inner';

export default Inner;
