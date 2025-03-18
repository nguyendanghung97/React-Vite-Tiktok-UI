import classNames from 'classnames';
import React from 'react';

import Button from '~/components/button';
import Separate from '~/components/separate';

const MenuItem: React.FC<Type> = ({
    switchElement,
    title,
    icon,
    to,
    href,
    onClick,
    className,
    menuUser,
    menuShare,
    separate,
}) => {
    return (
        <>
            {separate && <Separate className="border-t" />}
            <li onClick={onClick} className={classNames(className, 'list-none cursor-pointer')}>
                <Button
                    menuItem
                    to={to}
                    href={href}
                    className={classNames({
                        'py-2.5 pl-4 pr-2': menuUser,
                        'px-4 py-2.5': menuShare,
                    })}
                    leftIcon={icon}
                >
                    {title}
                </Button>
                {switchElement}
            </li>
        </>
    );
};

type Type = {
    onClick?: React.MouseEventHandler<Element>;
    className?: string;
    title?: string;
    menuUser?: boolean;
    menuShare?: boolean;
    icon: React.ReactNode;
    to?: string;
    href?: string;
    switchElement?: React.ReactNode;
    separate?: boolean;
};

export default MenuItem;
