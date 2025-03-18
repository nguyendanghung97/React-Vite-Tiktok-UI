import { PropsWithChildren, useEffect, useState } from 'react';
import Header from '~/layouts/layoutComponets';
import SideBar from './sidebar';

import './index.less';
import classNames from 'classnames';

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
                        'fixed z-10 inset-0 bg-black/50 dark:bg-black/70 transition-all ease-linear duration-300',
                        {
                            'translate-x-0 opacity-100': !isCollapsed, // Trượt vào vị trí (hiển thị)
                            '-translate-x-full opacity-0': isCollapsed, // Trượt ra khỏi màn hình (ẩn)
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
                        className={classNames('transition-all ease-linear duration-300', {
                            'w-60': !isCollapsed,
                            'w-20': isCollapsed,
                            '-left-20': isCollapsed && !isDesktop,
                        })}
                        isCollapsed={isCollapsed}
                        toggleCollapse={toggleCollapse}
                    />
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </>
    );
};

export default DefaultLayout;
