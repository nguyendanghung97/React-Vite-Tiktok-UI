import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TooltipTippy from '@tippyjs/react';

import { NavData } from './navbar/navData';
import NavBar from './navbar';
import SuggestedAccounts from './suggestedAccounts';
import * as searchService from '~/services/searchService';
import Separate from '~/components/separate';

import './index.less';
import { ArrowDownIcon, ArrowSideBarICon } from '~/assets/images/svgs';
import classNames from 'classnames';
import { User } from '~/pages/home/dataHomePage';
import Footer from '~/layouts/layoutComponets/footer';

const SideBar = ({ isCollapsed, toggleCollapse, className }: Type) => {
    const { t } = useTranslation();
    const [result, setResult] = useState<User[]>([]);
    // console.log('result', result);
    const [param, setParam] = useState('less');

    const fetchApi = async (param: string) => {
        // setIsLoading(true);
        try {
            const result = await searchService.get('hoang', param);
            setResult(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApi(param);
    }, [param]);

    const handleClick = () => {
        const newParam = param === 'less' ? 'more' : 'less';
        setParam(newParam);
    };

    return (
        <div className={classNames(className, 'fixed z-30 h-[calc(100vh-4rem)] bg-light-bg dark:bg-dark-bg')}>
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
                        {
                            // 'pl-2.5': isCollapsed,
                            // 'pl-1': !isCollapsed,
                        },
                    )}
                >
                    <div
                        className={classNames('pb-6', {
                            'pt-5': !isCollapsed,
                            'pt-3': isCollapsed,
                        })}
                    >
                        <NavBar isCollapsed={isCollapsed} data={NavData} />

                        <SuggestedAccounts isCollapsed={isCollapsed} data={result}>
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
                                {/* {isLoading ? 'Loading...' : param === 'less' ? 'See more' : 'See less'} */}
                                {isCollapsed ? (
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
    toggleCollapse: () => void;
};

export default SideBar;
