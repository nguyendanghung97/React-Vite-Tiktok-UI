import React from 'react';
import { Swiper as SwiperClass } from 'swiper';

import ActionsArticle from './actionsArticle';
import VideoPlayer, { ControlsProps } from '~/components/video';
import VideoPlayerControls from '~/components/videoControls';
import { IArticle } from '~/pages/home/dataHomePage';
import classNames from 'classnames';

const Article: React.FC<Type> = ({
    className,
    data,
    index,
    isMuted,
    toggleMute,
    volume,
    onChangeVolume,
    swiperRef,
    activeItem,
    UrlArticleActive,
    showComments,
    setShowComments,
}) => {
    return (
        <article className={classNames(className, 'h-full p-4 flex justify-center overflow-hidden')}>
            <div className="flex justify-center items-center">
                <section className="hidden sm:flex w-16 shrink-0"></section>
                <section
                    className={classNames(
                        // w-min: width không thể lớn hơn mức mà aspect-ratio yêu cầu
                        'h-full w-min aspect-[3/5]',
                        'flex-1 flex items-center justify-center',
                    )}
                >
                    <VideoPlayer
                        // posterVideo={data.video.thumbnail}
                        controls={(props: ControlsProps) => (
                            <VideoPlayerControls
                                swiperRef={swiperRef}
                                article={data}
                                {...props}
                                isMuted={isMuted}
                                toggleMute={toggleMute}
                                volume={volume}
                                onChangeVolume={onChangeVolume}
                            />
                        )}
                        index={index}
                        muted={isMuted}
                        src={data.video.url}
                    />
                </section>
                <section className="hidden w-16 shrink-0 sm:flex justify-end items-end overflow-hidden">
                    <ActionsArticle
                        UrlArticleActive={UrlArticleActive}
                        showComments={showComments}
                        setShowComments={setShowComments}
                        className="w-12"
                        data={activeItem}
                    />
                </section>
            </div>
        </article>
    );
};

type Type = {
    className?: string;
    data: IArticle;
    activeItem: IArticle;
    UrlArticleActive: string;
    index: number;
    isMuted: boolean;
    volume: number;
    toggleMute: () => void;
    onChangeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
    swiperRef: React.MutableRefObject<SwiperClass | null>;
    showComments: boolean;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

export default Article;
