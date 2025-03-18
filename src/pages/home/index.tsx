import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
// import 'swiper/swiper-bundle.css';
import { Swiper as SwiperClass } from 'swiper';

import Article from '~/components/article';
import { articles, IArticle } from './dataHomePage';

import './index.less';
import Button from '~/components/button';
import { ArrowDownIcon } from '~/assets/images/svgs';
import classNames from 'classnames';

const Home = () => {
    const swiperRef = useRef<SwiperClass | null>(null);
    // console.log('swiperRef', typeof swiperRef!);

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
        setActiveItem(articles[activeIndex]);
        const videos = document.querySelectorAll<HTMLVideoElement>('video');
        const activeVideo = document.querySelector<HTMLVideoElement>(`#video-${activeIndex}`);
        videos.forEach((video) => {
            if (video === activeVideo) {
                video.play(); // Chỉ play video active
            } else {
                video.pause(); // Pause tất cả video khác
                video.currentTime = 0; // Reset về 0 nếu muốn
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

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

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
            className="fixed inset-0 top-16"
            // className="w-full h-[calc(100vh-4rem)]"
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
            }}
        >
            {articles.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                        <Article
                            showComments={showComments}
                            setShowComments={setShowComments}
                            activeItem={activeItem}
                            UrlArticleActive={UrlArticleActive}
                            swiperRef={swiperRef}
                            isMuted={isMuted}
                            toggleMute={toggleMute}
                            volume={volume}
                            onChangeVolume={onChangeVolume}
                            index={index}
                            data={item}
                        />
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
