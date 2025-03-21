import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper: React.FC<Type> = ({ isOpen, onClose, children, ...passProps }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Sử dụng useEffect để thêm/lấy overflow cho body khi modal mở/đóng
    useEffect(() => {
        let timeoutId: any;
        if (isOpen) {
            setIsTransitioning(true);
            document.body.style.overflowY = 'hidden'; // Ngăn body scroll khi modal mở
        } else {
            timeoutId = setTimeout(() => setIsTransitioning(false), 300);
            document.body.style.overflowY = ''; // Cho phép body scroll lại khi modal đóng
        }

        // Cleanup khi component unmount
        return () => {
            clearTimeout(timeoutId);
            document.body.style.overflow = ''; // Đảm bảo body có thể scroll lại nếu component bị unmount
        };
    }, [isOpen]); // Chỉ chạy effect khi isOpen thay đổi

    return ReactDOM.createPortal(
        <>
            <div
                className={classNames(
                    'fixed z-50 inset-0 flex items-center justify-center transition-all ease duration-150',
                    {
                        'invisible opacity-0': !isTransitioning,
                        'visible opacity-100': isTransitioning,
                    },
                )}
                {...passProps}
            >
                <div
                    className="fixed z-10 inset-0 p-4 flex justify-center items-center bg-black/50 dark:bg-black/70"
                    onClick={onClose}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-fit rounded-xl shadow-md bg-light-bgModal dark:bg-dark-bgModal"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.body, // Render modal ra ngoài body
    );
};

type Type = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default ModalWrapper;
