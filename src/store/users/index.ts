import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '~/utils/httpRequest';

export type User = {
    avatar: string;
    bio: string;
    created_at?: '2022-12-23 00:12:36';
    facebook_url?: '';
    first_name?: string;
    followers_count: number;
    followings_count?: number;
    full_name: string;
    id: number;
    instagram_url?: string;
    last_name?: string;
    likes_count: number;
    nickname: string;
    tick?: false;
    twitter_url?: string;
    updated_at?: '2024-05-17 21:49:59';
    website_url?: string;
    youtube_url?: string;
};

interface State {
    searchUsers: User[];
    sidebarUsers: User[];
    loadingSidebar: boolean;
    loadingSearch: boolean;
    error: string | null;
}

// ✅ Trạng thái ban đầu
const initialState: State = {
    searchUsers: [],
    sidebarUsers: [],
    loadingSidebar: false,
    loadingSearch: false,
    error: null,
};

// Đây là một Redux Toolkit API giúp tạo thunk action để xử lý bất đồng bộ (async)
export const getSearchUsers = createAsyncThunk<User[], { query: string; type: 'more' | 'less' }>(
    // <User[], { query: string; type: 'more' | 'less' }>
    // trả về: User[]
    // tham số đầu vào (payload): { query: string; type: 'more' | 'less' }
    'users/getSearchUsers',
    async ({ query, type }, { rejectWithValue }) => {
        try {
            // `https://tiktok.fullstack.edu.vn/api/users/search?q=${query}&type=${type}`
            const response = await request.get(`users/search`, {
                params: { q: query, type },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// createAsyncThunk giúp gọi API dễ dàng trong Redux
export const getSideBarUsers = createAsyncThunk<User[], { query: string; type: 'more' | 'less' }>(
    // <User[], { query: string; type: 'more' | 'less' }>
    // trả về: User[]
    // tham số đầu vào (payload): { query: string; type: 'more' | 'less' }
    'users/getSideBarUsers',
    async ({ query, type }, { rejectWithValue }) => {
        try {
            // `https://tiktok.fullstack.edu.vn/api/users/search?q=${query}&type=${type}`
            // quá trình gọi API để lấy dữ liệu từ server.
            const response = await request.get(`users/search`, {
                params: { q: query, type },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

// ✅ Slice quản lý state user
export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetSearchUsers(state) {
            state.searchUsers = [];
            state.error = null;
        },
    },
    // extraReducers giúp quản lý trạng thái khi gọi API
    extraReducers: (builder) => {
        builder
            .addCase(getSearchUsers.pending, (state) => {
                state.loadingSearch = true;
                state.error = null;
            })
            .addCase(getSearchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loadingSearch = false;
                state.searchUsers = action.payload;
            })
            .addCase(getSearchUsers.rejected, (state, action) => {
                state.loadingSearch = false;
                state.error = action.payload as string;
            })
            .addCase(getSideBarUsers.pending, (state) => {
                state.loadingSidebar = true;
                state.error = null;
            })
            .addCase(getSideBarUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loadingSidebar = false;
                state.sidebarUsers = action.payload;
            })
            .addCase(getSideBarUsers.rejected, (state, action) => {
                state.loadingSidebar = false;
                state.error = action.payload as string;
            });
    },
});

// ✅ Xuất reducer và actions
export const { resetSearchUsers } = UsersSlice.actions;
// export default listUsersSlice.reducer;
