import { memo } from 'react';
import HeadBanner from './components/HeadBanner';
import Destinations from './components/Destinations';
const Inner = memo(() => {
    return (
        <div className="home">
            <HeadBanner></HeadBanner>
            <Destinations></Destinations>
        </div>
    );
});

Inner.displayName = 'Home Inner';

export default Inner;
