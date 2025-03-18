import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Type>(
    (
        {
            type,
            href,
            to,
            onClick,
            children,
            leftIcon,
            rightIcon,
            className,
            outline,
            primary,
            rounded,
            disabled,
            menuItem,
            // size = 'medium',
            ...passProps
        },
        ref,
    ) => {
        let Comp: React.ElementType = 'button';

        // Partial<Type> tạo ra một kiểu mới, trong đó tất cả các thuộc tính của ButtonProps là tùy chọn
        const props: Partial<Type> = {
            onClick,
            ...passProps,
        };

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        // Disabled: Remove event listener
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key as keyof typeof props] === 'function') {
                    delete props[key as keyof typeof props];
                }
            });
        }

        return (
            <Comp
                disabled={disabled}
                type={type}
                ref={ref}
                className={classNames(
                    className,
                    'flex items-center',
                    {
                        'justify-center': !menuItem,
                        'justify-start': menuItem,
                    },
                    !menuItem && {
                        // normal
                        'bg-light-text/5 dark:bg-dark-text/10 rounded-md': !primary && !outline,
                        'border rounded': outline,
                        'text-white bg-primary rounded-md': primary && !outline,
                        'bg-white/10 border-color/10 rounded': outline && !primary,
                        'border-primary text-primary dark:bg-white/10': primary && outline,
                        'cursor-not-allowed opacity-40': disabled,
                        'hover:bg-light-text/10 dark:hover:bg-dark-text/20': !primary && !outline && !disabled,
                        'hover:bg-primaryhover': primary && !outline && !disabled,
                        'hover:bg-light-text/5 dark:hover:bg-dark-text/5': outline && !primary && !disabled,
                        'hover:bg-primary/5': primary && outline && !disabled,
                        '!rounded-3xl shadow': rounded,
                    },
                )}
                {...props}
            >
                {leftIcon && (
                    <span
                        className={classNames('text-xl flex items-center justify-center', {
                            'mr-2': children,
                        })}
                    >
                        {leftIcon}
                    </span>
                )}
                <span className="text-start break-all line-clamp-1">{children}</span>
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
            </Comp>
        );
    },
);

type Type = React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        children?: React.ReactNode;
        leftIcon?: React.ReactNode;
        rightIcon?: React.ReactNode;
        className?: string;
        href?: string;
        to?: string;
        onClick?: React.MouseEventHandler;
        outline?: boolean;
        primary?: boolean;
        rounded?: boolean;
        disabled?: boolean;
        menuItem?: boolean;
        // size?: string;
    };

export default Button;
