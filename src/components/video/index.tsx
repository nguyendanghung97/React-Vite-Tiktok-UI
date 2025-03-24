import classNames from 'classnames';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

const VideoPlayer: React.FC<Type> = ({
    // posterVideo: mobile không tự động phát video để tối ưu dung lượng phải thêm nó để fix giao diện hiển thị khi video chưa load
    posterVideo,
    controls,
    src,
    muted,
    index,
    className,
    hoverPlay,
    thumbnail,
    onMouseEnter,
    onMouseLeave,
    ...passProps
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const video = videoRef.current;

    const [isPlaying, setIsPlaying] = useState(true);
    const [time, setTime] = useState(0);
    const [isPiP, setIsPiP] = useState(false);
    const [showPoster, setShowPoster] = useState(true);

    useEffect(() => {
        const videoElement = videoRef.current;

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
            setIsPiP(true);
        };

        // Hàm xử lý khi thoát khỏi chế độ PiP
        const handleExitPiP = () => {
            setIsPiP(false);
        };

        // Gắn các sự kiện cho video
        videoElement!.addEventListener('play', handlePlay);
        videoElement!.addEventListener('pause', handlePause);
        videoElement!.addEventListener('enterpictureinpicture', handleEnterPiP);
        videoElement!.addEventListener('leavepictureinpicture', handleExitPiP);

        // Cleanup sự kiện khi component unmount
        return () => {
            videoElement!.removeEventListener('play', handlePlay);
            videoElement!.removeEventListener('pause', handlePause);
            videoElement!.removeEventListener('enterpictureinpicture', handleEnterPiP);
            videoElement!.removeEventListener('leavepictureinpicture', handleExitPiP);
        };
    }, []);

    const handlePlayPause = () => {
        if (isPlaying) {
            video!.pause();
        } else {
            video!.play();
        }
        setIsPlaying((prev) => !prev);
    };

    const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        video!.currentTime = (video!.duration / 100) * parseFloat(e.target.value);
        setTime(parseFloat(e.target.value));
    };

    const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);

        setTime(+percent);
    };

    const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        video.currentTime = 0; // Đặt lại thời gian về 0
        video.play(); // Phát lại video
    };

    const handleEnterPiP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.requestPictureInPicture();
        }
    };

    const handleExitPiP = () => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
    };

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
                id={index !== undefined ? `video-${index}` : undefined}
                className={classNames('h-full w-full object-cover', {
                    'relative z-10': hoverPlay,
                })}
                ref={videoRef}
                src={src}
                // autoPlay={!!controls}
                muted={controls ? muted : true}
                onTimeUpdate={onTimeUpdate}
                onEnded={(e) => handleEnded(e)}
                onMouseEnter={!hoverPlay ? onMouseEnter : handleMouseEnter}
                // onMouseEnter={() => (hoverPlay ? handleMouseEnter : onMouseEnter)}
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
                    handleEnterPiP,
                    handleExitPiP,
                })}
        </div>
    );
};

export interface ControlsProps {
    isPlaying: boolean;
    handlePlayPause: () => void;
    time: number;
    onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
    handleEnterPiP: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleExitPiP: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPiP: boolean;
}

type Type = {
    className?: string;
    index?: number;
    src: string; // Đường dẫn của video
    imgCover?: string;
    muted?: boolean;
    controls?: (props: ControlsProps) => React.ReactNode; // Hàm controls trả về JSX
    onMouseEnter?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLVideoElement>) => void;
    posterVideo?: string;
    hoverPlay?: boolean;
    thumbnail?: string;
};

export default VideoPlayer;
