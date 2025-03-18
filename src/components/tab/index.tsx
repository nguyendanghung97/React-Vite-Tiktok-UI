import classNames from 'classnames';
import React, { forwardRef } from 'react';

const Tab = forwardRef<HTMLLIElement, Type>(
    ({ data, setActiveTab, className, children, isActive, ...passProps }, ref) => {
        const handleClick = (title: string) => {
            setActiveTab(title);
        };

        return (
            <li
                ref={ref}
                onClick={() => handleClick(data.title)}
                className={classNames(
                    'shrink-0 h-full flex items-center justify-center cursor-pointer text-light-text/60 dark:text-dark-text/50 hover:text-light-text dark:hover:text-dark-text/90',
                    className,
                    {
                        '!text-light-text dark:!text-dark-text': isActive,
                    },
                    // {
                    //     '!text-light-text dark:!text-dark-text': activeClass,
                    // },
                )}
                {...passProps}
            >
                {children}
            </li>
        );
    },
);

export interface ITab {
    title: string;
    icon?: React.ReactNode; // Nếu có thể có icon
    subTabs?: ITab[] | undefined;
}

type Type = {
    data: ITab;
    className: string;
    children: React.ReactNode;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    isActive: boolean;
};

export default Tab;
