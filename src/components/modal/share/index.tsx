import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon, CopyLinkIcon } from '~/assets/images/svgs';
import ModalWrapper from '~/components/modal';
import { sharesData } from '~/components/popper/menu/menuShare/dataMenuShare';
import useToast from '~/contexts/toast/useToast';
// import { useToast } from '~/components/toast/toast-context';

const ShareModal: React.FC<Type> = ({ isOpen, onClose, currentUrl }) => {
    const { t } = useTranslation();

    const { openToast } = useToast();

    const handleCopyLink = () => {
        onClose();
        // toast?.open('Đã sao chép', true);
        openToast(
            {
                component: (
                    <div
                        className={classNames(
                            'w-1/2 py-2.5 px-2 text-center bg-slate-700 rounded-sm animate-toast-top-entered',
                        )}
                    >
                        {t('components.toast.Copied')}
                    </div>
                ),

                position: 'center',
            },
            1000,
        );
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <div className="px-2 h-14 flex items-center justify-between">
                <div className="w-11"></div>
                <h2 className="text-[17px] font-semibold">{t('components.modal.share.Title')}</h2>
                <button className="w-11 h-11 text-2xl flex items-center justify-center" onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>

            <div className="mb-3 px-1">
                <div className="mx-4">
                    <div className="pl-3.5 h-12 flex items-center rounded-lg">
                        <input type="text" className="flex-1 bg-transparent" defaultValue={currentUrl} />
                        <div className="p-1.5">
                            <button
                                className="w-8 h-8 text-xl flex justify-center items-center hover:bg-black/5 dark:hover:bg-dark-text/10 rounded-md"
                                onClick={handleCopyLink}
                            >
                                <CopyLinkIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-1 px-1 grid grid-cols-5 max-h-56 overflow-y-auto">
                {sharesData.map((item, index) => {
                    return (
                        <div key={index} className="max-w-24 mx-auto">
                            <div className="p-2 w-fit grid justify-center gap-y-1.5 hover:bg-black/5 dark:hover:bg-dark-text/5 cursor-pointer rounded-lg">
                                <div className="text-5xl flex justify-center items-center">{item.icon}</div>
                                <span className="text-[13px] font-semibold text-center">
                                    {t(`components.modal.share.${item.title}`)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ModalWrapper>
    );
};

type Type = {
    isOpen: boolean;
    onClose: () => void;
    currentUrl: any;
};

export default ShareModal;
