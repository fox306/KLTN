import variantsApi from '@/apis/variants';
import { getQtyOfSizeColor } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getColorOfSize = createAsyncThunk(
    'variants/getColorOfSize',
    async (item: getQtyOfSizeColor, { rejectWithValue }) => {
        try {
            const res = await variantsApi.getColorOfSize(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const variantSlice = createSlice({
    name: 'variants',
    initialState: {
        quantity: Number,
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColorOfSize.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getColorOfSize.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getColorOfSize.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.quantity = action.payload.data.data.quantity;
        });
    },
});

export default variantSlice.reducer;
