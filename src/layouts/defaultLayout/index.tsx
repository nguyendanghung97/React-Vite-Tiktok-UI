import { PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';

import './index.less';

import Header from '~/layouts/layoutComponents';
import SideBar from '../layoutComponents/sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024); // Khởi tạo dựa trên window.innerWidth
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);

    // console.log('isDesktop', isDesktop);

    // Hàm xử lý khi nhấn nút
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    // Lắng nghe sự kiện resize
    useEffect(() => {
        // Hàm xử lý resize
        const handleResize = () => {
            setIsCollapsed(window.innerWidth < 1024);
            setIsDesktop(window.innerWidth > 640);
        };

        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCollapse = () => {
        if (!isDesktop && !isCollapsed) {
            // location.pathname: setIsCollapsed(true) khi có pathname thay đổi (điều hướng)
            setIsCollapsed(true);
        }
    };

    // useEffect(() => {
    //     if (!isDesktop && !isCollapsed) {
    //         // location.pathname: setIsCollapsed(true) khi có pathname thay đổi (điều hướng)
    //         setIsCollapsed(true);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname]);

    return (
        <>
            <div className="sm:!hidden fixed z-50 top-0 h-16 flex items-center">
                <div
                    className={classNames('hamburger rotate-180 absolute left-4', {
                        'is-active': !isCollapsed,
                    })}
                    onClick={toggleCollapse}
                >
                    <span className="line" />
                    <span className="line" />
                    <span className="line" />
                </div>
            </div>

            {!isDesktop && (
                <div
                    onClick={toggleCollapse}
                    className={classNames(
                        'fixed inset-0 bg-black/50 dark:bg-black/70 transition-all ease-linear duration-300',
                        {
                            'visible opacity-100': !isCollapsed, // Trượt vào vị trí (hiển thị)
                            'invisible opacity-0': isCollapsed, // Trượt ra khỏi màn hình (ẩn)
                            'z-20': isDesktop,
                            'z-40': !isDesktop,
                        },
                    )}
                ></div>
            )}

            <Header />

            <div className="mt-16 flex">
                <div
                    className={classNames('transition-all ease-linear duration-300', {
                        'w-60': !isCollapsed && isDesktop,
                        'shrink-0 w-20': isCollapsed && isDesktop,
                    })}
                >
                    <SideBar
                        onClick={handleCollapse}
                        key={location.pathname}
                        className={classNames('transition-all ease-linear duration-300', {
                            'w-60': !isCollapsed,
                            'w-20': isCollapsed,
                            '-left-20': isCollapsed && !isDesktop,
                            'z-20': isDesktop,
                            'z-40': !isDesktop,
                        })}
                        isCollapsed={isCollapsed}
                        isDesktop={isDesktop}
                        // toggleCollapse={toggleCollapse}
                    />
                </div>
                {children}
                {/* <div className="flex-1">{children}</div> */}
            </div>
        </>
    );
};

export default DefaultLayout;
