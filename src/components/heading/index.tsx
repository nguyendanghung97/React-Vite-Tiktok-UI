import classNames from 'classnames';
import React from 'react';

const Heading = ({ children, className }: Type) => {
    return <h4 className={classNames('text-light-text dark:text-dark-text', className)}>{children}</h4>;
};

type Type = {
    children: React.ReactNode;
    className?: string;
};

export default Heading;
