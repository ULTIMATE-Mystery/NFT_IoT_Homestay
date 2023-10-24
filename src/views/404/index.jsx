import Inner from './Inner';
import { memo } from 'react';

const Wrapper = memo(() => {
    return (
        <div>
            <Inner />
        </div>
    );
});

Wrapper.displayName = '404';

const Page404 = Wrapper;

export default Page404;
