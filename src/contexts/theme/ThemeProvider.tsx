import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: Type) => {
    const [theme, setTheme] = useState('Light mode');

    useEffect(() => {
        const newTheme = theme === 'Dark mode' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }, [theme]);

    // useEffect(() => {
    //     const newTheme = theme === 'Dark mode' ? 'dark' : 'light';
    //     document.documentElement.setAttribute('data-theme', newTheme);

    //     const backgroundColor = theme === 'Dark mode' ? '18, 18, 18' : '255, 255, 255'; // RGB thay cho HEX
    //     const textColor = theme === 'Dark mode' ? '255, 255, 255' : '22, 24, 35'; // RGB thay cho HEX
    //     const bgPopper = theme === 'Dark mode' ? '37, 37, 37' : '255, 255, 255';

    //     // Thiết lập CSS Variables
    //     document.documentElement.style.setProperty('--bg-color', backgroundColor);
    //     document.documentElement.style.setProperty('--bg-popper', bgPopper);
    //     document.documentElement.style.setProperty('--text-color', textColor);
    // }, [theme]);

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
