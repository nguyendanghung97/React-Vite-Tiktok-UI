import React, { FC } from 'react';
import config from '~/configs';
import { HeaderOnly } from '~/layouts';
// import { Explore, Following, Friends, Home, LIVE, Search, Upload, MyCollection, Profile } from '~/pages';

// Code Splitting - chỉ tải khi cần: Tăng tốc độ tải trang
const Profile = React.lazy(() => import('~/pages/profile'));
const Home = React.lazy(() => import('~/pages/home'));
const MyCollection = React.lazy(() => import('~/pages/myCollection'));
const Following = React.lazy(() => import('~/pages/following'));
const Search = React.lazy(() => import('~/pages/search'));
const Upload = React.lazy(() => import('~/pages/upload'));
const Friends = React.lazy(() => import('~/pages/friends'));
const LIVE = React.lazy(() => import('~/pages/live'));
const Explore = React.lazy(() => import('~/pages/explore'));

// Định nghĩa kiểu cho các route
interface RouteType {
    path: string;
    component: FC;
    layout?: FC | null;
}

export const publicRoutes: RouteType[] = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.live, component: LIVE },
    { path: config.routes.friends, component: Friends },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.myCollection, component: MyCollection },
];
