import { useEffect, useState } from 'react';

export const useVideoProgress = (video: HTMLVideoElement | null) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!video) return;

        const updateProgress = () => {
            if (!video.duration) return setProgress(0);
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, [video]);

    return progress;
};
