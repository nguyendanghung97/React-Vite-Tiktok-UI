import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { INav } from './navData';

const NavItem: React.FC<Type> = ({ item, isCollapsed }) => {
    const { t } = useTranslation();
    return (
        <NavLink
            className={({ isActive }) =>
                classNames('h-8 w-full flex', {
                    'text-primary': isActive,
                    'justify-center': isCollapsed,
                })
            }
            to={item.to}
        >
            {({ isActive }) => (
                <>
                    <div
                        className={classNames(
                            {
                                'mr-2': !isCollapsed,
                                'p-1': item.avatar,
                            },
                            'h-full w-8',
                        )}
                    >
                        {isActive ? item.activeIcon || item.avatar : item.inactiveIcon || item.avatar}
                    </div>
                    <span
                        className={classNames('leading-8 transition-all ease-in-out duration-1000', {
                            'opacity-100': !isCollapsed,
                            'opacity-0': isCollapsed,
                        })}
                    >
                        {!isCollapsed && t(`layouts.sidebar.navbar.${item.title}`)}
                    </span>
                </>
            )}
        </NavLink>
    );
};

type Type = {
    item: INav;
    isCollapsed: boolean;
};

export default NavItem;
