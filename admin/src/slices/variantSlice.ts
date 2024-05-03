import variantApi from '@/apis/variant';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getDetailByProduct = createAsyncThunk(
    'variants/getDetailByProduct',
    async (product: string, { rejectWithValue }) => {
        try {
            const res = await variantApi.getDetaillByProduct(product);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const variantSlice = createSlice({
    name: 'variants',
    initialState: {
        variants: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDetailByProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailByProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailByProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.variants = action.payload.data.data;
        });
    },
});

export default variantSlice.reducer;
