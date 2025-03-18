import React from 'react';
import classNames from 'classnames';

const ContentPopperWrapper = ({ children, className, ...passProps }: Type) => {
    return (
        <div className={classNames(className)} {...passProps}>
            {children}
        </div>
    );
};

type Type = {
    children: React.ReactNode;
    className?: string;
};

export default ContentPopperWrapper;
