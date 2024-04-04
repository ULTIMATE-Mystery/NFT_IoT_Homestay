import HomeLayout from 'layouts/Home';
import Inner from './Inner';
import { memo } from 'react';

const History = memo(() => {
    return (    
        <HomeLayout>
        <Inner/>
        </HomeLayout>
    );
});

History.displayName = 'History';

export default History;
