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
import useToast from '~/contexts/toast/useToast';

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
    const { openToast } = useToast();
    const { t } = useTranslation();

    const handleSelect = (index: number) => {
        toggleVideoProperty(setVideosToAddVideosModal, index, 'isSelected');
    };

    return (
        <ModalWrapper isOpen={isOpenModal} onClose={handleCloseModal}>
            <form
                // w-dvw (Dynamic Viewport Width) giúp modal luôn có chiều rộng bằng với viewport, nhưng không vượt quá max-w-80.
                // khi thêm w-dvw, modal luôn mở rộng đến max-w nếu màn hình đủ lớn.

                // h-[calc(100vh-5rem)]
                className="max-w-[480px] sm:w-dvw aspect-[3/4] flex flex-col"
                onSubmit={async (e) => {
                    e.preventDefault();
                    // const formData = new FormData(e.currentTarget);
                    // const selectedVideoIds = formData.getAll('selectedVideos'); // getAll vì checkbox nhiều

                    // console.log('IDs được chọn:', typeof selectedVideoIds[0]);
                    // const selectedVideosOke = videosToAddVideosModal.filter(
                    //     (video) => selectedVideoIds.includes(String(video.id)), // So sánh id đã chọn với các video trong mảng
                    // );

                    // console.log('Các video đã chọn:', selectedVideosOke);

                    // const selectedVideos = videosList.filter((video) => selectedVideoIds.includes(String(video.id)));

                    if (context === 'myCollection' && selectedVideos.length < 1) {
                        handleCloseModal();
                        return;
                    } else {
                        await handleSubmit();
                        // Chờ submit xong mới hiện toast message
                        openToast({
                            type: 'success',
                            position: 'center',
                            message:
                                selectedVideos.length > 0
                                    ? t(`components.toast.Add videos`, {
                                          count: selectedVideos.length,
                                      })
                                    : t('components.toast.Collection created successfully'),
                            // duration: 1000,
                        });
                    }
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
                                                    name="selectedVideos" // name giống nhau => getAll sẽ gom lại
                                                    checked={video.isSelected}
                                                    onChange={() => handleSelect(index)}
                                                    type="checkbox"
                                                    className="appearance-none absolute inset-0"
                                                    value={video.id}
                                                    // readOnly
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
    context: 'myCollection' | 'profile';
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
