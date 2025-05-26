import classNames from 'classnames';
import React, { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react';

const VideoPlayer = forwardRef<HTMLVideoElement, Type>(
    (
        {
            // posterVideo: mobile không tự động phát video để tối ưu dung lượng phải thêm nó để fix giao diện hiển thị khi video chưa load
            posterVideo,
            controls,
            src,
            isMuted,
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
        // const [time, setTime] = useState(0);
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
            const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
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
                    // document.hasFocus(): play đúng video đang focus
                    try {
                        await videoElement.play();
                        console.log('Video đã phát lại khi user trở lại trình duyệt.');
                    } catch (err) {
                        console.error('❌ Lỗi khi play video:', err);
                    }
                }
            };

            if (isMobile) {
                window.addEventListener('blur', handleBlur);
                window.addEventListener('focus', handleFocus);
            }

            // Gắn các sự kiện cho video
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);

            // Cleanup sự kiện khi component unmount
            return () => {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);

                if (isMobile) {
                    window.removeEventListener('blur', handleBlur);
                    window.removeEventListener('focus', handleFocus);
                }
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

        // const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        //     videoElement!.currentTime = (videoElement!.duration / 100) * parseFloat(e.target.value);
        //     setTime!(parseFloat(e.target.value));
        // };

        // const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        //     // console.log('duration', e.currentTarget.duration);
        //     const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);

        //     setTime!(+percent);
        // };

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

        console.log('VideoPlayer Re-render');

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
                    muted={controls ? isMuted : true}
                    // onTimeUpdate={handleTimeUpdate}
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
                        // time,
                        // handleChangeTime,
                    })}
            </div>
        );
    },
);

export type LocalVideoControls = {
    isPlaying: boolean;
    handlePlayPause: () => void;
    // time?: number;
    // handleChangeTime?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type Type = {
    className?: string;
    src: string; // Đường dẫn của video
    imgCover?: string;
    controls?: (props: LocalVideoControls) => React.ReactNode; // Hàm controls trả về JSX
    onMouseEnter?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    posterVideo?: string;
    hoverPlay?: boolean;
    thumbnail?: string;
    isMuted?: boolean;
};

export default React.memo(VideoPlayer);
