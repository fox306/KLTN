import cartsApi from '@/apis/carts';
import { Cart, ItemCart, ItemCartFake, RemoveItemCart, itemCartRandomVari } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCartByUserId = createAsyncThunk(
    'carts/getCartByUserId',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await cartsApi.getCartByUserId(userId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const createCart = createAsyncThunk('carts/createCart', async (user: string, { rejectWithValue }) => {
    try {
        const res = await cartsApi.createCart(user);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const addItemToCartByUserId = createAsyncThunk(
    'carts/addItemToCartByUserId',
    async (item: ItemCartFake, { dispatch, rejectWithValue }) => {
        try {
            const res = await cartsApi.addItemToCartByUserId(item);
            await dispatch(getCartByUserId(item.user as string));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const removeItemFromCartByUserId = createAsyncThunk(
    'carts/removeItemFromCartByUserId',
    async (item: RemoveItemCart, { dispatch, rejectWithValue }) => {
        try {
            const res = await cartsApi.removeItemFromCartByUserId(item);
            console.log(res);
            await dispatch(getCartByUserId(item.user));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const addItemToCartRandomVariant = createAsyncThunk(
    'carts/addItemToCartRandomVariant',
    async (item: itemCartRandomVari, { dispatch, rejectWithValue }) => {
        try {
            const res = await cartsApi.addItemToCartRandomVariant(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        cartItem: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addItemToCartByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addItemToCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(addItemToCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItem = action.payload.data;
        });
        builder.addCase(getCartByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItem = action.payload.data.data;
        });
        builder.addCase(removeItemFromCartByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeItemFromCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(removeItemFromCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            // state.cartItem = action.payload.data.data;
        });
        builder.addCase(addItemToCartRandomVariant.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addItemToCartRandomVariant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(addItemToCartRandomVariant.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default cartSlice.reducer;
