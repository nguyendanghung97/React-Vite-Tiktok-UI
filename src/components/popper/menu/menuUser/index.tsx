import React, { useState } from 'react';
import classNames from 'classnames';

import { IMenu } from './dataMenuUser';

import HeaderMenu from './headerMenu';
import PopperWrapper from '../..';
import ContentPopperWrapper from '../../contentWrapper';
import MenuItem from '../menuItem';
import { useTranslation } from 'react-i18next';
import useTheme from '~/contexts/theme/useTheme';
// import useTheme from '~/contexts/theme/useTheme';

const MenuUser: React.FC<Type> = ({ children, menuData }) => {
    const { handleTheme } = useTheme();

    const { t, i18n } = useTranslation();

    const [activeLanguage, setActiveLanguage] = useState('en');
    // console.log('activeLanguage', activeLanguage);
    const [activeMode, setActiveMode] = useState('Light mode');
    // console.log('activeMode', activeMode);
    // const [menuItems, setMenuItems] = useState<IMenu[]>(menuData);
    // console.log('menuItems', menuItems);
    const [history, setHistory] = useState<{ data: IMenu[]; title?: string }[]>([{ data: menuData }]);
    // console.log('history', history);

    const currentMenu = history[history.length - 1];
    // console.log('currentMenu', currentMenu);

    const handleClick = (item: IMenu) => {
        if (item.type === 'Mode') {
            setActiveMode(item.title);
            handleTheme(item.title);
        }
        if (item.type === 'Language') {
            i18n.changeLanguage(item.code);
            setActiveLanguage(item.code!);
        }

        // Thêm children vào history nếu item có children
        setHistory((prev) => {
            if (item.children) {
                return [...prev, item.children];
            }
            return prev;
        });
    };

    const handleBack = () => {
        // Xóa phần tử cuối của mảng để back về phần tử trước đó
        setHistory((prev) => prev.slice(0, history.length - 1));
    };

    return (
        <PopperWrapper
            // visible
            offset={[-90, 13]}
            hideOnClick={false}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
            positionArrow="top"
            renderContent={
                <ContentPopperWrapper className="min-w-56 py-2">
                    {history.length > 1 && <HeaderMenu title={currentMenu.title} onBack={handleBack} />}
                    <ul
                        className={classNames('max-h-screen text-base font-semibold leading-5', {
                            'overflow-y-auto': history.length > 1,
                        })}
                    >
                        {currentMenu.data.map((item, index) => {
                            let iconElement = item.icon;
                            if (currentMenu.title === 'Mode') {
                                if (item.title === activeMode) {
                                    iconElement = item.icon;
                                } else {
                                    iconElement = <svg className={classNames('w-5 h-5')}></svg>;
                                }
                            }
                            return (
                                <MenuItem
                                    menuUser
                                    key={index}
                                    className={classNames('hover:bg-light-text/5 dark:hover:bg-dark-text/5', {
                                        'pl-2 text-sm font-normal font-tiktokDisplay': currentMenu.title === 'Language',
                                        '!bg-opacity-5 bg-light-text dark:bg-dark-text':
                                            currentMenu.title === 'Language' && activeLanguage === item.code,
                                    })}
                                    title={t(`components.popper.menu.menuUser.${item.title}`)}
                                    icon={iconElement}
                                    to={item.to}
                                    onClick={() => handleClick(item)}
                                    separate={item.separate}
                                />
                            );
                        })}
                    </ul>
                </ContentPopperWrapper>
            }
        >
            {children}
        </PopperWrapper>
    );
};

type Type = {
    children: React.ReactElement;
    menuData: IMenu[];
};

export default MenuUser;
