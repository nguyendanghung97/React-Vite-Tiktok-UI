import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { TickIcon } from '~/assets/images/svgs';
import Image from '~/components/image';

const AccountItem = ({ isCollapsed, account, className, accNav, ...passProps }: Type) => {
    // const MemoizedImage = React.memo(
    //     ({ account, accNav, isCollapsed }: { account: any; accNav: boolean; isCollapsed: boolean }) => {
    //         return (
    //             <Image
    //                 className={classNames('rounded-full', {
    //                     'mr-3 w-9 h-10': !accNav,
    //                     'w-8 h-8': accNav,
    //                     'mr-3': !isCollapsed,
    //                 })}
    //                 src={account.avatar}
    //                 alt="Đăng Hùng"
    //             />
    //         );
    //     },
    // );
    return (
        <Link
            to={`/profile/@${account.nickname}`}
            state={{ selectedAccount: account }}
            className={classNames('flex items-center cursor-pointer', className, {
                'justify-center': isCollapsed,
            })}
            {...passProps}
        >
            {/* <MemoizedImage account={account} accNav={accNav} isCollapsed={isCollapsed} /> */}
            <Image
                className={classNames('shrink-0', {
                    'mr-3 w-9 h-10': !accNav,
                    'w-8 h-8': accNav,
                    'mr-3': !isCollapsed,
                })}
                src={account.avatar}
                alt="Đăng Hùng"
            />
            {/* {!isCollapsed && ( */}
            <div
                className={classNames('flex flex-col justify-center transition-all ease-linear duration-1000', {
                    'opacity-0': isCollapsed,
                    'opacity-100': !isCollapsed,
                })}
            >
                {!isCollapsed && (
                    <>
                        <h4
                            className={classNames('flex items-center leading-5', {
                                // '!font-bold': accNav,
                            })}
                        >
                            {account.nickname}
                            {account.tick && (
                                <span className="ml-1 text-sm">
                                    <TickIcon />
                                </span>
                            )}
                        </h4>
                        <p
                            className={classNames('font-normal opacity-75', {
                                'text-sm': !accNav,
                                'text-xs': accNav,
                            })}
                        >
                            {account.full_name}
                        </p>
                    </>
                )}
            </div>
            {/* )} */}
        </Link>
    );
};

type Type = {
    account: Record<string, any>;
    className?: string;
    accNav?: boolean;
    isCollapsed?: boolean;
};

export default AccountItem;
