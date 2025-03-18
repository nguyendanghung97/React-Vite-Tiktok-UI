import React from 'react';
import { EmbedIcon, FacebookIcon, LinkIcon, RepostIcon, SendIcon } from '~/assets/images/svgs';

export const sharesData: IShare[] = [
    {
        icon: <RepostIcon className="rounded-full" />,
        title: 'Repost',
        to: '#',
    },
    {
        icon: <EmbedIcon className="rounded-full" />,
        title: 'Embed',
        to: '#',
    },
    {
        icon: <SendIcon className="rounded-full" />,
        title: 'Send to friends',
        to: '#',
    },
    {
        icon: <FacebookIcon className="rounded-full" />,
        title: 'Facebook',
        to: 'https://www.facebook.com/sharer/sharer.php?display=popup&sdk=joey&u=https%3A%2F%2Fwww.tiktok.com%2F%40viralchampion1%2Fvideo%2F7417503077470653728%3Fis_from_webapp%3D1%26sender_device%3Dpc',
    },
    {
        icon: <LinkIcon className="rounded-full" />,
        title: 'Copy link',
        to: '#',
    },
    {
        icon: <RepostIcon className="rounded-full" />,
        title: 'Repost',
        to: '#',
    },
    {
        icon: <EmbedIcon className="rounded-full" />,
        title: 'Embed',
        to: '#',
    },
    {
        icon: <SendIcon className="rounded-full" />,
        title: 'Send to friends',
        to: '#',
    },
    {
        icon: <FacebookIcon className="rounded-full" />,
        title: 'Facebook',
        to: 'https://www.facebook.com/sharer/sharer.php?display=popup&sdk=joey&u=https%3A%2F%2Fwww.tiktok.com%2F%40viralchampion1%2Fvideo%2F7417503077470653728%3Fis_from_webapp%3D1%26sender_device%3Dpc',
    },
    {
        icon: <LinkIcon className="rounded-full" />,
        title: 'Copy link',
        to: '#',
    },
    {
        icon: <FacebookIcon className="rounded-full" />,
        title: 'Facebook',
        to: 'https://www.facebook.com/sharer/sharer.php?display=popup&sdk=joey&u=https%3A%2F%2Fwww.tiktok.com%2F%40viralchampion1%2Fvideo%2F7417503077470653728%3Fis_from_webapp%3D1%26sender_device%3Dpc',
    },
    {
        icon: <LinkIcon className="rounded-full" />,
        title: 'Copy link',
        to: '#',
    },
];

export interface IShare {
    icon: React.ReactNode;
    title: string;
    to: string;
}
