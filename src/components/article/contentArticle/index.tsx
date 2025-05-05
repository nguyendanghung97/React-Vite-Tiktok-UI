import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Swiper as SwiperClass } from 'swiper';

import './index.less';
import { IArticle } from '~/pages/home/dataHomePage';

const ContentArticle = ({ article, swiperRef, className }: Type) => {
    const { t } = useTranslation();
    const [showAllDesc, setShowAllDesc] = useState(false);
    const [height, setHeight] = useState<string>('20px'); // chiều cao ban đầu
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        swiperRef.current?.mousewheel.disable();
    };

    const handleMouseLeave = () => {
        swiperRef.current?.mousewheel.enable();
    };

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        if (showAllDesc) {
            // Cho phép transition: gán chiều cao thật
            setHeight(`${el.scrollHeight}px`);
        } else {
            // Gán chiều cao thấp khi thu gọn
            setHeight('20px');
        }
    }, [showAllDesc]);

    return (
        <div
            className={classNames('relative flex justify-between overflow-y-scroll scroll-content', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-dvw flex flex-col items-end">
                <div
                    ref={contentRef}
                    style={{
                        height,
                        overflow: 'hidden',
                        transition: 'height 150ms ease-in',
                    }}
                    className={classNames(
                        'text-sm font-normal break-all',
                        showAllDesc ? 'line-clamp-none' : 'line-clamp-1',
                    )}
                >
                    <span>{article.desc?.title} </span>
                    {article.desc?.tags?.map((tag: string, index: number) => (
                        <Link key={index} to={`/profile/@${tag}`}>
                            <strong className="hover:underline text-wrap">{`@${tag} `}</strong>
                        </Link>
                    ))}
                    {article.desc?.hashtags?.map((hashtag: string, index: number) => (
                        <Link key={index} to={`/tag/${hashtag}`}>
                            <strong className="hover:underline wrap">{`#${hashtag} `}</strong>
                        </Link>
                    ))}
                </div>

                {showAllDesc && (
                    <button
                        className="shrink-0 px-1.5 text-sm font-normal leading-5"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowAllDesc(false);
                        }}
                    >
                        {t('components.article.contentArticle.collapse.less')}
                    </button>
                )}
            </div>

            {!!article.desc && !showAllDesc && (
                <button
                    className="px-1.5 text-sm font-normal leading-5"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAllDesc(true);
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
    article: IArticle;
    swiperRef: React.MutableRefObject<SwiperClass | null>;
};

export default ContentArticle;
