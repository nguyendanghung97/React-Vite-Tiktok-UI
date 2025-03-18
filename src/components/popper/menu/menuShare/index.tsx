import React, { useState } from 'react';

import { ArrowDownIcon } from '~/assets/images/svgs';
import { IShare } from './dataMenuShare';
import PopperWrapper from '../..';
import ContentPopperWrapper from '../../contentWrapper';
import MenuItem from '../menuItem';
import { useTranslation } from 'react-i18next';

const MenuShare: React.FC<Type> = ({ children, menuData, ...passProps }) => {
    const { t } = useTranslation();

    const [showAll, setShowAll] = useState(false);

    // Hiển thị 5 phần tử nếu showAll là false, ngược lại hiển thị toàn bộ
    const displayedData = showAll ? menuData : menuData.slice(0, 5);

    return (
        <PopperWrapper
            placement="top-start"
            offset={[-25, 5]}
            onHide={() => {
                setShowAll(false);
            }}
            positionArrow="bottom"
            renderContent={
                <ContentPopperWrapper className="w-72 py-2">
                    <ul
                        className="max-h-96 text-base overflow-y-auto"
                        onWheel={(e) => {
                            e.stopPropagation();
                            // console.log(e);
                        }}
                    >
                        {displayedData.map((share, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    className="mx-1 hover:bg-light-text/5 dark:hover:bg-dark-text/5"
                                    menuShare
                                    title={t(`components.popper.menu.menuShare.${share.title}`)}
                                    icon={share.icon}
                                    href={share.to}
                                />
                            );
                        })}
                    </ul>
                    {!showAll && (
                        <div className="item mx-1 hover:bg-light-text/5 dark:hover:bg-dark-text/5">
                            <button
                                className="px-4 w-full flex justify-center items-center"
                                onClick={() => setShowAll(true)}
                            >
                                <ArrowDownIcon />
                            </button>
                        </div>
                    )}
                </ContentPopperWrapper>
            }
            {...passProps}
        >
            {children}
        </PopperWrapper>
    );
};

type Type = {
    children: React.ReactElement;
    menuData: IShare[];
    visible?: boolean;
};

export default MenuShare;
