import { useContext } from 'react';
import { ToastContext } from './toastContext';

const useToast = () => {
    // Lấy giá trị từ ThemeContext
    const context = useContext(ToastContext);

    //  kiểm tra null trước khi sử dụng để tránh lỗi runtime.
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    const { openToast, closeToast } = context;

    return { openToast, closeToast };
};

export default useToast;
