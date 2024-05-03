import categoriesApi from '@/apis/categories';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllCategory = createAsyncThunk('categories/getAllCategory', async (_, { rejectWithValue }) => {
    try {
        const res = await categoriesApi.getAllCategory();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const getCategoryById = createAsyncThunk(
    'categories/getCategoryById',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const res = await categoriesApi.getCategoryById(categoryId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        category: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.data;
        });
        builder.addCase(getCategoryById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.data.data;
        });
    },
});

export default categorySlice.reducer;
