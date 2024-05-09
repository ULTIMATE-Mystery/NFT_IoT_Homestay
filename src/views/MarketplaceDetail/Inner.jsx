import { memo } from 'react';

const Inner = memo(({id}) => {

    return (
        <div>ID of this page: {id}</div>
    );
});

Inner.displayName = 'MarketplaceDetail Inner';

export default Inner;