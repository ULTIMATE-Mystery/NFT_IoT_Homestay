import HomeLayout from 'layouts/Home';
import { memo } from 'react';
import Inner from 'views/Marketplace/Inner';

const Wrapper = memo(() => {
    return (
        <HomeLayout title="Marketplace">
            <Inner />
        </HomeLayout>
    );
});
Wrapper.displayName = 'Marketplace';

const Marketplace = Wrapper;

export default Marketplace;
