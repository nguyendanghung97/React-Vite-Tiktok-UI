import { PropsWithChildren } from 'react';
import Header from '~/layouts/layoutComponets';

const HeaderOnly = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default HeaderOnly;
