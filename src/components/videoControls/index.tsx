import { useState } from 'react';
import { Link } from 'react-router-dom';
import TooltipTippy from '@tippyjs/react';
import { Swiper as SwiperClass } from 'swiper';

import { ControlsProps } from '../video';
import classNames from 'classnames';
import {
    ElipsesIcon,
    MusicalIcon,
    MutedIcon,
    PauseIcon,
    PlayIcon,
    UnMuteIcon,
    ViewMiniFillIcon,
    ViewMiniIcon,
} from '~/assets/images/svgs';
import Slider from '../slider';
import ContentArticle from '../article/contentArticle';

import './index.less';
import { useTranslation } from 'react-i18next';
import Image from '../image';
import { IArticle } from '~/pages/home/dataHomePage';

const VideoPlayerControls = ({
    article,
    isPlaying,
    handlePlayPause,
    time,
    onChangeTime,
    isPiP,
    handleEnterPiP,
    handleExitPiP,
    isMuted,
    toggleMute,
    volume,
    onChangeVolume,
    swiperRef,
}: ExtendedControlsProps) => {
    const { t } = useTranslation();
    const [showSlider, setShowSlider] = useState(false);

    // Hàm chuyển đổi tiêu đề thành slug
    const createSlug = (title: string) => {
        return title
            .replace(/\s+/g, '-') // Thay thế dấu cách bằng dấu gạch ngang
            .replace(/-+/g, '-') // Xử lý nhiều dấu gạch ngang liên tiếp thành 1 dấu gạch ngang
            .replace(
                /[^\w\s-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/g,
                '',
            ); // Loại bỏ ký tự đặc biệt ngoài ký tự có dấu
    };

    return (
        <>
            <div
                className="group absolute z-0 inset-0 flex flex-col justify-between rounded-2xl overflow-hidden text-white cursor-pointer"
                onClick={handlePlayPause}
            >
                <div className="bg-gradient-top opacity-100 group-hover:opacity-100 transition-all ease duration-300 p-1 flex justify-between">
                    <button
                        className="relative w-10 h-10 flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                        }}
                        onMouseEnter={() => setShowSlider(true)}
                        onMouseLeave={() => setShowSlider(false)}
                    >
                        {isMuted ? <MutedIcon /> : <UnMuteIcon />}

                        <div
                            className={classNames(
                                'absolute left-full w-16 h-6 p-2 rounded-3xl bg-color/35 invisible opacity-0 transition-opacity ease duration-300',
                                {
                                    '!visible opacity-100': showSlider,
                                },
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Slider muted={isMuted} percentage={volume} onChange={onChangeVolume} />
                        </div>
                    </button>

                    <div
                        className="p-2 flex text-2xl"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ElipsesIcon />
                    </div>
                </div>

                <div className="max-h-custom pb-2 px-3 bg-gradient-bottom group-hover:p-3 transition-all ease duration-300 flex flex-col">
                    <div className="flex-1 overflow-hidden flex flex-col -mb-10 group-hover:mb-0 transition-all ease duration-300">
                        <div className="my-2 h-fit">
                            <Link to={`/profile/@${article.user.nickname}`}>
                                <h3 className="text-sm font-medium hover:underline">{article.user.nickname}</h3>
                            </Link>
                        </div>

                        <ContentArticle className="flex-1" swiperRef={swiperRef} article={article} />

                        <div className="h-fit mt-0.5 ml-0.5 flex items-center">
                            <span className="mr-1.5 text-sm">
                                <MusicalIcon />
                            </span>
                            <Link to={`/music/${createSlug(`Nhạc nền - ${article.user.full_name}`)}-Id`}>
                                <h4 className="text-sm font-normal line-clamp-1 hover:underline">
                                    {`${t('components.videoControls.Music')} - ${article.user.full_name}`}
                                    {/* Nhạc nền - {article.name} */}
                                </h4>
                            </Link>
                        </div>
                    </div>

                    <div className="h-10 -mx-2 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all ease duration-300">
                        <button
                            className="w-10 h-full flex items-center justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePlayPause();
                            }}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>

                        {/* Slider */}
                        <div
                            className="flex-1 px-3 h-4 flex items-center group-hover:mb-3 transition-all ease duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Slider time percentage={time} onChange={onChangeTime} />
                        </div>

                        <TooltipTippy
                            className="!text-sm"
                            placement="top"
                            offset={[-10, 0]}
                            content={t('components.tooltip.Floating Player')}
                            arrow={false}
                            disabled={isPiP} // Tắt tooltip khi isPiP = true
                        >
                            <button
                                className="text-xl w-10 h-10 flex items-center justify-center"
                                onClick={(e) => handleEnterPiP!(e)}
                            >
                                <ViewMiniIcon />
                            </button>
                        </TooltipTippy>
                    </div>
                </div>
            </div>
            {isPiP && (
                <div
                    className={classNames(
                        'absolute z-10 inset-0 flex items-center invisible opacity-0 transition-opacity ease-in duration-300',
                        {
                            '!visible opacity-100': isPiP,
                        },
                    )}
                >
                    <div className={classNames('absolute inset-0 scale-110 blur-sm')}>
                        <Image className="!rounded-none" src={article.video.thumbnail} alt="Girl" />
                    </div>
                    <div className="w-full relative z-50 flex flex-col items-center">
                        <div className="mb-6 text-4xl text-white/90 flex items-center justify-center">
                            <ViewMiniFillIcon />
                        </div>
                        <p className="mb-4 text-base text-white/90 font-semibold text-center">
                            {t('components.videoControls.PiP.Title')}
                        </p>
                        <button
                            className="px-3 py-0.5 h-9 text-sm text-white/90 hover:text-white/75 font-semibold bg-white/15 hover:bg-white/5 border border-white border-opacity-10 hover:border-opacity-5 rounded-sm"
                            onClick={handleExitPiP}
                        >
                            {t('components.videoControls.PiP.Turn Off')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

interface ExtendedControlsProps extends ControlsProps {
    article: IArticle;
    isMuted: boolean;
    volume: number;
    toggleMute: () => void;
    onChangeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
    swiperRef: React.MutableRefObject<SwiperClass | null>;
}

export default VideoPlayerControls;
