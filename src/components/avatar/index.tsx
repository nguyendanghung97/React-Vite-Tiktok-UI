import classNames from 'classnames';
import { forwardRef } from 'react';
import images from '~/assets/images';
import Image from '~/components/image';

const Avatar: React.FC<Type> = forwardRef<HTMLDivElement, Type>(
    ({ className, src = images.Avatar, alt = 'Đăng Hùng' }, ref) => {
        return <Image ref={ref} className={classNames('rounded-full', className)} src={src} alt={alt} />;
    },
);

type Type = {
    className?: string;
    src?: string;
    alt?: string;
};

export default Avatar;
