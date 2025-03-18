import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

const Switch = ({ isChecked, setIsChecked, id, className, checkedColor, isOpenMenu }: Type) => {
    // console.log('isOpenMenu', isOpenMenu);
    const switchWrapperRef = useRef<HTMLDivElement>(null);
    const thumbSwitchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapperElement = switchWrapperRef.current;
        const thumbElement = thumbSwitchRef.current;

        if (isChecked && wrapperElement && thumbElement) {
            const widthWrapper = wrapperElement.offsetWidth;
            // console.log('widthWrapper', widthWrapper);
            const widthThumb = thumbElement.offsetWidth;
            const thumbLeft = thumbElement.offsetLeft;
            // console.log('thumbLeft', thumbLeft);
            const thumbTranslate = widthWrapper - thumbLeft * 2 - widthThumb;
            thumbElement.style.transform = `translateX(${thumbTranslate}px)`;
        } else {
            thumbElement!.style.transform = `translateX(0px)`;
        }
    }, [isOpenMenu, isChecked]);

    // const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.checked;
    //     console.log('value', value);
    //     // setIsChecked(value);
    // };

    return (
        <div
            ref={switchWrapperRef}
            className={classNames(
                'relative flex items-center rounded-3xl hover:bg-black/15 dark:hover:bg-dark-text/30 overflow-hidden',
                className,
                {
                    [checkedColor]: isChecked,
                },
            )}
            // onClick={() => setIsChecked((prev) => !prev)}
        >
            <input
                id={id}
                className="appearance-none absolute inset-0 bg-black/5 cursor-pointer"
                checked={isChecked}
                type="checkbox"
                role="switch"
                onChange={() => setIsChecked((prev) => !prev)}
            />
            <div
                ref={thumbSwitchRef}
                className={classNames(
                    'relative z-30 h-full aspect-square bg-white rounded-3xl shadow-lg pointer-events-none transition-all ease-in duration-150',
                    { 'translate-x-5': isChecked },
                )}
            ></div>
        </div>
    );
};

type Type = {
    id?: string;
    className: string;
    checkedColor: string;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenMenu?: boolean;
};

export default Switch;
