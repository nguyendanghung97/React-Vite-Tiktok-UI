import classNames from 'classnames';
import { forwardRef } from 'react';
import images from '~/assets/images';
import Image from '~/components/image';

const Avatar: React.FC<Type> = forwardRef<HTMLDivElement, Type>(({ className }, ref) => {
    return <Image ref={ref} className={classNames('rounded-full', className)} src={images.Avatar} alt="Đăng Hùng" />;
});

type Type = {
    className?: string;
};

export default Avatar;
