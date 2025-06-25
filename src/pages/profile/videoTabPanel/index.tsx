import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateIcon, FavoriteDoubleIcon, LockIcon } from '~/assets/images/svgs';
import Button from '~/components/button';
import EmptyState, { IEmptyState } from '~/components/emptyState';

import VideoPlayer from '~/components/video';
import config from '~/configs';
import { dataEmptyStates, favoriteVideos, idAndVideos, profileTabs, repostVideos } from '../dataProfilePage';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { User } from '~/store/users';
import SubTabVideo from './subTabVideo';
import SubTabFavorite from './subTabFavorite';
import TabMain from './tabMain';

const VideoTabPanel = ({
    selectedAccount,
    myCollectionRedirectTab,
    myCollectionRedirectSubTab,
    handleOpenModal,
}: Type) => {
    const { t } = useTranslation();

    const collections = useSelector((state: RootState) => state.collections.collections);

    const [activeTab, setActiveTab] = useState<string>('Videos');
    const [activeSubTabVideo, setActiveSubTabVideo] = useState<string>('Latest');
    const [activeSubTabFavorite, setActiveSubTabFavorite] = useState<string>('Posts');

    const emptyStateData: IEmptyState = useMemo(() => {
        return dataEmptyStates[`${activeTab}.${activeSubTabFavorite}`] || dataEmptyStates[activeTab];
    }, [activeTab, activeSubTabFavorite]);

    const videosToDisplay = useMemo(() => {
        switch (activeTab) {
            case 'Videos':
                return [];
            case 'Reposts':
                return repostVideos;
            case 'Favorites':
                switch (activeSubTabFavorite) {
                    case 'Posts':
                        return favoriteVideos;
                    // case 'Collections':
                    //     return collectionAlbums;
                    default:
                        return [];
                }
            case 'Liked':
                return idAndVideos;
            default:
                return [];
        }
    }, [activeTab, activeSubTabFavorite]);

    const profileTabsDisplay = useMemo(() => {
        let excludeTabs: string[] = [];

        if (selectedAccount) {
            excludeTabs = repostVideos.length === 0 ? ['Reposts', 'Favorites'] : ['Favorites'];
        } else {
            if (repostVideos.length === 0) {
                excludeTabs = ['Reposts'];
            }
        }

        return profileTabs.filter((tab) => !excludeTabs.includes(tab.title));
    }, [selectedAccount]);

    useEffect(() => {
        if (activeTab !== 'Favorites' && activeSubTabFavorite) {
            setActiveSubTabFavorite('Posts');
        }
    }, [activeTab, activeSubTabFavorite]);

    useEffect(() => {
        setActiveTab('Videos');
    },[selectedAccount])

    useEffect(() => {
        if (myCollectionRedirectTab && myCollectionRedirectSubTab) {
            setActiveTab(myCollectionRedirectTab); // Đặt giá trị mặc định là 'Videos' nếu không có state
            setActiveSubTabFavorite(myCollectionRedirectSubTab); // Đặt giá trị mặc định cho subTab khi ở tab Favorites
        } else {
            setActiveTab('Videos');
            setActiveSubTabVideo('Latest');
        }
    }, [myCollectionRedirectTab, myCollectionRedirectSubTab]);

    return (
        <>
            {console.log('VideoTabPanel re-render')}
            <div className="flex flex-col">
                <div className="relative mb-6 flex items-center justify-between border-b border-light-text/10 dark:border-dark-text/5">
                    <TabMain tabs={profileTabsDisplay} activeTab={activeTab} setActiveTab={setActiveTab} />

                    {activeTab === 'Videos' && (
                        <SubTabVideo
                            className="hidden lg:flex absolute right-0 p-0.5"
                            subTabs={profileTabsDisplay.find((item) => item.title === 'Videos')?.subTabs ?? []}
                            activeSubTabVideo={activeSubTabVideo}
                            setActiveSubTabVideo={setActiveSubTabVideo}
                        />
                    )}

                    {activeTab === 'Favorites' && (
                        <Button
                            className="hidden lg:flex px-3 h-8 text-[15px] font-semibold"
                            leftIcon={<CreateIcon />}
                            onClick={handleOpenModal}
                        >
                            {t('components.button.Create')}
                        </Button>
                    )}
                </div>

                <div className="min-h-96 flex flex-col">
                    {activeTab === 'Videos' && (
                        <SubTabVideo
                            className="lg:hidden flex w-fit p-0.5"
                            subTabs={profileTabsDisplay.find((item) => item.title === 'Videos')?.subTabs ?? []}
                            activeSubTabVideo={activeSubTabVideo}
                            setActiveSubTabVideo={setActiveSubTabVideo}
                        />
                    )}

                    {activeTab === 'Favorites' && (
                        <div className="relative flex justify-between mb-6">
                            <SubTabFavorite
                                subTabs={profileTabsDisplay.find((item) => item.title === 'Favorites')?.subTabs || []}
                                activeSubTabFavorite={activeSubTabFavorite}
                                setActiveSubTabFavorite={setActiveSubTabFavorite}
                            />

                            <Button
                                className="lg:hidden ml-3.5 px-3 h-8 text-[15px] font-semibold"
                                leftIcon={<CreateIcon />}
                                onClick={handleOpenModal}
                            >
                                {t('components.button.Create')}
                            </Button>

                            {/* <Button
                                    className="px-3 min-w-24 h-8 text-sm font-semibold"
                                    onClick={() => {
                                        dispatch(resetCollections());
                                        dispatch(resetVideos());
                                    }}
                                >
                                    {t('components.button.Reset')}
                                </Button> */}
                        </div>
                    )}

                    {activeTab === 'Favorites' && activeSubTabFavorite === 'Collections' ? (
                        collections.length > 0 ? (
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                                {collections.map((collection, index) => (
                                    <Link
                                        key={index}
                                        to={config.routes.myCollection(collection.id)}
                                        state={{
                                            collectionId: collection.id,
                                            collectionName: collection.collectionName,
                                        }}
                                        className={classNames(
                                            'flex justify-center items-center',
                                            'w-full aspect-[3/4] overflow-hidden rounded relative',
                                            {
                                                'bg-black/10 dark:bg-white/20': collection.collectionVideos.length < 1,
                                            },
                                        )}
                                    >
                                        <VideoPlayer
                                            posterVideo={
                                                collection.collectionVideos.length > 0
                                                    ? collection.collectionVideos[
                                                          collection.collectionVideos.length - 1
                                                      ].thumbnail
                                                    : ''
                                            }
                                            src={
                                                collection.collectionVideos.length > 0
                                                    ? collection.collectionVideos[
                                                          collection.collectionVideos.length - 1
                                                      ].url
                                                    : ''
                                            }
                                        />
                                        <div className="absolute inset-0 flex justify-center items-center">
                                            {collection.collectionVideos.length < 1 && <FavoriteDoubleIcon />}
                                            <div className="text-white flex items-end justify-between absolute left-3.5 right-3.5 bottom-4">
                                                <div className="flex flex-col">
                                                    <span className="text-base font-semibold line-clamp-1 break-all">
                                                        {collection.collectionName}
                                                    </span>
                                                    <span className="text-xs line-clamp-1 break-all">
                                                        {collection.collectionVideos.length} videos
                                                    </span>
                                                </div>

                                                <span className="w-5 shrink-0">
                                                    {!collection.isPublic && (
                                                        <LockIcon className="text-lg sm:text-xl" />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <EmptyState {...emptyStateData} handleOpenAddVideosModal={handleOpenModal} />
                        )
                    ) : videosToDisplay.length > 0 ? (
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                            {videosToDisplay.map((item, index) => (
                                <div key={index} className="w-full aspect-[3/4] overflow-hidden relative">
                                    <VideoPlayer
                                        posterVideo={item.thumbnail}
                                        src={item.url}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.play();
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.pause();
                                            e.currentTarget.currentTime = 0; // Đặt lại video về đầu khi rời chuột};
                                            e.currentTarget.load();
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState activeTab={activeTab} {...emptyStateData} />
                    )}
                </div>
            </div>
        </>
    );
};

export default React.memo(VideoTabPanel);

type Type = {
    selectedAccount: User;
    myCollectionRedirectTab: string;
    myCollectionRedirectSubTab: string;
    handleOpenModal: () => void;
};
