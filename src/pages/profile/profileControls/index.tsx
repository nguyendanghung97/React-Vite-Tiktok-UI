import React, { useState } from 'react';
import TooltipTippy from '@tippyjs/react';

import {
    EditIcon,
    ElipsesIcon,
    FollowingIcon,
    PromotePostIcon,
    SettingIcon,
    ShareOutlineIcon,
} from '~/assets/images/svgs';
import Button from '~/components/button';
import ShareModal from '~/components/modal/share';
import config from '~/configs';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const ProfileControls: React.FC<Type> = ({ isAccount }) => {
    // const { username } = useParams<{ username: string }>();
    // console.log('username', username);

    const currentUrl = window.location.href;
    // console.log('fullUrl', currentUrl);

    // const path = window.location.pathname;
    // console.log('path', path);

    const { t } = useTranslation();

    const [isFollow, setIsFollow] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="h-10 flex justify-center md:justify-start gap-x-3">
            {!isAccount ? (
                <Button primary className="w-10 md:w-fit md:px-4 text-base font-semibold">
                    <span className="hidden md:inline-block">{t('components.button.Edit profile')}</span>
                    <EditIcon className="md:hidden text-xl" />
                </Button>
            ) : !isFollow ? (
                <Button primary className="px-4 text-base font-semibold" onClick={() => setIsFollow(true)}>
                    Follow
                </Button>
            ) : (
                <TooltipTippy
                    className="!text-base !font-semibold"
                    content={t('components.tooltip.Unfollow')}
                    placement="bottom"
                >
                    <Button
                        leftIcon={<FollowingIcon />}
                        className="px-4 text-base font-semibold"
                        onClick={() => setIsFollow(false)}
                    >
                        {t('components.button.Following')}
                    </Button>
                </TooltipTippy>
            )}

            <Button
                className={classNames('shrink-0 text-base font-semibold', {
                    'w-10 md:w-fit md:px-4': !isAccount,
                    'px-4': isAccount,
                })}
            >
                {!isAccount ? (
                    <>
                        <span className="hidden md:inline-block">{t('components.button.Promote post')}</span>
                        <PromotePostIcon className="text-xl md:hidden" />
                    </>
                ) : (
                    t('components.button.Message')
                )}
            </Button>

            {!isAccount && <Button to={config.routes.setting} className="w-10" leftIcon={<SettingIcon />}></Button>}

            <Button
                className="w-10 flex justify-center rounded-md"
                leftIcon={<ShareOutlineIcon />}
                onClick={openModal}
            ></Button>
            {isModalOpen && <ShareModal currentUrl={currentUrl} isOpen={isModalOpen} onClose={closeModal}></ShareModal>}

            {isAccount && <Button className="w-10" leftIcon={<ElipsesIcon />}></Button>}
        </div>
    );
};

type Type = {
    isAccount: boolean;
};

export default ProfileControls;
