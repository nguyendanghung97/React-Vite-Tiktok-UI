import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Swiper as SwiperClass } from 'swiper';

import './index.less';

const ContentArticle = ({ article, swiperRef, className }: Type) => {
    const { t } = useTranslation();

    const [showAllTitle, setShowAllTitle] = useState(false);

    const handleMouseEnter = () => {
        // Ngăn chặn wheel của SwiperJS khi focus vào phần tử con có thể cuộn
        swiperRef.current?.mousewheel.disable();
    };

    const handleMouseLeave = () => {
        swiperRef.current?.mousewheel.enable();
    };

    return (
        <div
            className={classNames('relative flex justify-between overflow-y-scroll scroll-content', className)}
            // onWheel={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="h-fit flex-1 flex flex-col items-end">
                <div
                    // break-all: tách từng chữ xuống hàng
                    className={classNames('text-sm font-normal break-all', {
                        'line-clamp-1': !showAllTitle,
                    })}
                >
                    <span>{article.title} </span>
                    {article.tags?.map((tag: string, index: number) => {
                        return (
                            <Link key={index} to={`/profile/@${tag}`}>
                                <strong className="hover:underline text-wrap" key={index}>
                                    {`@${tag} `}
                                </strong>
                            </Link>
                        );
                    })}
                    {article.hashtags?.map((hashtag: string, index: number) => {
                        return (
                            <Link key={index} to={`/tag/${hashtag}`}>
                                <strong className="hover:underline wrap" key={index}>
                                    {`#${hashtag} `}
                                </strong>
                            </Link>
                        );
                    })}
                </div>

                {!!showAllTitle && (
                    <button
                        className="shrink-0 px-1.5 text-sm font-normal leading-5"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowAllTitle(false);
                        }}
                    >
                        {t('components.article.contentArticle.collapse.less')}
                    </button>
                )}
            </div>
            {!!article.title && !showAllTitle && (
                <button
                    className="px-1.5 text-sm font-normal leading-5"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAllTitle(true);
                    }}
                >
                    {t('components.article.contentArticle.collapse.more')}
                </button>
            )}
        </div>
    );
};

type Type = {
    className?: string;
    article: Record<string, any>;
    swiperRef: React.MutableRefObject<SwiperClass | null>;
};

export default ContentArticle;
