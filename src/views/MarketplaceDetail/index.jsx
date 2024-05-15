import HomeLayout from 'layouts/Home';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Inner from './Inner';

const Wrapper = memo(() => {
    const { id } = useParams();
    return (
        <HomeLayout title="MarketplaceDetail">
            <Inner id={id} />
        </HomeLayout>
    );
});
Wrapper.displayName = 'MarketplaceDetail';

const MarketplaceDetail = Wrapper;

export default MarketplaceDetail;