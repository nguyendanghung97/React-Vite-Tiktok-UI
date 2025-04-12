import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import images from '~/assets/images';

const Image = forwardRef<HTMLDivElement, Type>(
    ({ src, alt, className, fallback: customFallback = images.noImage }, ref) => {
        const [fallback, setFallback] = useState('');
        // Reset fallback mỗi khi src thay đổi
        useEffect(() => {
            setFallback('');
        }, [src]);

        const handleError = () => {
            setFallback(customFallback);
        };
        return (
            <div
                ref={ref}
                className={classNames(
                    'flex justify-center items-center overflow-hidden cursor-pointer rounded-full',
                    className,
                )}
            >
                <img
                    // loading="lazy"
                    src={fallback || src}
                    alt={alt}
                    className="w-full h-full object-cover bg-[#88888880]"
                    onError={handleError}
                />
            </div>
        );
    },
);

type Type = {
    src: string;
    alt: string;
    className?: string;
    fallback?: string;
};

export default Image;
