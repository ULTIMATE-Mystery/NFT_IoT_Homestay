import { memo } from 'react';
const Inner = memo(() => {
    return (
        <>
            <div className="text-6xl text-cyan-600">MARKETPLACE PAGE</div>
        </>
    );
});

Inner.displayName = 'Marketplace Inner';

export default Inner;
