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
                <section className="flex-1 flex items-center justify-center h-full aspect-[3/5]">
                    <VideoPlayer
                        posterVideo={data.video.thumbnail}
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
                {/* <div className="w-8 lg:w-12 h-full flex flex-col justify-end">
                    <div className="w-full flex flex-col items-center gap-y-7">
                        <div className="w-full aspect-square bg-gray-300"></div>
                        <div className="w-full aspect-square bg-gray-300"></div>
                        <div className="w-full aspect-square bg-gray-300"></div>
                        <div className="w-full aspect-square bg-gray-300"></div>
                        <div className="w-full aspect-square bg-gray-300"></div>
                    </div>
                </div> */}
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
