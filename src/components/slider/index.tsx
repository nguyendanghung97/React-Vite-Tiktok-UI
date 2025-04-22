import React, { useEffect, useRef, useState } from 'react';

import './index.less';
import classNames from 'classnames';

const Slider: React.FC<SliderProps> = ({ percentage = 0, onChange, muted, time, className }) => {
    // console.log(muted);
    const [positionThumb, setPositionThumb] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const rangeRef = useRef<HTMLInputElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rangeWidth = rangeRef.current!.getBoundingClientRect().width;
        const thumbWidth = thumbRef.current!.getBoundingClientRect().width;
        // khoảng lệch giữa thumb custom và thumb mặc định
        const spaceTwoThumb = (thumbWidth / 100) * percentage;

        const ProgressBar = (rangeWidth * percentage) / 100;

        setPositionThumb(muted ? 0 : percentage);
        setMarginLeft(muted ? 0 : spaceTwoThumb);
        setProgressBarWidth(muted ? 0 : ProgressBar);
    }, [percentage, muted]);

    return (
        <div
            className={classNames(className, 'slider-wrapper h-full w-full relative flex items-center !bg-transparent')}
        >
            <div
                className="progress-bar absolute top-1/2 -translate-y-1/2 left-0 bg-white rounded-lg"
                style={{
                    width: `${progressBarWidth}px`,
                }}
            ></div>
            <div
                ref={thumbRef}
                className={classNames(
                    'thumb-time absolute top-1/2 -translate-y-1/2 bg-white rounded-full pointer-events-none',
                    {
                        'opacity-0': time,
                    },
                )}
                style={{
                    left: `${positionThumb}%`,
                    marginLeft: `-${marginLeft}px`,
                }}
            ></div>
            <input
                ref={rangeRef}
                type="range"
                step="0.01"
                value={muted ? 0 : percentage}
                className="h-range w-full appearance-none rounded-lg bg-white/35 cursor-pointer"
                onChange={onChange}
            />
        </div>
    );
};

export type SliderProps = {
    className?: string;
    percentage: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    muted?: boolean;
    time?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default Slider;
