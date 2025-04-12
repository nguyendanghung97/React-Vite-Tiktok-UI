import { INav } from '~/layouts/layoutComponents/sidebar/navbar/navData';
// import NavItem from './navItem';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import TooltipTippy from '@tippyjs/react';

const NavBar = ({ data, isCollapsed }: Type) => {
    const { t } = useTranslation();

    // Component riêng cho icon với React.memo
    // const SidebarIcon = React.memo(({ isActive, item }) => {
    //     return (
    //         <div
    //             className={classNames(
    //                 {
    //                     'mr-2': !isCollapsed,
    //                     'p-1': item.avatar,
    //                 },
    //                 'h-full w-8',
    //             )}
    //         >
    //             {isActive ? item.activeIcon || item.avatar : item.inactiveIcon || item.avatar}
    //         </div>
    //     );
    // });

    return (
        <nav className="mb-2">
            <ul className="text-lg font-bold">
                {data.map((item, index) => (
                    <TooltipTippy
                        key={index}
                        content={t(`layouts.sidebar.navbar.${item.title}`)}
                        disabled={!isCollapsed}
                        placement="right"
                        offset={[0, 18]}
                        arrow={false}
                    >
                        <li
                            // key={index}
                            className={classNames(
                                'rounded-md cursor-pointer hover:bg-light-text/5 dark:hover:bg-dark-text/5',
                                {
                                    'py-2 px-1.5': !isCollapsed,
                                    'p-2': isCollapsed,
                                },
                            )}
                        >
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
                                            {isActive
                                                ? item.activeIcon || item.avatar
                                                : item.inactiveIcon || item.avatar}
                                        </div>
                                        <span
                                            className={classNames(
                                                'leading-8 transition-opacity duration-1000 ease-in-out',
                                                {
                                                    'opacity-100': !isCollapsed,
                                                    'opacity-0': isCollapsed,
                                                },
                                            )}
                                        >
                                            {!isCollapsed && t(`layouts.sidebar.navbar.${item.title}`)}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </TooltipTippy>
                ))}
            </ul>
        </nav>
    );
};

type Type = {
    data: INav[];
    isCollapsed: boolean;
};

export default NavBar;
