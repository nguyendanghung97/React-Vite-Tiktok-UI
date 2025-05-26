import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LockIcon } from '~/assets/images/svgs';
import Avatar from '~/components/avatar';
import config from '~/configs';
import { RootState } from '~/store';

const InfoCollection = ({ collectionId }: Type) => {
    const { t } = useTranslation();

    const collections = useSelector((state: RootState) => state.collections.collections);
    // console.log('collections', collections);
    const currentCollection = collections.find((collection) => collection.id === collectionId);
    // console.log('currentCollection', currentCollection);
    console.log('InfoCollection re-render');
    return (
        <div className="h-full flex items-center sm:gap-x-5">
            <Avatar className="shrink-0 h-full aspect-square" />
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-1 line-clamp-1 break-all">{currentCollection?.collectionName}</h1>
                <h2 className="inline-flex items-center gap-x-1 text-sm !opacity-50 line-clamp-1 break-all">
                    {!currentCollection?.isPublic && (
                        <span className="text-xs">
                            <LockIcon />
                        </span>
                    )}
                    <span className="line-clamp-1">
                        {currentCollection?.collectionVideos.length} {t('pages.myCollection.Videos')}
                    </span>
                </h2>
                <h2 className="flex items-center gap-x-1">
                    <span className="text-sm !opacity-50 line-clamp-1 break-all">
                        {t('pages.myCollection.Created by')}
                    </span>
                    <Link
                        to={config.routes.myProfile}
                        className="text-xs font-semibold hover:underline line-clamp-1 break-all"
                        state={{
                            myCollectionRedirectTab: 'Favorites',
                            myCollectionRedirectSubTab: 'Posts',
                        }}
                    >
                        Đăng Hùng
                    </Link>
                    {/* <div
                        onClick={() => {
                            navigate(config.routes.myProfile, {
                                state: {
                                    myCollectionRedirectTab: 'Favorites',
                                    myCollectionRedirectSubTab: 'Posts',
                                },
                            });
                        }}
                        className="text-xs font-semibold hover:underline line-clamp-1 break-all"
                    >
                        Đăng Hùng
                    </div> */}
                </h2>
            </div>
        </div>
    );
};

export default React.memo(InfoCollection);

type Type = {
    collectionId: string;
};
