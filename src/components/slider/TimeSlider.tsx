import { useEffect, useState } from 'react';
import Slider from '.';

type TimeSliderProps = {
    video: HTMLVideoElement | null;
};

const TimeSlider = ({ video }: TimeSliderProps) => {
    const [progress, setProgress] = useState(0);
    const [useRAF, setUseRAF] = useState(true);

    useEffect(() => {
        if (!video) return;

        let frameId: number;

        const updateProgress = () => {
            if (!video || !video.duration) return setProgress(0);
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent);
        };

        const tick = () => {
            updateProgress();
            frameId = requestAnimationFrame(tick);
        };

        // chuyển đổi tab
        const handleVisibilityChange = () => {
            setUseRAF(!document.hidden);
        };

        if (useRAF) {
            frameId = requestAnimationFrame(tick);
        } else {
            video.addEventListener('timeupdate', updateProgress);
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelAnimationFrame(frameId);
            video.removeEventListener('timeupdate', updateProgress);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [video, useRAF]);

    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!video || !video.duration) return;
        const newTime = (video.duration / 100) * parseFloat(e.target.value);
        video.currentTime = newTime;
    };

    return <Slider time percentage={progress} onChange={handleChangeTime} />;
};

export default TimeSlider;
