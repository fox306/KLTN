import productsApi from '@/apis/product';
import { Product, ProductByStatus, findProduct } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllProduct = createAsyncThunk(
    'products/getAllProduct',
    async (pageNumber: number, { rejectWithValue }) => {
        try {
            const res = await productsApi.getAllProduct(pageNumber);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);
export const getAllProductByStatus = createAsyncThunk(
    'products/getAllProductByStatus',
    async (item: ProductByStatus, { rejectWithValue }) => {
        try {
            const res = await productsApi.getAllProductByStatus(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);
export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (product: string, { rejectWithValue }) => {
        try {
            const res = await productsApi.getProductById(product);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);
export const getAllProductByCateId = createAsyncThunk(
    'products/getAllProductByCateId',
    async (category: string, { rejectWithValue }) => {
        try {
            const res = await productsApi.getAllProductByCateId(category);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product: Product, { rejectWithValue }) => {
        try {
            const res = await productsApi.createProduct(product);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const updateProductByProductId = createAsyncThunk(
    'products/updateProductByProductId',
    async (product: string, { rejectWithValue }) => {
        try {
            const res = await productsApi.updateProductByProductId(product);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const updateStatusProductByProductId = createAsyncThunk(
    'products/updateStatusProductByProductId',
    async (_, { rejectWithValue }) => {
        try {
            const res = await productsApi.updateStatusProductByProductId();
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);
export const deleteProductByProductId = createAsyncThunk(
    'products/deleteProductByProductId',
    async (product: string, { rejectWithValue }) => {
        try {
            const res = await productsApi.deleteProductByProductId(product);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const deleteAllProduct = createAsyncThunk('products/deleteAllProduct', async (_, { rejectWithValue }) => {
    try {
        const res = await productsApi.deleteAllProduct();
        return res;
    } catch (err: any) {
        return rejectWithValue(err);
    }
});

export const findProductByKeyword = createAsyncThunk(
    'products/findProductByKeyword',
    async (item: findProduct, { rejectWithValue }) => {
        try {
            const res = await productsApi.findProductByKeyword(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productDetail: {},
        variants: {},
        brands: [],
        pages: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data.data;
            state.pages = action.payload.data.pages;
        });
        builder.addCase(getAllProductByStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProductByStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllProductByStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data.data;
            state.pages = action.payload.data.pages;
        });
        builder.addCase(getProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = true;
            state.productDetail = action.payload.data.data.product;
            state.variants = action.payload.data.data.variants;
        });
        builder.addCase(getAllProductByCateId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProductByCateId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllProductByCateId.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data.data;
        });
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateProductByProductId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductByProductId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateProductByProductId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteProductByProductId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProductByProductId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteProductByProductId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteAllProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteAllProduct.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(findProductByKeyword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findProductByKeyword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(findProductByKeyword.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data.data;
        });
    },
});

export default productSlice.reducer;
