import React from 'react';

import TabIndicator from '../tabIndicator';
import classNames from 'classnames';
import Tab, { ITab } from '../tab';

const Tabs = ({
    activeClassName,
    tabs,
    activeTab,
    setActiveTab,
    liRefs,
    className,
    tabClassName,
    // activeClassName,
    renderTabContent,
    ...passProps
}: Type) => {
    const activeIndex = tabs.findIndex((tab) => tab.title === activeTab);
    return (
        <ul className={classNames('flex items-center', className)} {...passProps}>
            {tabs.map((tab, index) => {
                const isActive = tab.title === activeTab; // Kiểm tra phần tử có phải là phần tử đang active không
                return (
                    <Tab
                        data={tab}
                        setActiveTab={setActiveTab}
                        key={index}
                        // Lưu trữ các li theo đúng thứ tự
                        ref={(el) => liRefs?.current && (liRefs.current[index] = el)}
                        className={classNames(tabClassName, {
                            [activeClassName]: isActive,
                        })}
                        isActive={isActive}
                    >
                        {renderTabContent(tab)}
                    </Tab>
                );
            })}

            {/* TabIndicator nếu có */}
            {liRefs && <TabIndicator liRefs={liRefs} activeIndex={activeIndex} />}
        </ul>
    );
};

type Type = {
    className: string;
    tabClassName: string;
    activeClassName: string;
    liRefs?: React.MutableRefObject<(HTMLLIElement | null)[]>;
    renderTabContent: (tab: ITab) => React.ReactNode;
    tabs: ITab[];
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default Tabs;
