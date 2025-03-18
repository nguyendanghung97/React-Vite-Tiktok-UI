import React from 'react';
import {
    ExploreFilledIcon,
    ExploreOutlinedIcon,
    FollowingNavFilledIcon,
    FollowingNavOutlinedcon,
    FriensFilledIcon,
    FriensOutlinedIcon,
    HomeFilledIcon,
    HomeOutlinedIcon,
    LiveNavFilledIcon,
    LiveNavOutlinedIcon,
} from '~/assets/images/svgs';
import Avatar from '~/components/avatar';
import config from '~/configs';

export const NavData: INav[] = [
    {
        activeIcon: <HomeFilledIcon className="w-8 h-8" />,
        inactiveIcon: <HomeOutlinedIcon className="w-8 h-8" />,
        title: 'For You',
        to: config.routes.home,
    },
    {
        activeIcon: <ExploreFilledIcon className="w-8 h-8" />,
        inactiveIcon: <ExploreOutlinedIcon className="w-8 h-8" />,
        title: 'Explore',
        to: config.routes.explore,
    },
    {
        activeIcon: <FollowingNavFilledIcon className="p-1 w-8" />,
        inactiveIcon: <FollowingNavOutlinedcon className="p-1 w-8" />,
        title: 'Following',
        to: config.routes.following,
    },
    {
        activeIcon: <FriensFilledIcon className="w-8 h-8" />,
        inactiveIcon: <FriensOutlinedIcon className="w-8 h-8" />,
        title: 'Friends',
        to: config.routes.friends,
    },
    {
        activeIcon: <LiveNavFilledIcon className="w-8 h-8" />,
        inactiveIcon: <LiveNavOutlinedIcon className="w-8 h-8" />,
        title: 'LIVE',
        to: config.routes.live,
    },
    {
        avatar: <Avatar className="w-6 h-6" />,
        title: 'Profile',
        to: '/profile/@dhung61097',
    },
];

export type INav = {
    title: string;
    avatar?: React.JSX.Element;
    activeIcon?: React.JSX.Element;
    inactiveIcon?: React.JSX.Element;
    to: string;
};
