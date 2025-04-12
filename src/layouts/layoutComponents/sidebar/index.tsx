import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TooltipTippy from '@tippyjs/react';

import { NavData } from './navbar/navData';
import NavBar from './navbar';
import SuggestedAccounts from './suggestedAccounts';
import Separate from '~/components/separate';

import './index.less';
import { ArrowDownIcon } from '~/assets/images/svgs';
import classNames from 'classnames';
import Footer from '~/layouts/layoutComponents/footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { getSideBarUsers } from '~/store/users';

const SideBar: React.FC<Type> = ({ isCollapsed, className, ...passProps }) => {
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
        <div
            className={classNames(className, 'fixed z-30 h-[calc(100dvh-4rem)] bg-light-bg dark:bg-dark-bg')}
            {...passProps}
        >
            {/* <Separate className="lg:hidden absolute z-10 inset-0 border-r" /> */}
            <Separate className="absolute z-10 inset-0 border-r" />

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

            <div className="pr-1 h-full">
                <div
                    className={classNames(
                        'pl-2.5 h-full overflow-x-hidden overflow-y-scroll scrollbar-aside relative z-10',
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
                                onClick={handleClick}
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
    toggleCollapse?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default SideBar;
