import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TooltipTippy from '@tippyjs/react';

import { NavData } from './navbar/navData';
import NavBar from './navbar';
import SuggestedAccounts from './suggestedAccounts';
import Separate from '~/components/separate';

import './index.less';
import { ArrowDownIcon, Logo } from '~/assets/images/svgs';
import classNames from 'classnames';
import Footer from '~/layouts/layoutComponents/footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { getSideBarUsers } from '~/store/users';
import { Link } from 'react-router-dom';
import config from '~/configs';

const SideBar: React.FC<Type> = ({ isCollapsed, isDesktop, className, ...passProps }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const [param, setParam] = useState<'less' | 'more'>('less');

    // Lấy dữ liệu từ Redux store
    const { sidebarUsers, loadingSidebar } = useSelector((state: RootState) => state.users);

    // console.log('sidebarUsers', sidebarUsers);

    useEffect(() => {
        dispatch(getSideBarUsers({ query: 'h', type: param }));
    }, [dispatch, param]);

    const handleClick = () => {
        const newParam = param === 'less' ? 'more' : 'less';
        setParam(newParam);
    };

    return (
        <div className={classNames(className, 'fixed -mt-16 h-dvh bg-light-bg dark:bg-dark-bg')} {...passProps}>
            {/* <Separate className="lg:hidden absolute z-10 inset-0 border-r" /> */}
            <Separate className="absolute z-10 inset-0 border-r" />
            <div className="h-16 relative z-20">
                {!isDesktop && (
                    <Link
                        className="px-4 w-full h-full flex items-center shadow shadow-light-text/10 dark:shadow-dark-text/10"
                        to={config.routes.home}
                        // ép trình duyệt tải lại bằng cách thêm window.location.href => Lúc này nó tương tự như thẻ a
                        onClick={() => (window.location.href = config.routes.home)}
                    >
                        <Logo className="ml-9 sm:ml-0" title="Logo" />
                    </Link>
                )}
            </div>

            {/* <div
                onClick={toggleCollapse}
                className="group cursor-pointer absolute top-1/4 -right-3 w-3 h-20 rounded-r-xl border border-light-text dark:border-dark-text !border-opacity-15 !border-l-transparent shadow-sm shadow-black/10 dark:shadow-white/35 bg-light-bg dark:bg-dark-bg"
            >
                <div className="w-full h-full flex items-center justify-center opacity-35 group-hover:opacity-100">
                    <ArrowSideBarICon
                        className={classNames({
                            '-rotate-180': !isCollapsed,
                        })}
                    />
                </div>
            </div> */}

            <div className="pr-1 h-[calc(100dvh-4rem)]">
                <div
                    className={classNames(
                        'pl-2.5 h-full overflow-x-hidden overflow-y-scroll overscroll-contain scrollbar-aside relative z-10',
                    )}
                >
                    <div
                        className={classNames('pb-6', {
                            'pt-5': !isCollapsed,
                            'pt-3': isCollapsed,
                        })}
                    >
                        <NavBar isCollapsed={isCollapsed} data={NavData} />

                        <SuggestedAccounts isCollapsed={isCollapsed} data={sidebarUsers}>
                            <button
                                className={classNames(
                                    'relative z-50 w-full px-2 mt-2 text-sm font-semibold text-primary',
                                    {
                                        'text-start': !isCollapsed,
                                        'flex justify-center': isCollapsed,
                                    },
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            >
                                {loadingSidebar ? (
                                    '...'
                                ) : isCollapsed ? (
                                    <TooltipTippy
                                        content={
                                            param === 'less'
                                                ? t('layouts.sidebar.suggestedAccounts.changeAmount.See more')
                                                : t('layouts.sidebar.suggestedAccounts.changeAmount.See less')
                                        }
                                        placement="right"
                                        offset={[0, 32]}
                                        arrow={false}
                                    >
                                        <span
                                            className={classNames(
                                                'w-6 h-6 rounded-full flex items-center justify-center',
                                                {
                                                    'hover:bg-light-text/10 hover:dark:bg-dark-text/90': isCollapsed,
                                                },
                                            )}
                                        >
                                            <ArrowDownIcon
                                                className={classNames('w-3.5 h-3.5', {
                                                    'rotate-180': param !== 'less',
                                                })}
                                            />
                                        </span>
                                    </TooltipTippy>
                                ) : param === 'less' ? (
                                    t('layouts.sidebar.suggestedAccounts.changeAmount.See more')
                                ) : (
                                    t('layouts.sidebar.suggestedAccounts.changeAmount.See less')
                                )}
                            </button>
                        </SuggestedAccounts>

                        {!isCollapsed && <Footer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

type Type = {
    className?: string;
    isCollapsed: boolean;
    isDesktop: boolean;
    toggleCollapse?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default SideBar;
