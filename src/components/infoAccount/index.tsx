import React from 'react';
import Image from '~/components/image';
import Avatar from '../avatar';
import { TickIcon } from '~/assets/images/svgs';
import ProfileControls from '~/pages/profile/profileControls';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const InfoAccount: React.FC<Type> = ({ account }) => {
    const { t } = useTranslation();

    const infoAccount = [
        {
            unit: 'Following',
            value: !account ? 156 : account.followings_count,
        },
        {
            unit: 'Followers',
            value: !account ? 200 : account.followers_count,
        },
        {
            unit: 'Likes',
            value: !account ? 156 : account.likes_count,
        },
    ];

    return (
        <div className="mb-5 flex flex-col md:flex-row justify-center items-center gap-5 md:gap-7">
            <div className="w-52 h-52 flex overflow-hidden">
                {account ? <Image className="w-full h-full" src={account.avatar} alt={account.nickname} /> : <Avatar />}
            </div>
            <div className="flex-1 flex flex-col justify-center gap-y-3">
                <div className="flex justify-center md:justify-start gap-x-3">
                    <h1 className="font-tiktokDisplay text-2xl font-bold flex items-end">
                        {!account ? 'dhung61097' : account.nickname}
                    </h1>
                    {account && account.tick && (
                        <span className="text-xl flex items-center">
                            <TickIcon />
                        </span>
                    )}
                    <h2 className="text-lg font-semibold flex items-end">
                        {!account ? 'Đăng Hùng' : account.full_name}
                    </h2>
                </div>

                <ProfileControls isAccount={account}></ProfileControls>

                <div className="flex flex-col items-center md:items-start gap-y-3">
                    <div className="flex items-center gap-x-5">
                        {infoAccount.map((item, index) => (
                            <div
                                key={index}
                                className={classNames('flex items-baseline gap-x-1.5', {
                                    'cursor-pointer': item.unit !== 'Likes',
                                })}
                            >
                                <strong className="text-lg">{item.value}</strong>
                                <small
                                    className={classNames('text-base', {
                                        'hover:underline': item.unit !== 'Likes',
                                    })}
                                >
                                    {t(`pages.profile.${item.unit}`)}
                                </small>
                            </div>
                        ))}
                    </div>

                    <h2 className="max-w-xl text-base font-normal">{!account ? 'No bio yet.' : account.bio}</h2>
                </div>
            </div>
        </div>
    );
};

type Type = {
    account: any;
};

export default InfoAccount;
