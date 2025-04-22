import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './index.less';

import {
    CheckIcon,
    ElipsesIcon,
    FavoriteCollectionIcon,
    LockIcon,
    PlusRoundedIcon,
    ShareOutlineIcon,
} from '~/assets/images/svgs';
import Avatar from '~/components/avatar';
import Button from '~/components/button';
import AddVideosModal from '~/components/modal/forms/addVideos';
import VideoPlayer from '~/components/video';
import config from '~/configs';
import { RootState } from '~/store';

import { addVideosToCollection, deleteCollection, removeVideosFromCollection } from '~/store/collections';
import CollectionActions from '~/components/popper/menu/collectionActions';
import ConfirmModal from '~/components/modal/confirm';
import { useTranslation } from 'react-i18next';
import EmptyState from '~/components/emptyState';
import { increaseUncollectedVideos, reduceUncollectedVideos, VideoRemove, VideoSelect } from '~/store/videos';
import useVideosSelection from '~/hooks/useVideosSelection';
import { toggleVideoProperty } from '~/utils';
import useToast from '~/contexts/toast/useToast';

const MyCollection = () => {
    const { openToast } = useToast();
    const navigate = useNavigate(); // Sử dụng để điều hướng
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Dùng useParams() để lấy ra collectionId từ URL
    // Thay vì dùng state được truyền từ navigate khi reload sẽ bị reset
    // const { collectionId } = location.state || {}; // Lấy id từ state của the Link
    const { collectionId } = useParams();

    const collections = useSelector((state: RootState) => state.collections.collections);
    // console.log('collections', collections);
    const currentCollection = collections.find((collection) => collection.id === collectionId);
    // console.log('currentCollection', currentCollection);

    const { videosToAddVideosModal, setVideosToAddVideosModal } = useVideosSelection();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const [unselectedVideos, setUnselectedVideos] = useState<VideoSelect[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<VideoSelect[]>([]);
    const [isChecked, setIsChecked] = useState(currentCollection!.isPublic);
    const [isControlsDeleteVideos, setIsControlsDeleteVideos] = useState(false);

    const [collectionVideos, setCollectionVideos] = useState<VideoRemove[]>(
        currentCollection!.collectionVideos.map((video) => ({ ...video, isRemoved: false })),
    );
    // console.log('collectionVideos', collectionVideos);
    const [videosRemoved, setVideosRemoved] = useState<any>([]);
    // console.log('videosRemoved', videosRemoved);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    useEffect(() => {
        setVideosRemoved(collectionVideos.filter((video) => video.isRemoved));
    }, [collectionVideos]);

    useEffect(() => {
        setCollectionVideos(currentCollection!.collectionVideos.map((video) => ({ ...video, isRemoved: false })));
    }, [currentCollection]);

    useEffect(() => {
        setSelectedVideos(videosToAddVideosModal.filter((video) => video.isSelected));
    }, [videosToAddVideosModal]);

    const handleManageVideos = () => {
        setIsControlsDeleteVideos(true);
    };

    const handleCancelManageVideos = () => {
        setIsControlsDeleteVideos(false);
        setCollectionVideos((prev) => prev?.map((video) => ({ ...video, isRemoved: false })));
    };

    const handleSelect = (index: number) => {
        if (isControlsDeleteVideos) {
            toggleVideoProperty(setCollectionVideos, index, 'isRemoved');
        }
    };

    const handleSelectAll = () => {
        setCollectionVideos((prev) => prev.map((video) => ({ ...video, isRemoved: true })));
    };

    const handleRemove = async () => {
        // Đóng modal xác nhận
        setIsOpenConfirmModal(false);

        // Hủy bỏ việc quản lý video
        handleCancelManageVideos();

        try {
            // Đợi các thao tác bất đồng bộ (nếu có)
            await dispatch(removeVideosFromCollection({ id: collectionId!, videos: videosRemoved }));
            await dispatch(increaseUncollectedVideos(videosRemoved));

            // Sau khi dispatch thành công, hiển thị toast
            openToast({
                type: 'success',
                position: 'center',
                message: t('components.toast.Remove video', {
                    count: videosRemoved.length,
                }),
                // duration: 1000,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Có lỗi xảy ra khi xử lý video:', error);
        }
    };

    const handleDeleteCollection = () => {
        dispatch(deleteCollection(collectionId!));
        dispatch(increaseUncollectedVideos(collectionVideos));

        navigate(config.routes.myProfile, {
            state: { myCollectionRedirectTab: 'Favorites', myCollectionRedirectSubTab: 'Collections' },
        });
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setVideosToAddVideosModal((prev) => prev.map((video) => ({ ...video, isSelected: false })));
    };

    const handleSubmitAddVideosModal = () => {
        handleCloseModal();

        if (selectedVideos.length > 0) {
            dispatch(addVideosToCollection({ id: collectionId!, videos: selectedVideos }));
            dispatch(reduceUncollectedVideos(selectedVideos));
        }
    };

    return (
        <div className={classNames('px-6 pt-8 pb-9 h-[2000px] flex-1')}>
            <div
                className={classNames('h-16 mb-5', {
                    'sticky z-20 top-24 bg-light-bg dark:bg-dark-bg': isControlsDeleteVideos,
                })}
            >
                {!isControlsDeleteVideos ? (
                    <div className="h-full flex items-center justify-between">
                        <div className="h-full flex items-center sm:gap-x-5">
                            <Avatar className="shrink-0 h-full aspect-square" />
                            <div className="flex flex-col justify-center">
                                <h1 className="text-2xl font-bold mb-1 line-clamp-1 break-all">
                                    {currentCollection?.collectionName}
                                </h1>
                                <h2 className="inline-flex items-center gap-x-1 text-sm !opacity-50 line-clamp-1 break-all">
                                    {!currentCollection?.isPublic && (
                                        <span className="text-xs">
                                            <LockIcon />
                                        </span>
                                    )}
                                    <span className="line-clamp-1">
                                        {currentCollection?.collectionVideos.length} {t('pages.myCollection.Videos')}
                                    </span>
                                </h2>
                                <h2 className="flex items-center gap-x-1">
                                    <span className="text-sm !opacity-50 line-clamp-1 break-all">
                                        {t('pages.myCollection.Created by')}
                                    </span>
                                    <Link
                                        to={config.routes.myProfile}
                                        className="text-xs font-semibold hover:underline line-clamp-1 break-all"
                                        state={{
                                            myCollectionRedirectTab: 'Favorites',
                                            myCollectionRedirectSubTab: 'Posts',
                                        }}
                                    >
                                        Đăng Hùng
                                    </Link>
                                    {/* <div
                                        onClick={() => {
                                            navigate(config.routes.myProfile, {
                                                state: {
                                                    myCollectionRedirectTab: 'Favorites',
                                                    myCollectionRedirectSubTab: 'Posts',
                                                },
                                            });
                                        }}
                                        className="text-xs font-semibold hover:underline line-clamp-1 break-all"
                                    >
                                        Đăng Hùng
                                    </div> */}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2 md:gap-x-4">
                            <Button
                                primary
                                className="px-4 h-10 text-base font-semibold"
                                leftIcon={<PlusRoundedIcon />}
                                onClick={() => setIsOpenModal(true)}
                            >
                                {t('components.button.Add Videos')}
                            </Button>
                            {isOpenModal && (
                                <AddVideosModal
                                    context="myCollection"
                                    videosToAddVideosModal={videosToAddVideosModal}
                                    setVideosToAddVideosModal={setVideosToAddVideosModal}
                                    isOpenModal={isOpenModal}
                                    selectedVideos={selectedVideos}
                                    // setSelectedVideos={setSelectedVideos}
                                    handleCloseModal={handleCloseModal}
                                    handleSubmit={handleSubmitAddVideosModal}
                                />
                            )}

                            {currentCollection!.collectionVideos.length > 0 && (
                                <Button
                                    className="px-4 h-10 text-base font-semibold"
                                    onClick={handleManageVideos}
                                    // onClick={() => setIsControlsDeleteVideos(true)}
                                >
                                    {t('components.button.Manage videos')}
                                </Button>
                            )}

                            <Button className="shrink-0 w-10 h-10" leftIcon={<ShareOutlineIcon />}></Button>

                            <CollectionActions
                                collectionId={collectionId!}
                                isOpenMenu={isOpenMenu}
                                setIsOpenMenu={setIsOpenMenu}
                                isChecked={isChecked}
                                setIsChecked={setIsChecked}
                                handleDeleteCollection={handleDeleteCollection}
                            >
                                <Button
                                    // active:bg-light-text/5 màu khi nhấn chuột
                                    className={classNames(
                                        'shrink-0 w-10 h-10 active:bg-light-text/5 active:dark:bg-dark-text/10',
                                        {
                                            'bg-light-text/10 dark:bg-dark-text/20': isOpenMenu,
                                        },
                                    )} // Màu nền khi nhấn chuột
                                    leftIcon={<ElipsesIcon />}
                                    onClick={() => setIsOpenMenu((prev) => !prev)}
                                ></Button>
                            </CollectionActions>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-between">
                        <div className="flex gap-x-4">
                            <Button
                                primary={videosRemoved.length > 0}
                                disabled={videosRemoved.length < 1}
                                className="px-4 h-10 text-base font-semibold"
                                onClick={() => {
                                    setIsOpenConfirmModal(true);
                                }}
                            >
                                {`${t('components.button.Remove')} ${
                                    videosRemoved.length > 0 ? `(${videosRemoved.length})` : ''
                                }`}
                            </Button>
                            {isOpenConfirmModal && (
                                <ConfirmModal
                                    title={t('components.modal.confirm.remove.Title', {
                                        length: videosRemoved.length,
                                        nameCollection: currentCollection?.collectionName,
                                    })}
                                    isOpenModal={isOpenConfirmModal}
                                    setIsOpenModal={setIsOpenConfirmModal}
                                    handleRemove={handleRemove}
                                />
                            )}

                            <Button className="px-4 h-10 text-base font-semibold" onClick={handleSelectAll}>
                                {t('components.button.Select All')}
                            </Button>
                        </div>
                        <Button
                            className="ml-3 px-4 h-10 text-base font-semibold"
                            onClick={() => {
                                handleCancelManageVideos();
                            }}
                        >
                            {t('components.button.Cancel')}
                        </Button>
                    </div>
                )}
            </div>

            <div className="min-h-[490px] flex flex-col">
                {collectionVideos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4">
                        {collectionVideos?.map((collectionVideo, index: number) => {
                            // console.log('collectionVideo', collectionVideo);
                            return (
                                <div
                                    key={index}
                                    className="aspect-[3/4] rounded overflow-hidden relative"
                                    onClick={() => handleSelect(index)}
                                >
                                    <VideoPlayer
                                        hoverPlay
                                        src={collectionVideo.url}
                                        posterVideo={collectionVideo.thumbnail}
                                    />
                                    {isControlsDeleteVideos && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-transparent">
                                            <input
                                                checked={collectionVideo.isRemoved}
                                                type="checkbox"
                                                className="appearance-none absolute inset-0"
                                                readOnly
                                            />
                                            <div
                                                className={classNames(
                                                    'flex justify-center items-center w-full h-full text-sm rounded-full',
                                                    {
                                                        'border-none text-white bg-primary': collectionVideo.isRemoved,
                                                        'border-2': !collectionVideo.isRemoved,
                                                    },
                                                )}
                                            >
                                                {' '}
                                                {collectionVideo.isRemoved && <CheckIcon />}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        icon={<FavoriteCollectionIcon fontSize={72} />}
                        title={t('pages.myCollection.empty.Title')}
                        description={t('pages.myCollection.empty.Desc')}
                        textButton="Add Videos"
                        onClickButton={() => setIsOpenModal(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default MyCollection;
