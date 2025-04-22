import Slider from '.';
import { useVideoProgress } from '~/hooks/useVideoProgress';

type TimeSliderProps = {
    video: HTMLVideoElement | null;
};

const TimeSlider = ({ video }: TimeSliderProps) => {
    const progress = useVideoProgress(video!);

    // console.log('progress', progress);

    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!video || !video.duration) return;
        const newTime = (video.duration / 100) * parseFloat(e.target.value);
        video.currentTime = newTime;
    };

    return <Slider time percentage={progress} onChange={handleChangeTime} />;
};

export default TimeSlider;
