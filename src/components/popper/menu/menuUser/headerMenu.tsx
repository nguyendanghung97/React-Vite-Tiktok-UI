import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackIcon } from '~/assets/images/svgs';

const HeaderMenu = ({ title, onBack }: Type) => {
    const { t } = useTranslation();

    return (
        <>
            {/* {title === 'Mode' ? (
                <Button
                    onClick={onBack}
                    className="py-2.5 pl-4 pr-2 w-full cursor-pointer hover:bg-color/5"
                    leftIcon={<BackIcon />}
                >
                    {t(`components.popper.menu.menuUser.${title}`)}
                </Button>
            ) : ( */}
            <header className={classNames('relative py-2.5 pl-4 pr-2 h-14 -mt-2  flex items-center')}>
                <button
                    className={classNames('mr-2 text-xl', {
                        'ml-2': title === 'Language',
                    })}
                    onClick={onBack}
                >
                    <BackIcon />
                </button>
                <h4
                    className={classNames({
                        'absolute left-1/2 -translate-x-1/2': title === 'Language',
                    })}
                >
                    {t(`components.popper.menu.menuUser.${title}`)}
                </h4>
            </header>
            {/* )} */}
        </>
    );
};

type Type = {
    title?: string;
    onBack: React.MouseEventHandler;
};

export default HeaderMenu;
