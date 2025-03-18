import React from 'react';
import Button from '../button';
import config from '~/configs';
import { PlusRoundedIcon } from '~/assets/images/svgs';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ icon, title, description, textButton, onClickButton, activeTab }: IEmptyState) => {
    const { t } = useTranslation();
    return (
        <div className="flex-1 h-full w-full flex flex-col items-center justify-center">
            {activeTab === 'Videos' ? (
                <Button to={config.routes.upload} className="w-24 h-24 !rounded-full" leftIcon={icon}></Button>
            ) : (
                icon
            )}
            <p className="mt-6 text-2xl font-bold text-center">{t(title)}</p>
            <p className="mt-2 text-base font-normal text-center !opacity-75">{t(description)}</p>
            {textButton && (
                <Button
                    primary
                    className="mt-6 px-4 h-10 text-base font-semibold"
                    leftIcon={<PlusRoundedIcon />}
                    onClick={onClickButton}
                >
                    {t(`components.button.${textButton}`)}
                </Button>
            )}
            {/* {button} */}
        </div>
    );
};

export type IEmptyState = {
    icon: React.ReactNode;
    title: string;
    description: string;
    textButton?: string;
    activeTab?: string;
    onClickButton?: () => void;
};

export default EmptyState;
