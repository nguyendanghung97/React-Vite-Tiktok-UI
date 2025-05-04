import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

const TabIndicator = ({ liRefs, activeIndex, className }: Type) => {
    const indicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activeElement = liRefs.current[activeIndex]; // Lấy ra phần tử DOM đang active
        const indicator = indicatorRef.current; // Tham chiếu đến div cần điều chỉnh left và width

        if (activeElement && indicator) {
            // Lấy vị trí và kích thước của phần tử active
            const { offsetLeft, offsetWidth } = activeElement;
            // Đặt giá trị left và width cho thanh highlight
            indicator.style.left = `${offsetLeft}px`;
            indicator.style.width = `${offsetWidth}px`;
        }
    }, [activeIndex, liRefs]); // Chạy mỗi khi activeIndex thay đổi
    return (
        <div
            ref={indicatorRef}
            className={classNames(
                className,
                'absolute top-full h-0.5 bg-light-text dark:bg-dark-text/90 transition-all ease duration-300 rounded-md',
            )}
        ></div>
    );
};

type Type = {
    liRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
    activeIndex: number;
    className?: string;
};

export default TabIndicator;
