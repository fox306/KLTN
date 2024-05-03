import addressApi from '@/apis/address';
import { Address } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const deleteAllAddress = createAsyncThunk('address/deleteAllAddress', async (_, { rejectWithValue }) => {
    try {
        const res = await addressApi.deleteAllAddress();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: [],
        addressDetail: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteAllAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAllAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteAllAddress.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default addressSlice.reducer;
