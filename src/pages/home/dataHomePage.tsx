import videos from '~/assets/videos';
import images from '~/assets/images';
import { User } from '~/store/users';
import { Video } from '~/store/videos';

export const articles: IArticle[] = [
    {
        id: 1,
        user: {
            id: 2323,
            nickname: 'mailinhtinhvovan',
            full_name: 'LINH MAI',
            avatar: images.Image1,
            followers_count: 523.8,
            likes_count: 15.5,
            bio: 'TÍCH CỰC-VUI VẺ-TỬ TẾ Contact for work anh Quỳnh: 0967489998 Booking@vtmgr.me',
        },
        video: {
            id: 1,
            url: videos.Video1,
            thumbnail: images.ImageCover1,
        },
        title: 'PREVIEW Đi Giữa Trời Rực Rỡ Tập 41.',
        tags: [],
        hashtags: ['skpictures', 'digiuatroirucro'],
        likesArticle: 9000,
        comments: 169,
        favorites: 670,
        shares: 113,
    },
    {
        id: 2,
        user: {
            id: 4545,
            nickname: 'kimmoanh1428',
            full_name: 'KimOanh',
            avatar: images.Image2,
            followers_count: 523.8,
            likes_count: 15.5,
            bio: 'TÍCH CỰC-VUI VẺ-TỬ TẾ Contact for work anh Quỳnh: 0967489998 Booking@vtmgr.me',
        },
        video: {
            id: 2,
            url: videos.Video2,
            thumbnail: images.ImageCover2,
        },
        title: 'Áng mấy kia rong chơi đâu rồi',
        tags: ['Trolykim'],
        hashtags: ['kimoanh', 'trolykim'],
        likesArticle: 8438,
        comments: 169,
        favorites: 670,
        shares: 113,
    },
    {
        id: 3,
        user: {
            id: 6767,
            nickname: 'nhaccover.vn',
            full_name: 'NHẠC COVER',
            avatar: images.Image3,
            followers_count: 523.8,
            likes_count: 15.5,
            bio: 'TÍCH CỰC-VUI VẺ-TỬ TẾ Contact for work anh Quỳnh: 0967489998 Booking@vtmgr.me',
        },
        video: {
            id: 3,
            url: videos.Video3,
            thumbnail: images.ImageCover3,
        },
        title: 'Anh giờ ở nơi đâu??',
        tags: [],
        hashtags: ['FanEnt', 'Nhachaymoingay', 'Nhaccover', 'shayda', 'taisaovay'],
        likesArticle: 2000,
        comments: 169,
        favorites: 670,
        shares: 113,
    },
    {
        id: 4,
        user: {
            id: 7979,
            nickname: 'vochaungocc',
            full_name: 'vochaungocc',
            avatar: images.Image4,
            followers_count: 523.8,
            likes_count: 15.5,
            bio: 'TÍCH CỰC-VUI VẺ-TỬ TẾ Contact for work anh Quỳnh: 0967489998 Booking@vtmgr.me',
        },
        video: {
            id: 4,
            url: videos.Video4,
            thumbnail: images.ImageCover4,
        },
        title: '',
        likesArticle: 3000,
        comments: 169,
        favorites: 670,
        shares: 113,
    },
];

export type IArticle = {
    id: number;
    title?: string;
    user: User;
    video: Video;
    // imageCover: string;
    likesArticle: number;
    comments: number;
    favorites: number;
    shares: number;
    tags?: string[];
    hashtags?: string[];
};
