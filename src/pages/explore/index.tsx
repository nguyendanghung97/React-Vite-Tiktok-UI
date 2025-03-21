import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
// Import Swiper styles
// import 'swiper/css';

import { Link } from 'react-router-dom';
import Image from '~/components/image';
import { CommentIcon, FavoriteIcon, LikeIcon, PlusIcon, ShareIcon } from '~/assets/images/svgs';

const Explore = () => {
    return (
        <Swiper
            className="fixed top-[60px] bottom-0 right-0 left-60"
            direction="vertical"
            mousewheel={true}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Mousewheel, Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <article className="h-full py-4 pr-60 flex justify-center overflow-hidden">
                    <div className="max-w-custom flex">
                        <section className="w-16 shrink-0"></section>
                        <section className="flex-1 flex items-center">
                            <div className="h-full overflow-hidden rounded-2xl">
                                <video
                                    controls
                                    className="w-full h-full object-contain"
                                    // preload="auto"
                                    // playsInline
                                    src="/src/assets/videos/video1.mp4"
                                ></video>
                            </div>
                        </section>
                        <section className="w-16 shrink-0 flex justify-end items-end">
                            <div className="w-12">
                                <div className="relative mb-5">
                                    <Link to="/profile/@riinnaxx">
                                        <Image
                                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/0aff81b8db4a420e8e70607a42510d3e.jpeg?lk3s=a5d48078&nonce=62524&refresh_token=550e5de9d205f339980b727eb6243bd2&x-expires=1727341200&x-signature=j7f5wtpffJKXtFlsCrwW9lXruM4%3D&shp=a5d48078&shcp=81f88b70"
                                            alt="Girl"
                                        />
                                    </Link>

                                    <button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className="flex items-center justify-center rounded-full w-6 h-6 text-white bg-primary">
                                            <PlusIcon />
                                        </span>
                                    </button>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="mt-2 mb-1.5 w-full h-12 rounded-full flex justify-center items-center bg-color/10">
                                        <LikeIcon />
                                    </button>
                                    <span className="text-xs font-bold text-color/75">8438</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="mt-2 mb-1.5 w-full h-12 rounded-full flex justify-center items-center bg-color/10">
                                        <CommentIcon />
                                    </button>
                                    <span className="text-xs font-bold text-color/75">169</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="mt-2 mb-1.5 w-full h-12 rounded-full flex justify-center items-center bg-color/10">
                                        <FavoriteIcon />
                                    </button>
                                    <span className="text-xs font-bold text-color/75">670</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="mt-2 mb-1.5 w-full h-12 rounded-full flex justify-center items-center bg-color/10">
                                        <ShareIcon />
                                    </button>
                                    <span className="text-xs font-bold text-color/75">113</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </SwiperSlide>
        </Swiper>
    );
};

export default Explore;
