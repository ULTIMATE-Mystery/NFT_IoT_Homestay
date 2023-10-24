import HomeLayout from 'layouts/Home';
import Inner from './Inner';
import { memo } from 'react';

const Wrapper = memo(() => {
    return (
        <HomeLayout title="Home">
            <Inner />
        </HomeLayout>
    );
});

Wrapper.displayName = 'Home';

const Home = Wrapper;

export default Home;
