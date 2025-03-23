import {
    FavoriteDoubleIcon,
    FavoriteProfileIcon,
    LikedProfileIcon,
    RepostsProfileIcon,
    VideoFrameIcon,
    VideosProfileIcon,
} from '~/assets/images/svgs';
import { ITab } from '~/components/tab';
import { articles } from '../home/dataHomePage';
import { Video } from '~/store/videos';
import { IEmptyState } from '~/components/emptyState';

export const profileTabs: ITab[] = [
    {
        title: 'Videos',
        icon: <VideosProfileIcon />,
        subTabs: [{ title: 'Latest' }, { title: 'Popular' }, { title: 'Oldest' }],
    },
    {
        title: 'Reposts',
        icon: <RepostsProfileIcon />,
    },
    {
        title: 'Favorites',
        icon: <FavoriteProfileIcon />,
        subTabs: [{ title: 'Posts' }, { title: 'Collections' }],
    },
    {
        title: 'Liked',
        icon: <LikedProfileIcon />,
    },
];

export const idAndVideos: Video[] = articles.map((article) => ({
    id: article.video.id,
    url: article.video.url,
    thumbnail: article.video.thumbnail,
}));

export const favoriteVideos = idAndVideos.slice(0, 3);
export const collectionAlbums = idAndVideos.slice(0, 1);
export const repostVideos: Video[] = idAndVideos.slice(0, 1);

export const dataEmptyStates: Record<string, IEmptyState> = {
    Videos: {
        icon: <VideoFrameIcon fontSize={44} />,
        title: 'pages.profile.videos.empty.Title',
        description: 'pages.profile.videos.empty.Desc',
    },
    Favorites: {
        icon: <FavoriteDoubleIcon fontSize={72} />,
        title: 'pages.profile.favorites.posts.empty.Title',
        description: 'pages.profile.favorites.posts.empty.Desc',
    },
    'Favorites.Collections': {
        icon: <FavoriteDoubleIcon fontSize={72} />,
        title: 'pages.profile.favorites.collections.empty.Title',
        description: 'pages.profile.favorites.collections.empty.Desc',
        textButton: 'Create',
    },
    Reposts: {
        icon: <FavoriteDoubleIcon fontSize={72} />,
        title: 'pages.profile.reposts.empty.Title',
        description: 'pages.profile.reposts.empty.Desc',
    },
    Liked: {
        icon: <FavoriteDoubleIcon fontSize={72} />,
        title: 'pages.profile.liked.empty.Title',
        description: 'pages.profile.liked.empty.Desc',
    },
};
