import { PropsWithChildren } from 'react';
import Header from '~/layouts/layoutComponents';

const HeaderOnly = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default HeaderOnly;
