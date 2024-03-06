import HomeLayout from 'layouts/Home';
import { memo } from 'react';
import Inner from 'views/AboutUs/Inner';

const Wrapper = memo(() => {
    return (
        <HomeLayout title="AboutUs">
            <Inner />
        </HomeLayout>
    );
});
Wrapper.displayName = 'AboutUs';

const AboutUs = Wrapper;

export default AboutUs;
