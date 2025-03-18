import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { collectionsSlice } from './collections';
import { videoSlice } from './videos';

// export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
//     try {
//         const serializedState = localStorage.getItem(key);
//         return serializedState ? JSON.parse(serializedState) : defaultValue;
//     } catch (e) {
//         console.error(`Error loading state from localStorage [${key}]`, e);
//         return defaultValue;
//     }
// };

// ✅ Lấy tên slice từ chính Redux slice
const persistedSlices = [collectionsSlice.name, videoSlice.name];

export const saveMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    persistedSlices.forEach((sliceName) => {
        try {
            const serializedState = JSON.stringify(state[sliceName]);
            localStorage.setItem(sliceName, serializedState);
        } catch (e) {
            console.error(`Error saving ${sliceName} state to localStorage`, e);
        }
    });

    return result;
};

const rootReducer = combineReducers({
    [collectionsSlice.name]: collectionsSlice.reducer,
    [videoSlice.name]: videoSlice.reducer,
});
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveMiddleware), // Thêm middleware
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
