import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
// import 'swiper/swiper-bundle.css';
import { Swiper as SwiperClass } from 'swiper';

import './index.less';

import { articles, IArticle } from './dataHomePage';
import Button from '~/components/button';
import { ArrowDownIcon } from '~/assets/images/svgs';
import classNames from 'classnames';
import ActionsArticle from '~/components/article/actionsArticle';
import VideoPlayer, { ControlsProps } from '~/components/video';
import VideoPlayerControls from '~/components/videoControls';

const Home = () => {
    const swiperRef = useRef<SwiperClass | null>(null);

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    // console.log('swiperRef', typeof swiperRef!);

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // console.log('videoRefs', videoRefs);

    const [isPiP, setIsPiP] = useState(false);

    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0); // Theo dõi slide hiện tại
    const [activeItem, setActiveItem] = useState<IArticle>(articles[0]);
    // console.log('activeItem', activeItem);
    const [showComments, setShowComments] = useState(false);
    // const urlOriginal = window.location.origin;
    const UrlArticleActive = `${window.location.origin}/@${activeItem.user.nickname}/video/${activeItem.id}`;

    useEffect(() => {
        document.title = 'TikTok - Make Your Day';
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (index === activeIndex) {
                video!.play();
            } else {
                video!.pause();
                video!.currentTime = 0; // Reset về 0 nếu muốn
            }
        });
    }, [activeIndex]);

    useEffect(() => {
        if (showComments === true) {
            // Thay đổi URL mà không tải lại trang
            window.history.replaceState({}, '', UrlArticleActive);
        } else {
            // Quay lại URL ban đầu
            window.history.replaceState({}, '', '/');
        }
    }, [showComments, UrlArticleActive]);

    const toggleMute = () => {
        const videos = document.querySelectorAll<HTMLVideoElement>('video');
        videos.forEach((video) => {
            if (isMuted && volume === 0) {
                video.volume = 1;
                setVolume(100);
            }
        });

        setIsMuted((prev) => !prev);
    };

    const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const videos = document.querySelectorAll<HTMLVideoElement>('video');
        videos.forEach((video) => {
            video!.volume = Number(e.target.value) / 100;
            setVolume(Number(e.target.value));
            setIsMuted(video.volume === 0);
        });
    };

    const handleEnterPiP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        videoRefs.current[activeIndex]!.requestPictureInPicture();
        setIsPiP(true);
    };

    const handleExitPiP = () => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
            setIsPiP(false);
        }
    };

    const handleSlideChange = async (swiper: any) => {
        const newVideo = videoRefs.current[swiper.activeIndex];

        if (isPiP) {
            if (window.innerWidth <= 768) {
                // Nếu là mobile, thoát PiP khi đổi slide
                try {
                    await document.exitPictureInPicture();
                } catch (err) {
                    console.error('❌ PiP Exit Error:', err);
                }
            } else if (newVideo) {
                // Nếu là PC, chuyển video trong PiP
                try {
                    await newVideo.requestPictureInPicture();
                } catch (err) {
                    console.error('❌ PiP Error:', err);
                }
            }
        }
    };
    return (
        <Swiper
            modules={[Mousewheel, Keyboard, Navigation]}
            // navigation={true}
            onSwiper={(swiper) => {
                // Lấy ra Swiper để ngăn chặn sự kiện cuộn tràn lên
                swiperRef.current = swiper;

                // Một số trường hợp khi Swiper vừa khởi tạo, các tham chiếu (prevRef.current, nextRef.current) có thể chưa được gán đúng.
                setTimeout(() => {
                    if (swiper.params && swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        // để khởi tạo lại navigation
                        swiper.navigation.init();
                        // swiper.navigation.update();
                    }
                });
            }}
            mousewheel={{
                forceToAxis: true, // Đảm bảo scroll chỉ theo trục dọc
            }}
            keyboard={{
                enabled: true, // Bật điều khiển bằng bàn phím
            }}
            touchStartPreventDefault={false} // Điều chỉnh để không chặn click
            // translate-y-[env(safe-area-inset-bottom)]: fix UI controls bị trượt lên khi zoom in
            className="fixed inset-0 top-16 translate-y-[env(safe-area-inset-bottom)]"
            // className="w-full h-[calc(100vh-4rem)]"
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                setActiveItem(articles[swiper.activeIndex]);
                // const videoActive = videoRefs.current[swiper.activeIndex];
                // if (isPiP && videoActive) {
                //     videoActive.requestPictureInPicture();
                // }
                handleSlideChange(swiper);
            }}
        >
            {articles.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                        <article className={classNames('h-full p-4 flex justify-center overflow-hidden')}>
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
                                        // Lấy ra list videoElement
                                        ref={(el) => (videoRefs.current[index] = el)}
                                        posterVideo={item.video.thumbnail}
                                        controls={(props: ControlsProps) => (
                                            <VideoPlayerControls
                                                swiperRef={swiperRef}
                                                article={item}
                                                {...props}
                                                isMuted={isMuted}
                                                toggleMute={toggleMute}
                                                volume={volume}
                                                onChangeVolume={onChangeVolume}
                                            />
                                        )}
                                        muted={isMuted}
                                        src={item.video.url}
                                        handleEnterPiP={handleEnterPiP}
                                        handleExitPiP={handleExitPiP}
                                        isPiP={isPiP}
                                        setIsPiP={setIsPiP}
                                        // time={time}
                                        // setTime={setTime}
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
                    </SwiperSlide>
                );
            })}

            <div
                className={classNames(
                    'absolute right-0 top-1/2 -translate-y-1/2 w-20',
                    'hidden md:flex flex-col items-center gap-y-4',
                )}
            >
                <Button
                    ref={prevRef}
                    disabled={activeIndex === 0}
                    className="w-12 h-12 !rounded-full"
                    leftIcon={<ArrowDownIcon className="rotate-180" />}
                ></Button>
                <Button
                    ref={nextRef}
                    disabled={activeIndex === articles.length - 1}
                    className="w-12 h-12 !rounded-full"
                    leftIcon={<ArrowDownIcon />}
                ></Button>
            </div>
        </Swiper>
    );
};

export default Home;
