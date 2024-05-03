import addressApi from '@/apis/address';
import { Address, AddressLess, UpdateAddress } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllAddressByUserId = createAsyncThunk(
    'address/getAllAddressByUserId',
    async (user: string, { rejectWithValue }) => {
        try {
            const res = await addressApi.getAllAddressByUserId(user);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getAddressByAddressId = createAsyncThunk(
    'address/getAddressByAddressId',
    async (address: string, { rejectWithValue }) => {
        try {
            const res = await addressApi.getAddressByAddressId(address);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const createAddress = createAsyncThunk(
    'address/createAddress',
    async (address: AddressLess, { dispatch, rejectWithValue }) => {
        try {
            const res = await addressApi.createAddress(address);
            await dispatch(getAllAddressByUserId(address.user));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const updateAddressByAddressId = createAsyncThunk(
    'address/updateAddressByAddressId',
    async (address: UpdateAddress, { dispatch, rejectWithValue }) => {
        try {
            const res = await addressApi.updateAddressByAddressId(address);
            // await dispatch(getAllAddressByUserId(address.user));
            // await dispatch(getAddressByAddressId(address._id as string));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const setDefaultAddressByAddressId = createAsyncThunk(
    'address/setDefaultAddressByAddressId',
    async (address: Address, { dispatch, rejectWithValue }) => {
        try {
            const res = await addressApi.setDefaultAddressByAddressId(address);
            await dispatch(getAllAddressByUserId(address.user));
            await dispatch(getAddressByAddressId(address._id as string));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const unsetDefaultAddressByAddressId = createAsyncThunk(
    'address/unsetDefaultAddressByAddressId',
    async (address: Address, { dispatch, rejectWithValue }) => {
        try {
            const res = await addressApi.unsetDefaultAddressByAddressId(address);
            await dispatch(getAllAddressByUserId(address.user));
            await dispatch(getAddressByAddressId(address._id as string));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const deleteAllAddressByUserId = createAsyncThunk(
    'address/deleteAllAddressByUserId',
    async (user: string, { dispatch, rejectWithValue }) => {
        try {
            const res = await addressApi.deleteAllAddressByUserId(user);
            await dispatch(getAllAddressByUserId(user));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const deleteAddressByAddressId = createAsyncThunk(
    'address/deleteAddressByAddressId',
    async (address: Address, { dispatch, rejectWithValue }) => {
        try {
            const res = await addressApi.deleteAddressByAddressId(address);
            await dispatch(getAllAddressByUserId(address.user));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

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
        builder.addCase(getAllAddressByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAddressByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllAddressByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.data.data;
        });
        builder.addCase(getAddressByAddressId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAddressByAddressId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAddressByAddressId.fulfilled, (state, action) => {
            state.loading = false;
            state.addressDetail = action.payload.data.data;
        });
        builder.addCase(createAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createAddress.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateAddressByAddressId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAddressByAddressId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateAddressByAddressId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(setDefaultAddressByAddressId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(setDefaultAddressByAddressId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(setDefaultAddressByAddressId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(unsetDefaultAddressByAddressId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(unsetDefaultAddressByAddressId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(unsetDefaultAddressByAddressId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteAllAddressByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAllAddressByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteAllAddressByUserId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteAddressByAddressId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAddressByAddressId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteAddressByAddressId.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default addressSlice.reducer;
