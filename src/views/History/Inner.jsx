import React, { memo } from 'react';
import History from './components/History'

const Inner = memo(() => {
    return (
        <>
            <div className="my-6 text-2xl font-semibold text-center dark:text-white">
                History
            </div>
            <div>
                <History />
            </div>
        </>
    );
});

Inner.displayName = 'History Inner';

export default Inner;
