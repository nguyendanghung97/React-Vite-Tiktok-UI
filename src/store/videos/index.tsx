import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favoriteVideos } from '~/pages/profile/dataProfilePage';

export interface Video {
    id: number;
    video: string;
}

export interface VideoToAdd extends Video {
    isInCollection: boolean;
}

export interface VideoSelect extends Video {
    isSelected: boolean; // Dữ liệu đầu vào
}

export interface VideoRemove extends Video {
    isRemoved: boolean; // Dữ liệu đầu vào
}

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
        // cập nhật uncollectedVideos: loại bỏ mảng gồm các videos đã được selected
        reduceUncollectedVideos: (state, action: PayloadAction<VideoSelect[]>) => {
            state.uncollectedVideos = state.uncollectedVideos.filter(
                (item) => !action.payload.some((selected) => selected.id === item.id),
            );

            state.collectedVideos = favoriteVideos
                .filter((item) => [...state.collectedVideos, ...action.payload].some((v) => v.id === item.id))
                .map(({ id, video }) => ({
                    id,
                    video,
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
                .map(({ id, video }) => ({
                    id,
                    video,
                    isInCollection: false,
                }));

            state.collectedVideos = state.collectedVideos.filter(
                (item) => !action.payload.some((removed) => removed.id === item.id),
            );
        },
    },
});

export const { reduceUncollectedVideos, increaseUncollectedVideos } = videoSlice.actions;
