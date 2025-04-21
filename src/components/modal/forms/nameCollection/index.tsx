import React, { useState } from 'react';
import classNames from 'classnames';

import ModalWrapper from '../..';
import { CloseIcon, WarningIcon } from '~/assets/images/svgs';
import Button from '~/components/button';
import Switch from '~/components/switch';
import { useTranslation } from 'react-i18next';
import useToast from '~/contexts/toast/useToast';

const NameCollectionModal: React.FC<Type> = ({
    showPublicToggle,
    className,
    isOpenModal,
    collectionName,
    setCollectionName,
    isChecked,
    setIsChecked,
    // handleSubmit,
    handleCloseModal,
    handleNext,
    handleSave,
}) => {
    const { openToast } = useToast();
    const { t } = useTranslation();

    const [inValid, setInValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCollectionName(value);

        if (value.length > 30) {
            setInValid(true);
        } else {
            setInValid(false);
        }
    };

    return (
        <ModalWrapper isOpen={isOpenModal} onClose={handleCloseModal}>
            <form
                // w-dvw (Dynamic Viewport Width) giúp modal luôn có chiều rộng bằng với viewport, nhưng không vượt quá max-w-80.
                // khi thêm w-dvw, modal luôn mở rộng đến max-w nếu màn hình đủ lớn.
                className={classNames('max-w-80 w-dvw', className)}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget); // Lấy form data
                    const params: Record<string, string> = {};

                    for (const [key, value] of formData.entries()) {
                        params[key] = value.toString(); // Chuyển value thành string
                    }

                    console.log('Params:', params); // Xem dữ liệu từ form
                    if (handleNext) {
                        handleNext();
                    }
                    if (handleSave) {
                        await handleSave();
                        openToast({
                            type: 'success',
                            position: 'center',
                            message: t('components.toast.Collection name changed'),
                            // duration: 1000,
                        });
                    }
                }}
            >
                <div className="px-2 h-14 flex items-center justify-between">
                    <div className="w-11"></div>
                    <h2 className="text-[17px] font-bold line-clamp-1 break-all">
                        {t('components.modal.forms.nameCollection.Title')}
                    </h2>
                    <button type="button" className="w-11 h-11 text-2xl justify-center" onClick={handleCloseModal}>
                        <span className="w-full flex items-center justify-center">
                            <CloseIcon />
                        </span>
                    </button>
                </div>

                <div
                    className={classNames('px-6 pb-6 flex flex-col', {
                        'gap-y-5': showPublicToggle,
                        'gap-y-1': !showPublicToggle,
                    })}
                >
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="text-base font-semibold">
                                {t('components.modal.forms.nameCollection.Name')}{' '}
                            </span>
                            <span
                                className={classNames('text-sm', {
                                    'text-light-text/50 dark:text-dark-text/50': !inValid,
                                    'text-[#da3123]': inValid,
                                })}
                            >
                                ({collectionName.length}/30)
                            </span>
                        </div>
                        <div className="px-3.5 h-12 rounded-lg">
                            <input
                                type="text"
                                name="collectionName"
                                className="text-base w-full h-full bg-transparent outline-none caret-primary"
                                placeholder={t('components.modal.forms.nameCollection.Placeholder')}
                                value={collectionName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-1 min-h-5 text-[#da3123] flex items-center">
                            {inValid && (
                                <>
                                    <WarningIcon />
                                    <span className="ml-1 text-[13px] font-semibold">
                                        {t('components.modal.forms.nameCollection.Validate')}
                                    </span>
                                </>
                            )}
                        </div>

                        {showPublicToggle && (
                            <>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="makePublic"
                                        className="text-base font-semibold line-clamp-1 break-all cursor-pointer"
                                    >
                                        {t('components.modal.forms.nameCollection.Make public')}
                                    </label>
                                    <Switch
                                        id="makePublic"
                                        className="p-1 w-12 h-7"
                                        checkedColor="!bg-[#20d5ec] hover:!bg-[#10a2c5]"
                                        isChecked={isChecked!}
                                        setIsChecked={setIsChecked!}
                                    />
                                </div>

                                <p className="mt-1 text-xs !opacity-50 font-normal text-wrap">
                                    {t('components.modal.forms.nameCollection.Desc')}
                                </p>
                            </>
                        )}
                    </div>
                    <Button
                        primary
                        disabled={collectionName.length < 1 || inValid}
                        type="submit"
                        className="w-full h-10 text-base font-semibold"
                    >
                        <span className="w-full justify-center">
                            {handleNext ? t('components.button.Next') : t('components.button.Save')}
                        </span>
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    );
};

type Type = {
    showPublicToggle?: boolean;
    className?: string;
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    collectionName: string;
    setCollectionName: React.Dispatch<React.SetStateAction<string>>;
    isChecked?: boolean;
    setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
    handleCloseModal: () => void;
    // handleSubmit: () => void;
    handleNext?: () => void;
    handleSave?: () => void;
};

export default NameCollectionModal;
