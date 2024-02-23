import { memo } from 'react';
const Inner = memo(() => {
    return (
        <>
            <div className="text-6xl text-cyan-600">ABOUT US PAGE</div>
        </>
    );
});

Inner.displayName = 'AboutUs Inner';

export default Inner;
