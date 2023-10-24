import { FC, PropsWithChildren, memo } from 'react';
import Header from 'components/Header';
// import './index.scss'; Import if needed

interface Props {
    title?: string;
    subTitle?: string;
}

const HomeLayout: FC<PropsWithChildren<Props>> = memo(
    ({ children, title, subTitle }) => {
        return (
            <div>
                <Header />
                {children}
            </div>
        );
    }
);
HomeLayout.displayName = 'HomeLayout';

export default HomeLayout;
