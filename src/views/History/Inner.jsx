import React, { memo } from 'react';
import Transactions from './components/Transactions';
import { useAddress } from '@thirdweb-dev/react';

const Inner = memo(() => {
    const address = useAddress();
    return (
        <>  {address === undefined ? (
            <div className='justify-center flex'>
                <div className="text-4xl mt-60 mx-20 bg-gradient-to-r from-blue-700 via-sky-400 to-purple-600 bg-clip-text text-transparent w-fit mx-auto">
                You need to connect wallet first
                </div>  
            </div>
            
        ):(<div>
                <div className="my-6 text-3xl font-semibold text-center text-white">
                    Transaction History
                </div>
                <div className=" bg-slate-900 xl:mx-40 mx-10 p-6 rounded-xl space-y-10 shadow-lg">
                    <Transactions />
                </div>
            </div>
        )}
        </>
    );
});

Inner.displayName = 'History Inner';

export default Inner;