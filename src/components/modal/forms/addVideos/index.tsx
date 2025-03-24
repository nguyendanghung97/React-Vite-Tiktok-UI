import classNames from 'classnames';

import { BackArrowIcon, CheckIcon, CloseIcon, FavoriteCollectionIcon } from '~/assets/images/svgs';
import ModalWrapper from '../..';
import Button from '~/components/button';

import './index.less';
import { useTranslation } from 'react-i18next';
import EmptyState from '~/components/emptyState';
import VideoPlayer from '~/components/video';
import { VideoSelect } from '~/store/videos';
import { toggleVideoProperty } from '~/utils';

const AddVideosModal = ({
    context,
    isOpenModal,
    videosToAddVideosModal,
    setVideosToAddVideosModal,
    selectedVideos,
    handleBackModal,
    handleCloseModal,
    handleSubmit,
}: Type) => {
    const { t } = useTranslation();
    // Hàm toggle trạng thái isSelected
    // const handleSelect = (index: number) => {
    //     setVideosToAddVideosModal!((prevVideos) =>
    //         prevVideos.map((video, i) => (i === index ? { ...video, isSelected: !video.isSelected } : video)),
    //     );
    // };

    const handleSelect = (index: number) => {
        toggleVideoProperty(setVideosToAddVideosModal, index, 'isSelected');
    };

    // // Hàm để toggle trạng thái select video
    // const handleSelect = (index: number) => {
    //     // Update trạng thái isSelected cho videos
    //     const updatedVideos = [...videos];
    //     updatedVideos[index].isSelected = !updatedVideos[index].isSelected;
    //     setSelectedVideos(updatedVideos.filter((video) => video.isSelected));
    // };

    return (
        <ModalWrapper isOpen={isOpenModal} onClose={handleCloseModal}>
            <form
                // w-dvw (Dynamic Viewport Width) giúp modal luôn có chiều rộng bằng với viewport, nhưng không vượt quá max-w-80.
                // khi thêm w-dvw, modal luôn mở rộng đến max-w nếu màn hình đủ lớn.

                // h-[calc(100vh-5rem)]
                className="max-w-[480px] sm:w-dvw aspect-[3/4] flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="px-2 pt-2 pb-1 flex items-center justify-between">
                    {handleBackModal ? (
                        <button type="button" className="w-11 h-11 text-2xl justify-center" onClick={handleBackModal}>
                            <span className="w-full flex items-center justify-center">
                                <BackArrowIcon />
                            </span>
                        </button>
                    ) : (
                        <div className="w-11"></div>
                    )}

                    <h2 className="text-[17px] font-bold line-clamp-1 break-all">
                        {t('components.modal.forms.addVideos.Title')}
                    </h2>
                    <button type="button" className="w-11 h-11 text-2xl justify-center" onClick={handleCloseModal}>
                        <span className="w-full flex items-center justify-center">
                            <CloseIcon />
                        </span>
                    </button>
                </div>

                <div className="flex-1 px-3 pb-6 flex flex-col gap-y-6 overflow-hidden">
                    <div className="flex-1 overflow-y-auto scroll-addVideos">
                        {videosToAddVideosModal.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {videosToAddVideosModal.map((video, index) => {
                                    // console.log('video', video);
                                    return (
                                        <div
                                            key={index}
                                            className="relative aspect-[3/4] shadow-inner rounded overflow-hidden"
                                            onClick={() => handleSelect(index)}
                                        >
                                            <VideoPlayer hoverPlay thumbnail={video.thumbnail} src={video.url} />
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-transparent">
                                                <input
                                                    checked={video.isSelected}
                                                    type="checkbox"
                                                    className="appearance-none absolute inset-0"
                                                    readOnly
                                                />
                                                <div
                                                    className={classNames(
                                                        'flex justify-center items-center w-full h-full text-sm rounded-full',
                                                        {
                                                            'border-none text-white bg-primary': video.isSelected,
                                                            'border-2': !video.isSelected,
                                                        },
                                                    )}
                                                >
                                                    {' '}
                                                    {video.isSelected && <CheckIcon />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <EmptyState
                                icon={<FavoriteCollectionIcon fontSize={72} />}
                                title={t('components.modal.forms.addVideos.empty.Title')}
                                description={t('components.modal.forms.addVideos.empty.Desc')}
                            />
                        )}
                    </div>
                    {/* <div className="flex-1 overflow-hidden">
                        {videos.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {videos.map((video, index) => {
                                    // console.log('video', video);
                                    return (
                                        <div
                                            key={index}
                                            className="relative aspect-[3/4] shadow-inner rounded overflow-hidden"
                                            onClick={() => handleSelect(index)}
                                        >
                                            <VideoPlayer src={video.video} />
                                            <div className="absolute top-2 right-2 w-5 h-5">
                                                <input
                                                    checked={video.isSelected}
                                                    type="checkbox"
                                                    className="appearance-none absolute inset-0"
                                                    readOnly
                                                />
                                                <div
                                                    className={classNames(
                                                        'flex justify-center items-center w-full h-full text-sm rounded-full',
                                                        {
                                                            'border-none text-white bg-primary': video.isSelected,
                                                            'border-2': !video.isSelected,
                                                        },
                                                    )}
                                                >
                                                    {' '}
                                                    {video.isSelected && <CheckIcon />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <EmptyState
                                icon={<FavoriteCollectionIcon fontSize={72} />}
                                title={t('components.modal.forms.addVideos.empty.Title')}
                                description={t('components.modal.forms.addVideos.empty.Desc')}
                            />
                        )}
                    </div> */}
                    <Button
                        primary={
                            context === 'myCollection' ? videosToAddVideosModal.length > 0 : selectedVideos.length > 0
                        }
                        disabled={
                            context === 'myCollection' && selectedVideos.length < 1 && videosToAddVideosModal.length > 0
                        }
                        className="shrink-0 mx-3 h-10 text-base font-semibold"
                    >
                        <span className="w-full justify-center">
                            {context === 'myCollection'
                                ? videosToAddVideosModal.length > 0
                                    ? `${t('components.button.Add Videos')} (${selectedVideos.length})`
                                    : t('components.button.Close')
                                : selectedVideos.length > 0
                                ? `${t('components.button.Add Videos')} (${selectedVideos.length})`
                                : t('components.button.Done')}
                        </span>
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    );
};

type Type = {
    context: string;
    isOpenModal: boolean;
    videosToAddVideosModal: VideoSelect[];
    setVideosToAddVideosModal: React.Dispatch<React.SetStateAction<VideoSelect[]>>;
    selectedVideos: VideoSelect[];
    // setSelectedVideos?: React.Dispatch<React.SetStateAction<VideoSelect[]>>;
    handleBackModal?: () => void;
    handleCloseModal: () => void;
    handleSubmit: () => void;
};

export default AddVideosModal;
