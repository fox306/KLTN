import categoriesApi from '@/apis/category';
import { Category, updateCateImg } from '@/types/type';
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
export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (category: Category, { dispatch, rejectWithValue }) => {
        try {
            const res = await categoriesApi.createCategory(category);
            await dispatch(getAllCategory);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const updateCategoryImg = createAsyncThunk(
    'categories/updateCategoryImg',
    async (item: updateCateImg, { dispatch, rejectWithValue }) => {
        try {
            const res = await categoriesApi.updateCateImg(item);
            await dispatch(getAllCategory);

            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const deleteCateById = createAsyncThunk(
    'categories/deleteCateById',
    async (category: string, { dispatch, rejectWithValue }) => {
        try {
            const res = await categoriesApi.deleteCateById(category);
            await dispatch(getAllCategory);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const deleteAllCate = createAsyncThunk('categories/deleteAllCate', async (_, { dispatch, rejectWithValue }) => {
    try {
        const res = await categoriesApi.deleteAllCate();
        await dispatch(getAllCategory);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

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
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateCategoryImg.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCategoryImg.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateCategoryImg.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteCateById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCateById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteCateById.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteAllCate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAllCate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteAllCate.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default categorySlice.reducer;
