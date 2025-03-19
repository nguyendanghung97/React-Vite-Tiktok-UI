import Button from '~/components/button';
import ModalWrapper from '..';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ title, isOpenModal, setIsOpenModal, handleDelete, handleRemove }: Type) => {
    const { t } = useTranslation();

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    return (
        <ModalWrapper isOpen={isOpenModal} onClose={handleCloseModal}>
            <div className="max-w-96 p-8 flex flex-col gap-y-6">
                <h2 className="font-tiktokDisplay text-2xl font-bold text-center break-words">{title}</h2>
                <p className="text-base font-normal !opacity-65 text-center">{t('components.modal.confirm.Desc')}</p>
                <div className="flex items-center justify-between gap-x-2">
                    <Button className="h-10 flex-1 text-base font-medium" onClick={handleCloseModal}>
                        {t('components.button.Cancel')}
                    </Button>
                    <Button
                        primary
                        onClick={handleDelete || handleRemove}
                        className="h-10 flex-1 text-base font-medium"
                    >
                        {handleDelete && t('components.button.Delete')}
                        {handleRemove && t('components.button.Remove')}
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
};

type Type = {
    title: string;
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete?: (collectionId: any) => void;
    handleRemove?: () => void;
};

export default ConfirmModal;
