import usersApi from '@/apis/users';
import { User, upAvatar, updatePassword, upUser } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('users/getUser', async (userId: string, { rejectWithValue }) => {
    try {
        const res = await usersApi.getUser(userId);
        localStorage.setItem('user', JSON.stringify(res.data.data));
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: upUser, { dispatch, rejectWithValue }) => {
    try {
        const res = await usersApi.updateUser(user);
        await dispatch(getUser(user.user));
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const uploadAvatar = createAsyncThunk(
    'users/upLoadAvatar',
    async (user: upAvatar, { dispatch, rejectWithValue }) => {
        try {
            const res = await usersApi.uploadAvatar(user);
            await dispatch(getUser(user.user));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const updateUserPasswordByUserId = createAsyncThunk(
    'users/updateUserPasswordByUserId',
    async (user: updatePassword, { rejectWithValue }) => {
        try {
            const res = await usersApi.updateUserPasswordByUserId(user);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.data;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(uploadAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadAvatar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateUserPasswordByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserPasswordByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateUserPasswordByUserId.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default userSlice.reducer;
