import classNames from 'classnames';
import { forwardRef } from 'react';
import { TickIcon } from '~/assets/images/svgs';
import { ToastOptions } from '~/contexts/toast/toastContext';

export const Toast = forwardRef<HTMLDivElement, Type>(({ className, onClose, toast, ...passProps }, ref) => {
    return (
        <div
            ref={ref}
            className={classNames('flex justify-center items-center', className, {
                'w-1/2 py-2.5 px-2 rounded-sm': toast.type === 'copied',
                'px-4 py-3 rounded-xl': toast.type === 'success',
            })}
            {...passProps}
        >
            <div className="flex justify-center items-center text-sm">
                {toast.type === 'success' && (
                    <span className="mr-2">
                        <TickIcon />
                    </span>
                )}
                {toast.message}
            </div>

            {toast.showButtonClose && <button onClick={onClose}>close</button>}
        </div>
    );
});

type Type = {
    toast: ToastOptions;
    onClose: () => void;
    showButtonClose?: boolean;
    // component?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default Toast;
