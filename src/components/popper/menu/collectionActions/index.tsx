import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PopperWrapper from '~/components/popper';
import ContentPopperWrapper from '../../contentWrapper';
import { DeleteIcon, EditTextIcon, LockIcon } from '~/assets/images/svgs';
import Switch from '~/components/switch';
import NameCollectionModal from '~/components/modal/forms/nameCollection';
import ConfirmModal from '~/components/modal/confirm';
import { RootState } from '~/store';
import { toggleCollectionPublic, updateCollectionName } from '~/store/collections';
import MenuItem from '../menuItem';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const collectionActionsData = [
    {
        icon: <LockIcon />,
        title: 'Make public',
        switchElement: true,
    },
    {
        icon: <EditTextIcon />,
        title: 'Change name',
    },
    {
        icon: <DeleteIcon />,
        title: 'Delete collection',
    },
];
const CollectionActions = ({
    collectionId,
    children,
    isOpenMenu,
    setIsOpenMenu,
    isChecked,
    setIsChecked,
    handleDeleteCollection,
}: Type) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const collections = useSelector((state: RootState) => state.collections.collections);

    const currentCollection = collections.find((collection) => collection.id === collectionId);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [nameCollecton, setNameCollection] = useState(currentCollection!.collectionName);

    const handleCloseModal = () => {
        setNameCollection(currentCollection!.collectionName);
        setIsOpenModal(false);
        setIsOpenConfirmModal(false);
    };

    const handleSave = () => {
        dispatch(updateCollectionName({ id: collectionId, name: nameCollecton }));
        setIsOpenModal(false);
    };

    const handleClickItem = (title: string) => {
        switch (title) {
            case 'Make public':
                dispatch(toggleCollectionPublic(collectionId));
                break;
            case 'Change name':
                setIsOpenModal(true);
                setIsOpenMenu(false);
                break;
            case 'Delete collection':
                setIsOpenConfirmModal(true);
                setIsOpenMenu(false);
                break;
        }
    };
    return (
        <PopperWrapper
            offset={[0, 5]}
            visible={isOpenMenu}
            onClickOutside={() => setIsOpenMenu(false)}
            renderContent={
                <ContentPopperWrapper className="w-56 p-1 text-base font-semibold">
                    {collectionActionsData.map((item, index) => (
                        <MenuItem
                            key={index}
                            className={classNames(
                                'px-3.5 h-12 flex items-center justify-between gap-x-2 rounded-lg hover:bg-light-text/5 dark:hover:bg-dark-text/5',
                                {
                                    'text-[#ff4c3a]': item.title === 'Delete collection',
                                },
                            )}
                            title={t(`components.popper.menu.collectionActions.${item.title}`)}
                            icon={item.icon}
                            switchElement={
                                item.switchElement && (
                                    <Switch
                                        checkedColor="!bg-[#20d5ec]"
                                        className="p-1 w-10 h-6 shrink-0"
                                        isChecked={isChecked}
                                        setIsChecked={setIsChecked}
                                        isOpenMenu={isOpenMenu}
                                    />
                                )
                            }
                            onClick={() => handleClickItem(item.title)}
                        />
                    ))}

                    {isOpenModal && (
                        <NameCollectionModal
                            isOpenModal={isOpenModal}
                            setIsOpenModal={setIsOpenModal}
                            collectionName={nameCollecton}
                            setCollectionName={setNameCollection}
                            handleCloseModal={handleCloseModal}
                            handleSave={handleSave}
                        />
                    )}

                    {isOpenConfirmModal && (
                        <ConfirmModal
                            // title={`Delete ${currentCollection?.collectionName}`}
                            title={t('components.modal.confirm.delete.Title', {
                                nameCollection: currentCollection?.collectionName,
                            })}
                            isOpenModal={isOpenConfirmModal}
                            setIsOpenModal={setIsOpenConfirmModal}
                            handleDelete={() => handleDeleteCollection(currentCollection?.id)}
                        />
                    )}
                </ContentPopperWrapper>
            }
        >
            {children}
        </PopperWrapper>
    );
};

type Type = {
    children: React.ReactElement;
    isOpenMenu: boolean;
    setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteCollection: (collectionId: any) => void;
    collectionId: string;
};

export default CollectionActions;
