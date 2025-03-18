import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import AccountItem from '~/components/accountItem';
import Heading from '~/components/heading';
import Separate from '~/components/separate';
import TooltipTippy from '@tippyjs/react';
import { User } from '~/pages/home/dataHomePage';

const SuggestedAccounts = forwardRef<HTMLDivElement, Type>(({ data, children, isCollapsed, className }, ref) => {
    const { t } = useTranslation();
    return (
        <div ref={ref} className={classNames(className, 'relative py-4')}>
            <TooltipTippy
                disabled={!isCollapsed}
                content={t('layouts.sidebar.suggestedAccounts.Title')}
                placement="right"
                offset={[0, 8]}
                arrow={false}
            >
                <div className="absolute z-20 inset-0 -left-4 -right-4"></div>
            </TooltipTippy>
            <Separate className="absolute top-0 left-2 right-2 border-t" />

            <Heading className="relative z-30 mb-2 w-56 px-2.5 text-sm font-semibold !text-opacity-75">
                {!isCollapsed && t('layouts.sidebar.suggestedAccounts.Title')}
            </Heading>

            <ul className="relative z-50 text-base font-bold">
                {data.map((account, index) => {
                    return (
                        <TooltipTippy
                            key={index}
                            content={account.full_name}
                            disabled={!isCollapsed}
                            placement="right"
                            offset={[0, 18]}
                            arrow={false}
                        >
                            <li
                                // key={index}
                                className="rounded-md transition-all ease-in-out duration-200 overflow-hidden hover:bg-light-text/5 dark:hover:bg-dark-text/5"
                            >
                                <AccountItem
                                    isCollapsed={isCollapsed}
                                    className={classNames({
                                        'py-2 px-2.5': !isCollapsed,
                                        'p-2': isCollapsed,
                                    })}
                                    accNav
                                    account={account}
                                />
                            </li>
                        </TooltipTippy>
                    );
                })}
            </ul>
            {children}
        </div>
    );
});

type Type = {
    data: User[];
    children?: React.ReactNode;
    isCollapsed: boolean;
    className?: string;
};

export default SuggestedAccounts;
