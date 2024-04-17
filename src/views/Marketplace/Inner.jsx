import { memo } from 'react';
import Collections from './components/Collections';
const Inner = memo(() => {
    return (
        <>
            <Collections/>
        </>
    );
});

Inner.displayName = 'Marketplace Inner';

export default Inner;
