import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CheckIcon, CommentIcon, FavoriteIcon, LikeIcon, PlusIcon, ShareIcon } from '~/assets/images/svgs';
import Image from '~/components/image';
import ShareModal from '~/components/modal/share';
import PreviewAccount from '~/components/popper/previewAccount';
import { IArticle } from '~/pages/home/dataHomePage';

const ActionsArticle: React.FC<Type> = ({ data, className, showComments, setShowComments, UrlArticleActive }) => {
    const actionsArticle = [
        {
            icon: <LikeIcon />,
            title: 'likes',
            quantity: data.likesArticle,
        },
        {
            icon: <CommentIcon />,
            title: 'comments',
            quantity: data.comments,
        },
        {
            icon: <FavoriteIcon />,
            title: 'favorites',
            quantity: data.favorites,
        },
        {
            icon: <ShareIcon />,
            title: 'shares',
            quantity: data.shares,
        },
    ];

    const [isFollow, setIsFollow] = useState(false);

    const handleClick = () => {
        setIsFollow(!isFollow);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const handleCloseOverlay = () => {
        setShowComments(false); // Ẩn giao diện overlay
    };

    const handleActions = (title: string) => {
        // console.log(title);
        switch (title) {
            case 'shares':
                setIsModalOpen(true);
                break;
            case 'comments':
                setShowComments((prev) => !prev);
                break;
            default:
        }
    };

    return (
        <>
            {showComments && (
                <div className="overlay">
                    <h2>Video Overlay</h2>
                    <button onClick={handleCloseOverlay}>Close</button>
                </div>
            )}

            <div className={className}>
                <PreviewAccount account={data.user} follow={isFollow} setFollow={setIsFollow}>
                    <div className="relative mb-5">
                        <Link to={`/profile/@${data.user.nickname}`}>
                            <Image className="border-2" src={data.user.avatar} alt="Girl" />
                        </Link>

                        <button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={handleClick}>
                            <span
                                className={classNames('flex items-center justify-center rounded-full w-6 h-6', {
                                    'text-white bg-primary': !isFollow,
                                    'text-primary bg-white border': isFollow,
                                })}
                            >
                                {isFollow ? <CheckIcon /> : <PlusIcon />}
                            </span>
                        </button>
                    </div>
                </PreviewAccount>

                {actionsArticle.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <button
                            className="mt-2 mb-1.5 w-full h-12 rounded-full flex justify-center items-center !bg-opacity-10 bg-light-text dark:bg-dark-text"
                            onClick={() => handleActions(item.title)}
                        >
                            {item.icon}
                        </button>
                        <strong className="text-xs !opacity-75">{item.quantity}</strong>
                    </div>
                ))}

                {isModalOpen && (
                    <ShareModal currentUrl={UrlArticleActive} isOpen={isModalOpen} onClose={closeModal}></ShareModal>
                )}
            </div>
        </>
    );
};

type Type = {
    className?: string;
    data: IArticle;
    UrlArticleActive: string;
    showComments: boolean;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ActionsArticle;
