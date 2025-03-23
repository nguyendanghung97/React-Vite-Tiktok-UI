import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video, VideoRemove, VideoSelect } from '../videos';

export type ICollection = {
    id: string;
    collectionName: string;
    collectionVideos: Video[];
    isPublic: boolean;
};

interface State {
    collections: ICollection[];
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('collections');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState).collections;
    } catch (e) {
        console.error('Error loading state from localStorage', e);
        return [];
    }
};

const initialState: State = {
    collections: loadFromLocalStorage(),
};

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addCollection(state, action: PayloadAction<ICollection>) {
            state.collections.push(action.payload);
        },
        deleteCollection(state, action: PayloadAction<string>) {
            // action.payload là ID của collection
            state.collections = state.collections.filter((collection) => collection.id !== action.payload);
        },
        updateCollections(state, action: PayloadAction<ICollection[]>) {
            state.collections = action.payload;
        },
        resetCollections(state) {
            // Đặt lại state về giá trị ban đầu
            state.collections = [];
        },

        // ✅ Cập nhật tên collection
        updateCollectionName: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const collection = state.collections.find((c) => c.id === action.payload.id);
            if (collection) {
                collection.collectionName = action.payload.name;
            }
        },
        // // ✅ Cập nhật danh sách video trong collection
        // updateCollectionVideos: (state, action: PayloadAction<{ id: string; videos: Video[] }>) => {
        //     const collection = state.collections.find((c) => c.id === action.payload.id);
        //     if (collection) {
        //         collection.collectionVideos = action.payload.videos;
        //     }
        // },
        // ✅ Bật/tắt chế độ public
        toggleCollectionPublic: (state, action: PayloadAction<string>) => {
            const collection = state.collections.find((c) => c.id === action.payload);
            if (collection) {
                collection.isPublic = !collection.isPublic;
            }
        },

        // ✅ Thêm video vào collection
        addVideosToCollection: (state, action: PayloadAction<{ id: string; videos: VideoSelect[] }>) => {
            const collection = state.collections.find((c) => c.id === action.payload.id);
            if (collection) {
                collection.collectionVideos = [
                    ...collection.collectionVideos,
                    ...action.payload.videos.map(({ id, url, thumbnail }) => ({ id, url, thumbnail })),
                ];
            }
        },
        // ✅ Xóa video khỏi collection
        removeVideosFromCollection: (state, action: PayloadAction<{ id: string; videos: VideoRemove[] }>) => {
            const collection = state.collections.find((c) => c.id === action.payload.id);
            if (collection) {
                collection.collectionVideos = collection.collectionVideos.filter(
                    (video) => !action.payload.videos.some((v) => v.id === video.id),
                );
            }
        },
    },
});

export const {
    addCollection,
    updateCollections,
    resetCollections,
    deleteCollection,
    updateCollectionName,
    addVideosToCollection,
    removeVideosFromCollection,
    toggleCollectionPublic,
} = collectionsSlice.actions;
