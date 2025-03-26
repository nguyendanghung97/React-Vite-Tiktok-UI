import classNames from 'classnames';
import React, { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react';

const VideoPlayer = forwardRef<HTMLVideoElement, Type>(
    (
        {
            isPiP,
            setIsPiP,
            handleEnterPiP,
            handleExitPiP,
            // posterVideo: mobile không tự động phát video để tối ưu dung lượng phải thêm nó để fix giao diện hiển thị khi video chưa load
            posterVideo,
            controls,
            src,
            muted,
            className,
            hoverPlay,
            thumbnail,
            onMouseEnter,
            onMouseLeave,
            ...passProps
        },
        ref,
    ) => {
        const localVideoRef = useRef<HTMLVideoElement>(null);
        const videoElement = localVideoRef.current;
        // const video = videoRef.current;

        const [isPlaying, setIsPlaying] = useState(true);
        const [time, setTime] = useState(0);
        // s
        // const [isPiP, setIsPiP] = useState(false);
        const [showPoster, setShowPoster] = useState(true);

        // useEffect giúp đồng bộ ref từ cha xuống localVideoRef để tránh lỗi.
        useEffect(() => {
            if (typeof ref === 'function') {
                ref(localVideoRef.current);
            } else if (ref) {
                ref.current = localVideoRef.current;
            }
        }, [ref]);

        // Lắng nghe các sự kiện ở chế độ PiP để cập nhật ở chế độ thường
        useEffect(() => {
            const videoElement = localVideoRef.current;
            if (!videoElement) return;

            // Hàm xử lý khi video play
            const handlePlay = () => {
                setIsPlaying(true);
            };

            // Hàm xử lý khi video pause
            const handlePause = () => {
                setIsPlaying(false);
            };

            // Hàm xử lý khi vào chế độ PiP
            const handleEnterPiP = () => {
                setIsPiP!(true);
            };

            // Hàm xử lý khi thoát khỏi chế độ PiP
            const handleExitPiP = () => {
                setIsPiP!(false);
            };

            // Pause video khi user rời khỏi trình duyệt
            const handleBlur = async () => {
                if (document.pictureInPictureElement === videoElement) {
                    try {
                        await videoElement.pause();
                        console.log('⏸ Video đã tạm dừng do user rời khỏi trình duyệt.');
                    } catch (err) {
                        console.error('❌ Lỗi khi pause video:', err);
                    }
                }
            };

            // Resume video khi user quay lại
            const handleFocus = async () => {
                // User quay lại trình duyệt
                if (document.pictureInPictureElement === videoElement && document.hasFocus()) {
                    try {
                        await videoElement.play();
                        console.log('⏸ Video đã phát lại khi user trở lại trình duyệt.');
                    } catch (err) {
                        console.error('❌ Lỗi khi play video:', err);
                    }
                }
            };

            // Dùng blur để lắng nghe sự kiện khi thoát khỏi trình duyệt
            window.addEventListener('blur', handleBlur);
            // Dùng blur để lắng nghe sự kiện khi trở lại trình duyệt
            window.addEventListener('focus', handleFocus);
            // Gắn các sự kiện cho video
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);
            videoElement.addEventListener('enterpictureinpicture', handleEnterPiP);
            videoElement.addEventListener('leavepictureinpicture', handleExitPiP);

            // Cleanup sự kiện khi component unmount
            return () => {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);
                videoElement.removeEventListener('enterpictureinpicture', handleEnterPiP);
                videoElement.removeEventListener('leavepictureinpicture', handleExitPiP);
                window.removeEventListener('blur', handleBlur);
                window.removeEventListener('focus', handleFocus);
            };
        }, []);

        const handlePlayPause = () => {
            if (isPlaying) {
                videoElement!.pause();
            } else {
                videoElement!.play();
            }
            setIsPlaying((prev) => !prev);
        };

        const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
            videoElement!.currentTime = (videoElement!.duration / 100) * parseFloat(e.target.value);
            setTime!(parseFloat(e.target.value));
        };

        const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
            // console.log('duration', e.currentTarget.duration);
            const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);

            setTime!(+percent);
        };

        const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
            const video = e.currentTarget;
            video.currentTime = 0; // Đặt lại thời gian về 0
            video.play(); // Phát lại video
        };

        // const handleEnterPiP = (e: React.MouseEvent<HTMLButtonElement>) => {
        //     e.stopPropagation();
        //     videoElement!.requestPictureInPicture();
        //     setIsPiP(true);
        // };

        // const handleExitPiP = () => {
        //     if (document.pictureInPictureElement) {
        //         document.exitPictureInPicture();
        //         setIsPiP(false);
        //     }
        // };

        const handleMouseEnter = (e: MouseEvent<HTMLVideoElement>) => {
            e.currentTarget.play();
            setShowPoster(false);
        };

        const handleMouseLeave = (e: MouseEvent<HTMLVideoElement>) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0; // Đặt lại video về đầu khi rời chuột};
            setShowPoster(true);
        };

        return (
            <div
                className={classNames(
                    'relative z-0',
                    'h-full w-full overflow-hidden',
                    {
                        rounded: !controls,
                        'rounded-2xl': controls,
                    },
                    className,
                )}
                {...passProps}
            >
                <div
                    className={classNames(
                        'absolute bottom-0 top-3/4 left-0 right-0 bg-gradient-to-b from-light-text/0 to-light-text/50',
                        {
                            rounded: !controls,
                            'rounded-2xl': controls,
                        },
                    )}
                ></div>

                <video
                    playsInline // Phát video trong giao diện web thay vì toàn màn hình
                    // preload="auto" // Giúp trình duyệt tải trước video
                    poster={posterVideo}
                    className={classNames('h-full w-full object-cover', {
                        'relative z-10': hoverPlay,
                        rounded: !controls,
                        'rounded-2xl': controls,
                    })}
                    ref={localVideoRef}
                    src={src}
                    muted={controls ? muted : true}
                    onTimeUpdate={onTimeUpdate}
                    onEnded={(e) => handleEnded(e)}
                    onMouseEnter={!hoverPlay ? onMouseEnter : handleMouseEnter}
                    onMouseLeave={hoverPlay ? handleMouseLeave : onMouseLeave}
                />
                {hoverPlay && showPoster && (
                    <img src={thumbnail} alt="Thumbnail" className="absolute inset-0 z-0 w-full h-full object-cover" />
                )}
                {controls &&
                    controls({
                        isPlaying,
                        handlePlayPause,
                        time,
                        onChangeTime,
                        onTimeUpdate,
                        isPiP,
                        // setIsPiP,
                        handleEnterPiP,
                        handleExitPiP,
                    })}
            </div>
        );
    },
);

export interface ControlsProps {
    isPlaying: boolean;
    handlePlayPause: () => void;
    time: number;
    onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    handleEnterPiP?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleExitPiP?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPiP?: boolean;
    setIsPiP?: React.Dispatch<React.SetStateAction<boolean>>;
}

type Type = {
    className?: string;
    src: string; // Đường dẫn của video
    imgCover?: string;
    muted?: boolean;
    controls?: (props: ControlsProps) => React.ReactNode; // Hàm controls trả về JSX
    onMouseEnter?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    posterVideo?: string;
    hoverPlay?: boolean;
    thumbnail?: string;
    handleEnterPiP?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleExitPiP?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPiP?: boolean;
    setIsPiP?: React.Dispatch<React.SetStateAction<boolean>>;
    time?: number;
    setTime?: React.Dispatch<React.SetStateAction<number>>;
};

export default VideoPlayer;
