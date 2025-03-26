import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { CreateIcon, FavoriteDoubleIcon, LockIcon } from '~/assets/images/svgs';
import Button from '~/components/button';
import config from '~/configs';
import InfoAccount from '~/components/infoAccount';
import NameCollectionModal from '~/components/modal/forms/nameCollection';
import Tabs from '~/components/tabs';
import AddVideosModal from '~/components/modal/forms/addVideos';
import VideoPlayer from '~/components/video';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { addCollection, ICollection } from '~/store/collections';
import { idAndVideos, favoriteVideos, profileTabs, repostVideos, dataEmptyStates } from './dataProfilePage';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Tab from '~/components/tab';
import TabIndicator from '~/components/tabIndicator';
import EmptyState, { IEmptyState } from '~/components/emptyState';

import './index.less';
import { reduceUncollectedVideos, Video, VideoSelect } from '~/store/videos';
import useVideosSelection from '~/hooks/useVideosSelection';

const Profile = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Sử dụng để điều hướng
    // Ref để lưu trữ tham chiếu đến các phần tử DOM
    const liRefs = useRef<(HTMLLIElement | null)[]>([]);
    const { state } = useLocation();
    const { selectedAccount, myCollectionRedirectTab, myCollectionRedirectSubTab } = state || {};

    const collections = useSelector((state: RootState) => state.collections.collections);

    const { videosToAddVideosModal, setVideosToAddVideosModal } = useVideosSelection();

    const [selectedVideos, setSelectedVideos] = useState<VideoSelect[]>([]);
    // console.log('selectedVideos', selectedVideos);

    const [activeTab, setActiveTab] = useState<string>('Videos');
    const [activeSubTabFavorite, setActiveSubTabFavorite] = useState<string>('Posts');
    // console.log('activeSubTabFavorite', activeSubTabFavorite);
    const [activeSubTabVideo, setActiveSubTabVideo] = useState<string>('Latest');
    const [activeModalIndex, setActiveModalIndex] = useState<number>(0);
    const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setSelectedVideos(videosToAddVideosModal.filter((video) => video.isSelected));
    }, [videosToAddVideosModal]);

    useEffect(() => {
        if (myCollectionRedirectTab && myCollectionRedirectSubTab) {
            setActiveTab(myCollectionRedirectTab); // Đặt giá trị mặc định là 'Videos' nếu không có state
            setActiveSubTabFavorite(myCollectionRedirectSubTab); // Đặt giá trị mặc định cho subTab khi ở tab Favorites
        } else {
            setActiveTab('Videos');
            setActiveSubTabVideo('Latest');
        }
    }, [state, myCollectionRedirectTab, myCollectionRedirectSubTab]);

    // const { username } = useParams<{ username: string }>();
    // // console.log('username', username);
    // useEffect(() => {
    //     if (selectedAccount) {
    //         document.title = `${selectedAccount.full_name} (${username})`;
    //     } else {
    //         document.title = `(17)Đăng Hùng (${username})`;
    //     }
    // }, [username, selectedAccount]);

    const handleCloseModal = () => {
        setVideosToAddVideosModal((prev) => prev.map((video) => ({ ...video, isSelected: false })));
        setIsChecked(false);
        setCollectionName('');
        setIsOpenModal(false);
        // setSelectedVideos([]);
        setActiveModalIndex(0);
    };

    const handleNext = () => {
        setActiveModalIndex!((prevIndex) => prevIndex + 1); // Chuyển sang modal tiếp theo
    };
    const handleBackModal = () => {
        setActiveModalIndex!((prev) => prev - 1); // Trở về modal trước đó
    };

    const handleSubmitAddVideosModal = () => {
        // e.preventDefault();
        // handleCloseModal();

        const collectionId = uuidv4();
        // Lọc chỉ lấy id và video từ selectedVideos
        const collectionVideos = selectedVideos.map(({ id, url, thumbnail }) => ({ id, url, thumbnail }));

        // Logic cho profile
        const newCollection: ICollection = {
            id: collectionId,
            collectionName: collectionName!,
            collectionVideos: collectionVideos,
            isPublic: isChecked!,
        };

        dispatch(addCollection(newCollection));
        navigate(`${config.routes.myProfile}/collection/${collectionId}`);

        // dispatch(setVideos(videosToAdd));
        dispatch(reduceUncollectedVideos(selectedVideos));
    };

    const modals: JSX.Element[] = [
        <NameCollectionModal
            showPublicToggle
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            collectionName={collectionName}
            setCollectionName={setCollectionName}
            handleCloseModal={handleCloseModal}
            handleNext={handleNext}
        />,
        <AddVideosModal
            context="profile"
            videosToAddVideosModal={videosToAddVideosModal}
            setVideosToAddVideosModal={setVideosToAddVideosModal}
            isOpenModal={isOpenModal}
            selectedVideos={selectedVideos}
            // setSelectedVideos={setSelectedVideos}
            handleBackModal={handleBackModal}
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSubmitAddVideosModal}
        />,
    ];

    // (IIFE - Immediately Invoked Function Expression)
    const profileTabsDisplay = (() => {
        // Nếu có selectedAccount
        if (selectedAccount) {
            // Nếu không có video reposts, ẩn 'Reposts'
            if (repostVideos.length === 0) {
                return profileTabs.filter((item) => item.title !== 'Reposts' && item.title !== 'Favorites');
            }
            // Nếu có video repost, chỉ ẩn 'Favorites'
            return profileTabs.filter((item) => item.title !== 'Favorites');
        } else {
            if (repostVideos.length === 0) {
                return profileTabs.filter((item) => item.title !== 'Reposts');
            }
        }
        // Trả về tất cả các tab nếu không có điều kiện nào
        return profileTabs;
    })();

    useEffect(() => {
        // Chỉ đặt lại activeSubTabFavorite khi activeTab thay đổi từ 'Favorites' sang một tab khác
        if (activeTab !== 'Favorites' && activeSubTabFavorite !== 'Posts') {
            setActiveSubTabFavorite('Posts');
        }

        let videosToDisplay: Video[];

        switch (activeTab) {
            case 'Videos':
                videosToDisplay = [];
                break;
            case 'Reposts':
                videosToDisplay = repostVideos;
                break;
            case 'Favorites':
                switch (activeSubTabFavorite) {
                    case 'Posts':
                        videosToDisplay = favoriteVideos;
                        break;
                    // case 'Collections':
                    //     videosToDisplay = collectionAlbums;
                    //     break;
                    default:
                        videosToDisplay = [];
                        break;
                }
                break;
            case 'Liked':
                videosToDisplay = idAndVideos;
                break;
            default:
                videosToDisplay = [];
                break;
        }

        setDisplayedVideos(videosToDisplay);
    }, [activeTab, activeSubTabFavorite]);

    const emptyStateData: IEmptyState =
        dataEmptyStates[`${activeTab}.${activeSubTabFavorite}`] || dataEmptyStates[activeTab];

    return (
        <>
            {/* Nguyên nhân dẫn đến UI bị rung:
            Trình duyệt không biết vùng nào được phép cuộn tiếp, nên sự kiện wheel bị đẩy lên phần tử cha (body, html, hoặc page).
            Nếu phần tử con (sidebar) đã cuộn hết, trình duyệt mặc định chuyển cuộn sang phần tử cha → gây hiệu ứng giật/rung khi page cũng bắt đầu cuộn.
            
        */}
            {isOpenModal && modals[activeModalIndex]}
            <div className="flex-1 overflow-x-hidden overflow-y-scroll h-[calc(100vh-4rem)]">
                <div className="py-9 px-8">
                    <InfoAccount account={selectedAccount}></InfoAccount>

                    <div className="flex flex-col">
                        <div className="relative mb-6 flex items-center justify-between border-b border-light-text/10 dark:border-dark-text/5">
                            <ul className="flex items-center h-11 relative overflow-auto md:overflow-hidden scroll-tabs">
                                {profileTabsDisplay.map((tab, index) => {
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
                                        activeIndex={profileTabsDisplay.findIndex((tab) => tab.title === activeTab)}
                                    />
                                )}
                            </ul>

                            {/* <Tabs
                            className="h-11 relative"
                            tabClassName="px-8 h-full inline-flex gap-x-1 text-xl cursor-pointer"
                            // activeClassName="!text-color"
                            tabs={profileTabsDisplay}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            liRefs={liRefs}
                            renderTabContent={(tab) => (
                                <>
                                    {tab.icon}
                                    <span className="text-lg font-semibold">{t(`components.tabs.${tab.title}`)}</span>
                                </>
                            )}
                        /> */}

                            {activeTab === 'Videos' ? (
                                <>
                                    {(() => {
                                        const subTabs = profileTabsDisplay.find(
                                            (item) => item.title === 'Videos',
                                        )?.subTabs;

                                        return (
                                            <Tabs
                                                className="hidden lg:flex absolute -right-3 p-0.5 bg-light-text/5 dark:bg-dark-text/5 rounded-md"
                                                tabClassName="px-2.5 py-1.5 text-[13px] text-color/50 font-semibold rounded-md"
                                                activeClassName="bg-white dark:bg-white/20 shadow"
                                                tabs={subTabs || []}
                                                activeTab={activeSubTabVideo}
                                                setActiveTab={setActiveSubTabVideo}
                                                renderTabContent={(subTab) => (
                                                    <>{t(`components.tabs.${subTab.title}`)}</>
                                                )}
                                            />
                                        );
                                    })()}
                                </>
                            ) : activeTab === 'Favorites' ? (
                                <Button
                                    className="hidden lg:flex px-3 h-8 text-[15px] font-semibold"
                                    leftIcon={<CreateIcon />}
                                    onClick={() => setIsOpenModal(true)}
                                >
                                    {t('components.button.Create')}
                                </Button>
                            ) : null}
                        </div>

                        <div className="min-h-96 flex flex-col">
                            {activeTab === 'Videos' && (
                                <div className="relative flex justify-between mb-6">
                                    {(() => {
                                        const subTabs = profileTabsDisplay.find(
                                            (item) => item.title === 'Videos',
                                        )?.subTabs;

                                        return (
                                            <Tabs
                                                className="lg:hidden w-fit p-0.5 bg-light-text/5 dark:bg-dark-text/5 rounded-md"
                                                tabClassName="px-2.5 py-1.5 text-[13px] text-color/50 font-semibold rounded-md"
                                                activeClassName="bg-white dark:bg-white/20 shadow"
                                                tabs={subTabs || []}
                                                activeTab={activeSubTabVideo}
                                                setActiveTab={setActiveSubTabVideo}
                                                renderTabContent={(subTab) => (
                                                    <>{t(`components.tabs.${subTab.title}`)}</>
                                                )}
                                            />
                                        );
                                    })()}
                                </div>
                            )}

                            {activeTab === 'Favorites' && (
                                <div className="relative flex justify-between mb-6">
                                    <Tabs
                                        className="flex gap-x-2 h-8"
                                        tabClassName="h-full min-w-24 justify-center px-3 text-sm font-semibold rounded-md
                               hover:bg-light-text/10 dark:hover:bg-dark-text/20"
                                        activeClassName="!text-color bg-light-text/5 dark:bg-dark-text/10"
                                        tabs={
                                            profileTabsDisplay.find((item) => item.title === 'Favorites')?.subTabs || []
                                        }
                                        activeTab={activeSubTabFavorite}
                                        setActiveTab={setActiveSubTabFavorite}
                                        renderTabContent={(subTab) => (
                                            <>
                                                {t(`components.tabs.${subTab.title}`)}{' '}
                                                {subTab.title === 'Posts' ? favoriteVideos.length : collections.length}
                                            </>
                                        )}
                                    />

                                    <Button
                                        className="lg:hidden ml-3.5 px-3 h-8 text-[15px] font-semibold"
                                        leftIcon={<CreateIcon />}
                                        onClick={() => setIsOpenModal(true)}
                                    >
                                        {t('components.button.Create')}
                                    </Button>

                                    {/* <Button
                               className="px-3 min-w-24 h-8 text-sm font-semibold"
                               onClick={() => {
                                   dispatch(resetCollections());
                                   setUnselectedVideos(
                                       favoriteVideos.map((video) => ({ ...video, isSelected: false })),
                                   );
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
                                                to={`${config.routes.myProfile}/collection/${collection.id}`}
                                                state={{
                                                    collectionId: collection.id,
                                                    collectionName: collection.collectionName,
                                                }}
                                                className={classNames(
                                                    'flex justify-center items-center',
                                                    'w-full aspect-[3/4] overflow-hidden rounded relative',
                                                    {
                                                        'bg-black/10 dark:bg-white/20':
                                                            collection.collectionVideos.length < 1,
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
                                    <EmptyState {...emptyStateData} onClickButton={() => setIsOpenModal(true)} />
                                )
                            ) : displayedVideos.length > 0 ? (
                                <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                                    {displayedVideos.map((item, index) => (
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
                </div>
            </div>
        </>
    );
};

export default Profile;
