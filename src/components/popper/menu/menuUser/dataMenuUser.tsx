import {
    AnalyticsIcon,
    CheckIcon,
    CoinsIcon,
    CreatorHubIcon,
    CreatorIcon,
    HelpIcon,
    LanguageIcon,
    LiveStudioIcon,
    LogoutIcon,
    MemberIcon,
    ModeIcon,
    SettingIcon,
} from '~/assets/images/svgs';
import config from '~/configs';

export const MENU_ITEMS: IMenu[] = [
    {
        icon: <CreatorIcon className="w-5 h-5" />,
        title: 'Creator tools',
        children: {
            title: 'Creator tools',
            data: [
                {
                    type: 'Creator tools',
                    icon: <AnalyticsIcon className="w-5 h-5" />,
                    title: 'View Analytics',
                    to: config.routes.analytics,
                    separate: true,
                },
                {
                    type: 'Creator tools',
                    icon: <LiveStudioIcon className="w-5 h-5" />,
                    title: 'LIVE Studio',
                },
                {
                    type: 'Creator tools',
                    icon: <CreatorHubIcon className="w-5 h-5" />,
                    title: 'LIVE Creator Hub',
                    to: config.routes.creators,
                },
            ],
        },
    },
    {
        icon: <LanguageIcon className="w-5 h-5" />,
        title: 'Language Active',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                    separate: true,
                },
                {
                    type: 'Language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <HelpIcon className="w-5 h-5" />,
        title: 'Feedback anh help',
        to: config.routes.feedback,
    },
    {
        icon: <ModeIcon className="w-5 h-5" />,
        title: 'Mode',
        children: {
            title: 'Mode',
            data: [
                {
                    type: 'Mode',
                    icon: <CheckIcon className="w-5 h-5" />,
                    title: 'User device theme',
                    separate: true,
                },
                {
                    type: 'Mode',
                    icon: <CheckIcon className="w-5 h-5" />,
                    title: 'Dark mode',
                },
                {
                    type: 'Mode',
                    icon: <CheckIcon className="w-5 h-5" />,
                    title: 'Light mode',
                },
            ],
        },
    },
];

export const userMenu: IMenu[] = [
    {
        icon: <MemberIcon className="w-5 h-5" />,
        title: 'View profile',
        to: config.routes.myProfile,
    },
    {
        icon: <CoinsIcon className="w-5 h-5" />,
        title: 'Get coins',
        to: config.routes.coin,
    },
    {
        icon: <SettingIcon className="w-5 h-5" />,
        title: 'Setting',
        to: config.routes.setting,
    },
    ...MENU_ITEMS,
    {
        icon: <LogoutIcon className="w-5 h-5" />,
        title: 'Log out',
        separate: true,
    },
];

export type IMenu = {
    icon?: React.JSX.Element;
    title: string;
    children?: {
        title: string;
        data: IMenu[];
    };
    data?: IMenu[];
    separate?: boolean;
    type?: string;
    active?: boolean;
    to?: string;
    code?: string;
};
