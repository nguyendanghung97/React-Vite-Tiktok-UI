import { Link } from 'react-router-dom';
import TooltipTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useTranslation } from 'react-i18next';

import './index.less';
import {
    InboxFilledIcon,
    InboxOutlinedIcon,
    Logo,
    MessagesFilledIcon,
    MessagesOutlinedIcon,
    PlusIcon,
} from '~/assets/images/svgs';
import Button from '~/components/button';
import config from '~/configs';
import MenuUser from '~/components/popper/menu/menuUser';
import { userMenu } from '~/components/popper/menu/menuUser/dataMenuUser';
import Search from './search';
import { useState } from 'react';
import Avatar from '~/components/avatar';
import classNames from 'classnames';

const Header = () => {
    const { t } = useTranslation();
    // console.log('t', t);

    const [messagesActive, setMessagesActive] = useState(false);
    const [inboxActive, setInboxActive] = useState(false);

    // const searchWrapperRef = useRef<HTMLDivElement>(null);

    return (
        // header
        <header className="h-16 fixed top-0 left-0 right-0 z-40 px-4 shadow shadow-light-text/10 dark:shadow-dark-text/10 bg-light-bg dark:bg-dark-bg">
            <div className="h-full relative flex items-center justify-between">
                <Link className="w-72 flex" to={config.routes.home}>
                    <Logo className="ml-9 sm:ml-0" title="Logo" />
                </Link>

                {/* Search */}
                <div className={classNames('flex-1 px-3 min-w-80 max-w-[500px]', 'hidden sm:flex justify-center')}>
                    <Search></Search>
                </div>

                {/* Actions */}
                <div className="w-72 h-9 flex items-center justify-end">
                    {/* <Button to={config.routes.upload} leftIcon={<UploadIcon className="text-2xl lg:hidden" />}></Button> */}
                    <TooltipTippy content={t('components.button.Upload')} placement="bottom" offset={[0, 8]}>
                        <Button
                            outline
                            to={config.routes.upload}
                            className={classNames('px-4 h-full text-base font-semibold', 'hidden md:flex')}
                            leftIcon={<PlusIcon />}
                        >
                            {t('components.button.Upload')}
                        </Button>
                    </TooltipTippy>

                    <TooltipTippy content={t('components.tooltip.Messages')} placement="bottom" offset={[0, 8]}>
                        <button className="md:ml-8 h-full text-2xl" onClick={() => setMessagesActive(!messagesActive)}>
                            {messagesActive ? (
                                <MessagesFilledIcon title="Messages ICon" />
                            ) : (
                                <MessagesOutlinedIcon title="Messages ICon" />
                            )}
                        </button>
                    </TooltipTippy>

                    <TooltipTippy content={t('components.tooltip.Inbox')} placement="bottom" offset={[0, 8]}>
                        <button
                            className="relative ml-4 pt-0.5 h-full flex"
                            onClick={() => setInboxActive(!inboxActive)}
                        >
                            {inboxActive ? (
                                <InboxFilledIcon title="Inbox Icon" />
                            ) : (
                                <>
                                    <InboxOutlinedIcon title="Inbox Icon" />{' '}
                                    <sup className="absolute left-4 -top-1.5 px-1.5 min-w-5 h-5 text-sm font-semibold text-white bg-primary flex items-center justify-center rounded-xl">
                                        17
                                    </sup>
                                </>
                            )}
                            {/* <InboxIcon title="Inbox Icon" />
                            <sup className="absolute left-4 -top-1.5 px-1.5 min-w-5 h-5 text-sm font-semibold text-white bg-primary flex items-center justify-center rounded-xl">
                                17
                            </sup> */}
                        </button>
                    </TooltipTippy>

                    <MenuUser menuData={userMenu}>
                        <Avatar className="shrink-0 ml-6 w-8 h-8" />
                    </MenuUser>
                </div>
            </div>
        </header>
    );
};

export default Header;
