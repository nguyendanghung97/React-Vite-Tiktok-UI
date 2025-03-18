import React, { createContext } from 'react';

export interface ToastOptions {
    // message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    showButtonClose?: boolean;
    duration?: number; // Thời gian hiển thị (ms), nếu cần
    component: React.ReactNode;
}

type ToastContextValue = {
    openToast: ({ showButtonClose, component, position }: ToastOptions, timeout?: number) => void;
    closeToast: (id: number) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

// export const useToast = () => useContext(ToastContext);
