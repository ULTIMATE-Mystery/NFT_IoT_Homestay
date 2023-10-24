import { memo } from 'react';
import Inner from 'views/Management/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});
Wrapper.displayName = 'Management';

const Management = Wrapper;

export default Management;
