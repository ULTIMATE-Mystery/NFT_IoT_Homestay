import { memo } from 'react';
import Inner from 'views/Marketplace/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});
Wrapper.displayName = 'Marketplace';

const Marketplace = Wrapper;

export default Marketplace;
