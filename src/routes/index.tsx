import { FC } from 'react';
import config from '~/configs';
import { HeaderOnly } from '~/layouts';
import { Explore, Following, Friends, Home, LIVE, Profile, Search, Upload } from '~/pages';
import MyCollection from '~/pages/myCollection';

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
