import { memo } from 'react';
import HeadBanner from './components/HeadBanner';
import Destinations from './components/Destinations';
const Inner = memo(() => {
    return (
        <div className="home mb-10 mt-10 flex flex-col space-y-10 min-[1200px]:mx-40 min-[800px]:mx-20 min-[600px]:mx-10 min-[500px]:mx-4 mx-2">
            <HeadBanner></HeadBanner>
            <Destinations></Destinations>
        </div>
    );
});

Inner.displayName = 'Home Inner';

export default Inner;
