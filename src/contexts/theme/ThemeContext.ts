import { createContext } from 'react';

interface ThemeContextProps {
    theme: string;
    handleTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

// export const useTheme = () => useContext(ThemeContext);
