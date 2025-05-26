import React, { useState } from 'react';
import InfoCollection from '../infoCollection';
import Button from '~/components/button';
import { ElipsesIcon, PlusRoundedIcon, ShareOutlineIcon } from '~/assets/images/svgs';
import CollectionActions from '~/components/popper/menu/collectionActions';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootState } from '~/store';
import { useSelector } from 'react-redux';
import { VideoRemove } from '~/store/videos';

const CollectionControlsBar = ({
    isControlsDeleteVideos,
    setIsControlsDeleteVideos,
    videosRemoved,
    onOpenAddVideosModal,
    openDeleteModal,
    openRemoveModal,
    handleCancelManageVideos,
    handleSelectAll,
}: // handleDeleteCollection,
Type) => {
    const { t } = useTranslation();
    const { collectionId } = useParams();
    console.log('CollectionControlsBar Re-render');
    const collections = useSelector((state: RootState) => state.collections.collections);
    // console.log('collections', collections);
    const currentCollection = collections.find((collection) => collection.id === collectionId);

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    return (
        <div
            className={classNames('h-16 mb-5', {
                'sticky z-20 top-24 bg-light-bg dark:bg-dark-bg': isControlsDeleteVideos,
            })}
        >
            {!isControlsDeleteVideos ? (
                <div className="h-full flex items-center justify-between">
                    <InfoCollection collectionId={collectionId!} />

                    <div className="flex items-center gap-x-2 md:gap-x-4">
                        <Button
                            primary
                            className="px-4 h-10 text-base font-semibold"
                            leftIcon={<PlusRoundedIcon />}
                            onClick={onOpenAddVideosModal}
                        >
                            {t('components.button.Add Videos')}
                        </Button>

                        {currentCollection!.collectionVideos.length > 0 && (
                            <Button
                                className="px-4 h-10 text-base font-semibold"
                                onClick={() => setIsControlsDeleteVideos(true)}
                            >
                                {t('components.button.Manage videos')}
                            </Button>
                        )}

                        <Button className="shrink-0 w-10 h-10" leftIcon={<ShareOutlineIcon />}></Button>

                        <CollectionActions
                            collectionId={collectionId!}
                            isOpenMenu={isOpenMenu}
                            setIsOpenMenu={setIsOpenMenu}
                            // handleDeleteCollection={handleDeleteCollection}
                            openDeleteModal={openDeleteModal}
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
                            onClick={openRemoveModal}
                        >
                            {`${t('components.button.Remove')} ${
                                videosRemoved.length > 0 ? `(${videosRemoved.length})` : ''
                            }`}
                        </Button>

                        <Button className="px-4 h-10 text-base font-semibold" onClick={handleSelectAll}>
                            {t('components.button.Select All')}
                        </Button>
                    </div>
                    <Button className="ml-3 px-4 h-10 text-base font-semibold" onClick={handleCancelManageVideos}>
                        {t('components.button.Cancel')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default React.memo(CollectionControlsBar);

type Type = {
    isControlsDeleteVideos: boolean;
    setIsControlsDeleteVideos: React.Dispatch<React.SetStateAction<boolean>>;
    videosRemoved: VideoRemove[];
    onOpenAddVideosModal: () => void;
    // handleDeleteCollection: () => void;
    openDeleteModal: () => void;
    openRemoveModal: () => void;
    handleCancelManageVideos: () => void;
    handleSelectAll: () => void;
};
