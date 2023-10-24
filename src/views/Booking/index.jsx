import HomeLayout from 'layouts/Home';
import Inner from './Inner';
import { memo } from 'react';

const Wrapper = memo(() => {
    return (
        <HomeLayout title="Booking">
            <Inner />
        </HomeLayout>
    );
});

Wrapper.displayName = 'Booking';

const Booking = Wrapper;

export default Booking;
