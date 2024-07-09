import usersApi from '@/apis/user';
import { User, findUser, upAvatar, updatePassword } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllUser = createAsyncThunk('users/getAllUser', async (pageNumber: number, { rejectWithValue }) => {
    try {
        const res = await usersApi.getAllUser(pageNumber);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const lockUser = createAsyncThunk('users/lockUser', async (user: string, { dispatch, rejectWithValue }) => {
    try {
        const res = await usersApi.lockUser(user);
        // await dispatch(getAllUser);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const unlockUser = createAsyncThunk('users/unlockUser', async (user: string, { dispatch, rejectWithValue }) => {
    try {
        const res = await usersApi.unlockUser(user);
        // await dispatch(getAllUser);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

// export const uploadAvatar = createAsyncThunk(
//     'users/upLoadAvatar',
//     async (user: upAvatar, { dispatch, rejectWithValue }) => {
//         try {
//             const res = await usersApi.uploadAvatar(user);
//             await dispatch(getUser(user.user));
//             return res;
//         } catch (err: any) {
//             return rejectWithValue(err.res.data);
//         }
//     },
// );
export const getAllUserByStatus = createAsyncThunk(
    'users/getAllUserByStatus',
    async (status: string, { dispatch, rejectWithValue }) => {
        try {
            const res = await usersApi.getAllUserByStatus(status);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const findUserByKeyword = createAsyncThunk(
    'users/findUserByKeyword',
    async (item: findUser, { dispatch, rejectWithValue }) => {
        try {
            const res = await usersApi.findUserByKeyword(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        users: [],
        pages: 0,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data.data;
            state.pages = action.payload.data.pages;
        });
        builder.addCase(lockUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(lockUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(lockUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(unlockUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(unlockUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(unlockUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getAllUserByStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUserByStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllUserByStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data.data;
        });
        builder.addCase(findUserByKeyword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findUserByKeyword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(findUserByKeyword.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data.data;
        });
    },
});

export default userSlice.reducer;
