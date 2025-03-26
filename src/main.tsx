import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import GlobalStyles from './utils/init/globalStyles';
import { reportWebVitals } from './utils/init/reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';

import '~/i18n/i18n';
import ToastProvider from './contexts/toast/toastProvider';
import ThemeProvider from './contexts/theme/ThemeProvider';

// Chỉ bật Eruda (devtools trên mobile) khi chạy trên mobile trong chế độ development
// Fix cảnh báo: Some chunks are larger than 500 kB after minification
if (import.meta.env.DEV && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    import('eruda')
        .then((eruda) => eruda.default.init()) // Sử dụng `.default.init()` nếu Eruda là module ESM
        .catch(console.error);
}

// Chỉ bật Eruda(devtools ở mobile) khi chạy trên mobile (tránh ảnh hưởng môi trường production)
// if (process.env.NODE_ENV === 'development' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//     eruda.init();
// }

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <ThemeProvider>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </ThemeProvider>
            </GlobalStyles>
        </Provider>
    </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
