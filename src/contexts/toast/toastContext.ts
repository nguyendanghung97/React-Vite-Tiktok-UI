import { createContext } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'copied';

export type ToastOptions = {
    id?: number;
    message: string;
    type: ToastType;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    showButtonClose?: boolean;
    duration?: number; // Thời gian hiển thị (ms), nếu cần
    // component: React.ReactNode;
};

type ToastContextValue = {
    openToast: (options: ToastOptions) => void;
    closeToast: (id: number) => void;
    // toasts: ToastOptions[];
};

export const ToastContext = createContext<ToastContextValue | null>(null);

// export const useToast = () => useContext(ToastContext);
