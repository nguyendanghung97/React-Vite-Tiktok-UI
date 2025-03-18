import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ToastContext, ToastOptions } from './toastContext';
import Toast from '../../components/toast/toast';
import classNames from 'classnames';

type ToastType = {
    id: number;
    // message: string;
    showButtonClose: boolean;
    component: React.ReactNode;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
};

const ToastProvider = ({ children }: Type) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    // console.log('toasts', toasts);

    const toastRef = useRef<HTMLDivElement | null>(null);

    // console.log('toastRef', toastRef.current);

    const openToast = ({ component, position, showButtonClose = false }: ToastOptions, timeout?: number) => {
        const newToast = {
            id: Date.now(),
            component,
            showButtonClose,
            position,
        };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => closeToast(newToast.id), timeout);
    };

    const closeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return ReactDOM.createPortal(
        <>
            <ToastContext.Provider value={{ openToast: openToast, closeToast: closeToast }}>
                {children}
                {/* center */}

                <div
                    className={classNames('fixed top-4 z-40 w-full flex flex-col justify-center items-center gap-y-2')}
                >
                    {toasts
                        .filter((toast) => toast.position === 'center')
                        .map((toast) => (
                            <Toast
                                component={toast.component}
                                ref={toastRef}
                                key={toast.id}
                                showButtonClose={toast.showButtonClose}
                                close={() => closeToast(toast.id)}
                            />
                        ))}
                </div>
            </ToastContext.Provider>
        </>,
        document.body, // Render modal ra ngoài body
    );
};

type Type = {
    children: React.ReactNode;
};

export default ToastProvider;
