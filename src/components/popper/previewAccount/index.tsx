import React from 'react';
import { Link } from 'react-router-dom';

import Image from '~/components/image';
import Button from '~/components/button';
import PopperWrapper from '..';
import ContentPopperWrapper from '../contentWrapper';
import { useTranslation } from 'react-i18next';
import { User } from '~/pages/home/dataHomePage';
import Separate from '~/components/separate';

const PreviewAccount = ({ account, children, follow, setFollow }: Type) => {
    const { t } = useTranslation();

    const previewAccount = [
        {
            value: account.followers_count,
            unit: 'Followers',
        },
        {
            value: account.likes_count,
            unit: 'Likes',
        },
    ];

    return (
        <PopperWrapper
            // visible
            placement="bottom-start"
            offset={[-10, 20]}
            delay={[1000, 1000]}
            renderContent={
                <ContentPopperWrapper className="p-5 w-80">
                    <div className="mb-3 flex justify-between items-center">
                        <Link to={`/profile/@${account.nickname}`}>
                            <Image className="w-11 h-11" src={account.avatar} alt="Girl" />
                        </Link>

                        <Button
                            outline
                            primary={!follow}
                            className="py-1 px-2 min-w-24"
                            onClick={() => setFollow(!follow)}
                        >
                            {!follow ? 'Follow' : t('components.button.Following')}
                        </Button>
                    </div>

                    <Link to={`/profile/@${account.nickname}`}>
                        <span className="text-lg font-bold">{account.nickname}</span>
                    </Link>
                    <div className="-mt-1">
                        <Link className="-mt-1" to={`/profile/@${account.nickname}`}>
                            <span className="-mt-1 text-sm font-semibold">{account.full_name}</span>
                        </Link>
                    </div>

                    <div className="mt-2 font-tiktokDisplay flex items-center gap-x-3">
                        {previewAccount.map((item, index) => (
                            <div key={index} className="flex items-baseline gap-x-1.5">
                                <strong className="text-[17px]">{item.value}K</strong>
                                <small className="text-[17px]">
                                    {t(`components.popper.previewAccount.${item.unit}`)}
                                </small>
                            </div>
                        ))}
                    </div>

                    <Separate className="mt-4 border-t" />

                    <p className="pt-4 text-sm">{account.bio}</p>
                </ContentPopperWrapper>
            }
        >
            {children}
        </PopperWrapper>
    );
};

type Type = {
    children: React.ReactElement;
    account: User;
    follow: boolean;
    setFollow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default PreviewAccount;
