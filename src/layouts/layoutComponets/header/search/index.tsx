import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ClearIcon, ElipsesIcon, LoadingIcon, SearchIcon } from '~/assets/images/svgs';

import AccountItem from '~/components/accountItem';
import Report from '~/components/popper/report';
import useDebounce from '~/hooks/useDebounce';
import PopperWrapper from '~/components/popper';
import ContentPopperWrapper from '~/components/popper/contentWrapper';

import './index.less';
import { useTranslation } from 'react-i18next';
import Separate from '~/components/separate';
import Heading from '~/components/heading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { getSearchUsers, resetSearchUsers } from '~/store/users';

const Search = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const { searchUsers } = useSelector((state: RootState) => state.users);
    // console.log('searchUsers', searchUsers);

    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const searchWrapperRef = useRef<HTMLDivElement>(null);

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        setIsLoading(true);
    }, [searchValue]);

    useEffect(() => {
        if (debounceValue.trim() === '') {
            dispatch(resetSearchUsers()); // Action để reset danh sách users khi value là chuỗi rỗng ""
        } else {
            dispatch(getSearchUsers({ query: debounceValue, type: 'more' }))
                .unwrap() //Dùng .unwrap() để chờ getSearchUsers hoàn thành.
                .finally(() => {
                    setIsLoading(false);
                }); //.finally() luôn chạy, giúp tránh quên tắt loading khi API lỗi.
        }

        // return () => {
        //     dispatch(resetSearchUsers());
        // };
    }, [dispatch, debounceValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        // Không nhận value ô input bắt đầu bằng dấu cách
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };

    return (
        <PopperWrapper
            // Nếu muốn mỗi popper có class riêng, bạn có thể truyền một prop (ví dụ customClass) và xử lý bên trong onCreate.
            onCreate={(instance) => {
                // Lấy phần tử popper chính là thẻ chứa ngoài dùng
                const popperElement = instance.popper;
                // Thêm class cho phần tử ngoài cùng
                popperElement.classList.add('w-full');
            }}
            appendTo={searchWrapperRef.current!}
            visible={showResult && searchUsers.length > 0}
            onClickOutside={() => {
                setShowResult(false);
            }}
            renderContent={
                <ContentPopperWrapper className="h-[calc(100vh-10rem)] w-full min-h-24 overflow-y-auto">
                    <Heading className="px-3 py-1.5 text-sm font-semibold !text-opacity-50">
                        {t('components.popper.search-result.Accounts')}
                    </Heading>

                    <ul className="text-base font-semibold cursor-pointer">
                        {searchUsers.map((accountData, index) => {
                            return (
                                <li
                                    key={index}
                                    className="relative group flex items-center justify-between hover:bg-light-text/5 dark:hover:bg-dark-text/5"
                                    onClick={() => setShowResult(false)}
                                >
                                    <AccountItem className="w-full px-4 py-2" account={accountData} />
                                    <Report>
                                        <span className="absolute right-4 py-2 group-hover:visible ml-2 invisible">
                                            <ElipsesIcon />
                                        </span>
                                    </Report>
                                </li>
                            );
                        })}
                    </ul>
                </ContentPopperWrapper>
            }
        >
            <div
                ref={searchWrapperRef}
                className={classNames(
                    'relative',
                    'flex justify-between items-center',
                    'group w-full h-11 rounded-3xl',
                    'hover:border hover:border-light-text/20 dark:hover:border-dark-text/20',
                    'focus-within:border focus-within:border-light-text/20 dark:focus-within:border-dark-text/20',
                )}
            >
                <input
                    ref={inputRef}
                    value={searchValue}
                    className={classNames(
                        'min-w-0 pl-4 flex-1 text-base font-normal outline-none appearance-none bg-transparent caret-primary',
                    )}
                    type="text"
                    placeholder={t('layouts.header.Placeholder')}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && (
                    <button
                        className={classNames('mx-3 opacity-35', {
                            'animate-spin': isLoading,
                        })}
                        onClick={handleClear}
                    >
                        {!isLoading ? <ClearIcon title="Clear Icon" /> : <LoadingIcon title="Loading Icon" />}
                    </button>
                )}

                <Separate className="h-7 border-r" />

                <button
                    className={classNames(
                        'h-full pl-3 pr-4 text-light-text dark:text-dark-text flex items-center rounded-r-3xl',
                        {
                            '!text-opacity-35': !!searchValue == false,
                            '!text-opacity-70': !!searchValue,
                        },
                        'group-hover:!text-opacity-90 group-hover:!bg-opacity-10 group-hover:bg-light-text dark:group-hover:bg-dark-text',
                    )}
                >
                    <SearchIcon title="Search Icon" />
                </button>
            </div>
        </PopperWrapper>
    );
};

export default Search;
