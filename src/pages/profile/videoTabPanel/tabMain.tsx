import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Tab, { ITab } from '~/components/tab';
import TabIndicator from '~/components/tabIndicator';

const TabMain = ({ tabs, activeTab, setActiveTab }: Type) => {
    const { t } = useTranslation();

    // Ref để lưu trữ tham chiếu đến các phần tử DOM
    const liRefs = useRef<(HTMLLIElement | null)[]>([]);

    return (
        <ul className="flex items-center h-11 relative overflow-auto md:overflow-hidden scroll-tabs">
            {tabs.map((tab, index) => {
                // const isActive = tab.title === activeTab; // Kiểm tra phần tử có phải là phần tử đang active không
                return (
                    <Tab
                        data={tab}
                        setActiveTab={setActiveTab}
                        key={index}
                        // Lưu trữ các li theo đúng thứ tự
                        ref={(el) => liRefs?.current && (liRefs.current[index] = el)}
                        className="px-8 gap-x-1 text-xl"
                        isActive={tab.title === activeTab}
                    >
                        {tab.icon}
                        <span className="text-lg font-semibold line-clamp-1 break-all">
                            {t(`components.tabs.${tab.title}`)}
                        </span>
                    </Tab>
                );
            })}

            {/* TabIndicator nếu có */}
            {liRefs && (
                <TabIndicator
                    className="-translate-y-0.5"
                    liRefs={liRefs}
                    activeIndex={tabs.findIndex((tab) => tab.title === activeTab)}
                />
            )}
        </ul>
    );
};

export default TabMain;

type Type = {
    className?: string;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: ITab[];
};
