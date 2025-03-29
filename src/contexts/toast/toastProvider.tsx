import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ToastContext, ToastOptions } from './toastContext';
import Toast from '../../components/toast/toast';
import classNames from 'classnames';

const ToastProvider = ({ children }: Type) => {
    const [toasts, setToasts] = useState<ToastOptions[]>([]);
    // console.log('toasts', toasts);

    const openToast = ({
        id = Date.now(),
        type = 'success',
        position = 'center',
        message = '',
        showButtonClose = false,
        duration = 1000,
    }: Partial<ToastOptions>) => {
        const newToast = {
            id,
            message,
            type,
            showButtonClose,
            position,
            duration,
        };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => closeToast(newToast.id), duration);
    };

    const closeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return ReactDOM.createPortal(
        <ToastContext.Provider value={{ openToast, closeToast }}>
            {children}

            <div className={classNames('fixed top-4 z-40 w-full flex flex-col justify-center items-center gap-y-2')}>
                <div className="w-full flex flex-col items-center">
                    {toasts
                        .filter((toast) => toast.position === 'center')
                        .map((toast, index) => (
                            <Toast
                                key={index}
                                className="text-sm text-white bg-slate-700 pointer-events-none animate-toast-top-entered"
                                toast={toast}
                                onClose={() => closeToast(toast.id!)}
                            />
                        ))}
                </div>
            </div>
        </ToastContext.Provider>,
        document.body, // Render modal ra ngoài body
    );
};

type Type = {
    children: React.ReactNode;
};

export default ToastProvider;
