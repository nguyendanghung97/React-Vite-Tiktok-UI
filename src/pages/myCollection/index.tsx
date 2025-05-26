import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './index.less';

import { CheckIcon, FavoriteCollectionIcon } from '~/assets/images/svgs';
import AddVideosModal from '~/components/modal/forms/addVideos';
import VideoPlayer from '~/components/video';
import config from '~/configs';
import { RootState } from '~/store';

import { addVideosToCollection, deleteCollection, removeVideosFromCollection } from '~/store/collections';
import ConfirmModal, { ConfirmModalConfig } from '~/components/modal/confirm';
import { useTranslation } from 'react-i18next';
import EmptyState from '~/components/emptyState';
import { increaseUncollectedVideos, reduceUncollectedVideos, VideoRemove } from '~/store/videos';
import useVideosSelection from '~/hooks/useVideosSelection';
import { toggleVideoProperty } from '~/utils';
import useToast from '~/contexts/toast/useToast';
import CollectionControlsBar from './controlsBar';

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
    const [confirmModalConfig, setConfirmModalConfig] = useState<ConfirmModalConfig | null>(null);
    const [isControlsDeleteVideos, setIsControlsDeleteVideos] = useState(false);
    const [collectionVideos, setCollectionVideos] = useState<VideoRemove[]>([]);

    const videosRemoved = useMemo(() => {
        return collectionVideos.filter((video) => video.isRemoved);
    }, [collectionVideos]);

    const selectedVideos = useMemo(() => {
        return videosToAddVideosModal.filter((video) => video.isSelected);
    }, [videosToAddVideosModal]);

    useEffect(() => {
        if (currentCollection) {
            setCollectionVideos(currentCollection.collectionVideos.map((video) => ({ ...video, isRemoved: false })));
        }
    }, [currentCollection]);

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

    const handleOpenAddVideosModal = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    const handleCloseAddVideosModal = () => {
        setIsOpenModal(false);
        setVideosToAddVideosModal((prev) => prev.map((video) => ({ ...video, isSelected: false })));
    };

    const handleSubmitAddVideosModal = () => {
        if (!collectionId) return;

        handleCloseAddVideosModal();

        if (selectedVideos.length > 0) {
            dispatch(addVideosToCollection({ id: collectionId, videos: selectedVideos }));
            dispatch(reduceUncollectedVideos(selectedVideos));
        }
    };

    const handleRemove = useCallback(async () => {
        if (!collectionId) return;
        // Hủy bỏ việc quản lý video
        handleCancelManageVideos();

        try {
            // Đợi các thao tác bất đồng bộ (nếu có)
            await dispatch(removeVideosFromCollection({ id: collectionId, videos: videosRemoved }));
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
    }, [collectionId, dispatch, openToast, t, videosRemoved]);

    const handleDeleteCollection = useCallback(() => {
        if (!collectionId) return;

        dispatch(deleteCollection(collectionId));
        dispatch(increaseUncollectedVideos(collectionVideos));

        navigate(config.routes.myProfile, {
            state: { myCollectionRedirectTab: 'Favorites', myCollectionRedirectSubTab: 'Collections' },
        });
    }, [collectionId, collectionVideos, dispatch, navigate]);

    // Mở modal remove video
    const openRemoveModal = () => {
        setConfirmModalConfig({
            // isOpenModal: true,
            title: t('components.modal.confirm.remove.Title', {
                length: videosRemoved.length,
                nameCollection: currentCollection?.collectionName,
            }),
            handleRemove: handleRemove,
        });
    };

    const openDeleteModal = () => {
        setConfirmModalConfig({
            // isOpenModal: true,
            title: t('components.modal.confirm.delete.Title', {
                nameCollection: currentCollection?.collectionName,
            }),
            handleDelete: handleDeleteCollection,
        });
    };

    // Đóng modal
    const closeConfirmModal = () => setConfirmModalConfig(null);

    if (!collectionId) return null;

    return (
        <>
            {isOpenModal && (
                <AddVideosModal
                    context="myCollection"
                    videosToAddVideosModal={videosToAddVideosModal}
                    setVideosToAddVideosModal={setVideosToAddVideosModal}
                    isOpenModal={isOpenModal}
                    selectedVideos={selectedVideos}
                    handleCloseModal={handleCloseAddVideosModal}
                    handleSubmit={handleSubmitAddVideosModal}
                />
            )}

            {confirmModalConfig && (
                <ConfirmModal
                    title={confirmModalConfig.title}
                    isOpenModal={true}
                    closeConfirmModal={closeConfirmModal}
                    handleDelete={confirmModalConfig.handleDelete}
                    handleRemove={confirmModalConfig.handleRemove}
                />
            )}

            <div className={classNames('px-6 pt-8 pb-9 h-[2000px] flex-1')}>
                <CollectionControlsBar
                    isControlsDeleteVideos={isControlsDeleteVideos}
                    setIsControlsDeleteVideos={setIsControlsDeleteVideos}
                    videosRemoved={videosRemoved}
                    onOpenAddVideosModal={handleOpenAddVideosModal}
                    openDeleteModal={openDeleteModal}
                    openRemoveModal={openRemoveModal}
                    handleCancelManageVideos={handleCancelManageVideos}
                    handleSelectAll={handleSelectAll}
                    // handleDeleteCollection={handleDeleteCollection}
                />

                <div className="min-h-[490px] flex flex-col">
                    {currentCollection!.collectionVideos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-4">
                            {collectionVideos?.map((collectionVideo, index: number) => {
                                // console.log('collectionVideo', collectionVideo);
                                return (
                                    <div
                                        key={collectionVideo.id}
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
                                                            'border-none text-white bg-primary':
                                                                collectionVideo.isRemoved,
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
        </>
    );
};

export default MyCollection;
