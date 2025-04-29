import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Tab, { ITab } from '~/components/tab';
import { favoriteVideos } from '../dataProfilePage';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';

const SubTabFavorite = ({ subTabs, activeSubTabFavorite, setActiveSubTabFavorite, className }: Type) => {
    const { t } = useTranslation();

    const collections = useSelector((state: RootState) => state.collections.collections);

    return (
        <ul className={classNames('flex gap-x-2 h-8', className)}>
            {subTabs.map((subTab, index) => (
                <Tab
                    key={index}
                    data={subTab}
                    setActiveTab={setActiveSubTabFavorite}
                    className={classNames(
                        'h-full min-w-24 justify-center px-3 text-sm font-semibold rounded-md hover:bg-light-text/10 dark:hover:bg-dark-text/20',
                        {
                            'bg-light-text/5 dark:bg-dark-text/10': subTab.title === activeSubTabFavorite,
                        },
                    )}
                    isActive={subTab.title === activeSubTabFavorite}
                >
                    {t(`components.tabs.${subTab.title}`)}{' '}
                    {subTab.title === 'Posts' ? favoriteVideos.length : collections.length}
                </Tab>
            ))}
        </ul>
    );
};

export default SubTabFavorite;

type Type = {
    className?: string;
    activeSubTabFavorite: string;
    setActiveSubTabFavorite: React.Dispatch<React.SetStateAction<string>>;
    subTabs: ITab[];
};
