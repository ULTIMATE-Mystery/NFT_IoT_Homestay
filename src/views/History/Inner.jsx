import React, { memo } from 'react';
import TransactionHistory from './components/TransactionHistory'
import Transactions from './components/Transactions';

const Inner = memo(() => {
    return (
        <>
            <div className="my-6 text-3xl font-semibold text-center dark:text-black">
                Transaction History
            </div>
            <div className=" bg-slate-900 xl:mx-40 mx-10 p-6 rounded-xl space-y-10 shadow-lg">
                <Transactions />
            </div>
        </>
    );
});

Inner.displayName = 'History Inner';

export default Inner;
