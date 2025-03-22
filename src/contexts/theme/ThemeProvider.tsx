import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: Type) => {
    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem('theme') || 'Light mode';
    });

    useEffect(() => {
        if (theme === 'User device theme') {
            // prefersDark phải reload lại trang mới cập nhật
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme === 'Dark mode' ? 'dark' : 'light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleTheme = (theme: string) => {
        // setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        setTheme(theme);
    };
    return <ThemeContext.Provider value={{ theme: theme, handleTheme: handleTheme }}>{children}</ThemeContext.Provider>;
};

type Type = {
    children: React.ReactNode;
};

export default ThemeProvider;
