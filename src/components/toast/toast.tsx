import classNames from 'classnames';
import { forwardRef } from 'react';

export const Toast = forwardRef<HTMLDivElement, Type>(
    ({ className, close, showButtonClose, component, ...passProps }, ref) => {
        return (
            <div ref={ref} className={classNames('w-full flex justify-center items-center', className)} {...passProps}>
                {/* <p>{message}</p> */}
                {component}
                {showButtonClose && <button onClick={close}>close</button>}
            </div>
        );
    },
);

type Type = {
    // message: string;
    close: () => void;
    showButtonClose?: boolean;
    component: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default Toast;
