import Button from '~/components/button';
import ModalWrapper from '..';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ title, isOpenModal, closeConfirmModal, handleDelete, handleRemove }: Type) => {
    console.log('isOpenModal', isOpenModal);
    const { t } = useTranslation();

    const handleConfirm = () => {
        if (handleDelete) handleDelete();

        if (handleRemove) handleRemove();

        closeConfirmModal();
    };

    return (
        <ModalWrapper isOpen={isOpenModal} onClose={closeConfirmModal}>
            <div className="max-w-96 p-8 flex flex-col gap-y-6">
                <h2 className="font-tiktokDisplay text-2xl font-bold text-center break-words">{title}</h2>
                <p className="text-base font-normal !opacity-65 text-center">{t('components.modal.confirm.Desc')}</p>
                <div className="flex items-center justify-between gap-x-2">
                    <Button className="h-10 flex-1 text-base font-medium" onClick={closeConfirmModal}>
                        {t('components.button.Cancel')}
                    </Button>
                    <Button primary onClick={handleConfirm} className="h-10 flex-1 text-base font-medium">
                        {handleDelete && t('components.button.Delete')}
                        {handleRemove && t('components.button.Remove')}
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export type ConfirmModalConfig = {
    title: string;
    handleDelete?: () => void;
    handleRemove?: () => void;
};

type Type = ConfirmModalConfig & {
    closeConfirmModal: () => void;
    isOpenModal: boolean;
};

export default ConfirmModal;
