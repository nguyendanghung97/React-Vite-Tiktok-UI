import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const useTheme = () => {
    // Lấy giá trị từ ThemeContext
    const context = useContext(ThemeContext);

    //  kiểm tra null trước khi sử dụng để tránh lỗi runtime.
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    const { theme, handleTheme } = context;

    return { theme, handleTheme };
};

export default useTheme;
