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
