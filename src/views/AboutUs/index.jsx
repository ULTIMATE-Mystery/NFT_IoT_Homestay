import { memo } from 'react';
import Inner from 'views/AboutUs/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});
Wrapper.displayName = 'AboutUs';

const AboutUs = Wrapper;

export default AboutUs;
