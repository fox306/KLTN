import ordersApi from '@/apis/orders';
import { Order, checkoutOrder, orderStatus, updateOrder } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllOrderByUserId = createAsyncThunk(
    'orders/getAllOrderByUserId',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await ordersApi.getAllOrderByUserId(userId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getAllOrderByUserAndStatus = createAsyncThunk(
    'orders/getAllOrderByUserAndStatus',
    async (item: orderStatus, { rejectWithValue }) => {
        try {
            const res = await ordersApi.getAllOrderByUserAndStatus(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getOrderByOrderId = createAsyncThunk(
    'orders/getOrderByOrderId',
    async (order: string, { rejectWithValue }) => {
        try {
            const res = await ordersApi.getOrderByOrderId(order);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (item: checkoutOrder, { dispatch, rejectWithValue }) => {
        try {
            const res = await ordersApi.createOrder(item);
            await dispatch(getAllOrderByUserId(item.userID));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const cancelOrderByOrderId = createAsyncThunk(
    'orders/cancelOrderByOrderId',
    async (order: string, { rejectWithValue }) => {
        try {
            const res = await ordersApi.cancelOrderByOrderId(order);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const returnOrder = createAsyncThunk('orders/returnOrder', async (order: string, { rejectWithValue }) => {
    try {
        const res = await ordersApi.returnOrder(order);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const receivedOrder = createAsyncThunk('orders/receivedOrder', async (order: string, { rejectWithValue }) => {
    try {
        const res = await ordersApi.receivedOrder(order);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrderByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrderByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllOrderByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data.data;
        });
        builder.addCase(getAllOrderByUserAndStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrderByUserAndStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
            state.orders = [];
        });
        builder.addCase(getAllOrderByUserAndStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data.data;
        });
        builder.addCase(getOrderByOrderId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrderByOrderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getOrderByOrderId.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload.data;
        });
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(cancelOrderByOrderId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancelOrderByOrderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(cancelOrderByOrderId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(returnOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(returnOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(returnOrder.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(receivedOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(receivedOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(receivedOrder.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default orderSlice.reducer;
