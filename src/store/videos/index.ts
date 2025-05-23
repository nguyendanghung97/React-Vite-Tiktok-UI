import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favoriteVideos } from '~/pages/profile/dataProfilePage';

export type Video = {
    id: number;
    url: string;
    thumbnail: string;
};

export type VideoToAdd = {
    id: number;
    url: string;
    thumbnail: string;
    isInCollection: boolean;
};

export type VideoSelect = {
    id: number;
    url: string;
    thumbnail: string;
    isSelected: boolean; // Dữ liệu đầu vào
};

export type VideoRemove = {
    id: number;
    url: string;
    thumbnail: string;
    isRemoved: boolean; // Dữ liệu đầu vào
};

interface State {
    uncollectedVideos: VideoToAdd[];
    collectedVideos: VideoToAdd[];
}

// const sliceName = 'videos';
// ✅ Lấy dữ liệu từ localStorage nếu có, nếu không dùng mặc định
const loadState = (): State => {
    const savedState = localStorage.getItem('videos');
    return savedState
        ? JSON.parse(savedState)
        : {
              uncollectedVideos: favoriteVideos.map((video) => ({ ...video, isInCollection: false })),
              collectedVideos: [],
          };
};
// const defaultState: State = {
//     uncollectedVideos: favoriteVideos.map((video) => ({ ...video, isInCollection: false })),
//     collectedVideos: [],
// };

// const initialState: State = loadFromLocalStorage<State>(sliceName, defaultState);

const initialState: State = loadState();

export const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        resetVideos: (state) => {
            state.uncollectedVideos = favoriteVideos.map((video) => ({ ...video, isInCollection: false }));
        },
        // cập nhật uncollectedVideos: loại bỏ mảng gồm các videos đã được selected
        reduceUncollectedVideos: (state, action: PayloadAction<VideoSelect[]>) => {
            state.uncollectedVideos = state.uncollectedVideos.filter(
                (item) => !action.payload.some((selected) => selected.id === item.id),
            );

            state.collectedVideos = favoriteVideos
                .filter((item) => [...state.collectedVideos, ...action.payload].some((v) => v.id === item.id))
                .map(({ id, url, thumbnail }) => ({
                    id,
                    url,
                    thumbnail,
                    isInCollection: true,
                }));

            // state.collectedVideos = favoriteVideos
            //     .filter(
            //         (video) =>
            //             state.collectedVideos.some((collected) => collected.id === video.id) ||
            //             action.payload.some((v) => v.id === video.id),
            //     )
            //     .map((video) => ({
            //         ...video,
            //         isInCollection: true,
            //     }));
        },
        increaseUncollectedVideos: (state, action: PayloadAction<VideoRemove[]>) => {
            state.uncollectedVideos = favoriteVideos
                .filter((item) => [...state.uncollectedVideos, ...action.payload].some((v) => v.id === item.id))
                .map(({ id, url, thumbnail }) => ({
                    id,
                    url,
                    thumbnail,
                    isInCollection: false,
                }));

            state.collectedVideos = state.collectedVideos.filter(
                (item) => !action.payload.some((removed) => removed.id === item.id),
            );
        },
    },
});

export const { reduceUncollectedVideos, increaseUncollectedVideos, resetVideos } = videoSlice.actions;
