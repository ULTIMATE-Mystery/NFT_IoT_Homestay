import React, { memo } from 'react';
import TransactionHistory from './components/TransactionHistory'

const Inner = memo(() => {
    return (
        <>
            <div className="my-6 text-2xl font-semibold text-center dark:text-black">
                Transaction History
            </div>
            <div className="mx-auto max-w-7xl dark:bg-gray-900 p-6 rounded-xl space-y-10 shadow-lg">
                <TransactionHistory />
            </div>
        </>
    );
});

Inner.displayName = 'History Inner';

export default Inner;
