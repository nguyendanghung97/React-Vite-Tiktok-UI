import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Tab, { ITab } from '~/components/tab';

const SubTabVideo = ({ subTabs, activeSubTabVideo, setActiveSubTabVideo, className }: Type) => {
    const { t } = useTranslation();
    return (
        <ul className={classNames('bg-light-text/5 dark:bg-dark-text/5 rounded-md', className)}>
            {subTabs.map((tab, index) => (
                <Tab
                    key={index}
                    data={tab}
                    setActiveTab={setActiveSubTabVideo}
                    className={classNames('px-2.5 py-1.5 text-[13px] text-color/50 font-semibold rounded-md', {
                        'bg-white dark:bg-white/20 shadow': tab.title === activeSubTabVideo,
                    })}
                    isActive={tab.title === activeSubTabVideo}
                >
                    <span className="text-sm font-semibold line-clamp-1 break-all">
                        {t(`components.tabs.${tab.title}`)}
                    </span>
                </Tab>
            ))}
        </ul>
    );
};

export default SubTabVideo;

type Type = {
    className?: string;
    activeSubTabVideo: string;
    setActiveSubTabVideo: React.Dispatch<React.SetStateAction<string>>;
    subTabs: ITab[];
};
