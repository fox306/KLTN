'use client';

import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import authReducer from '../slices/authSlice';
import addressReducer from '../slices/addressSlice';
import productReducer from '../slices/productSlice';
import categoryReducer from '../slices/categorySlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import revenueReducer from '../slices/revenueSlice';
import variantReducer from '../slices/variantSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        address: addressReducer,
        products: productReducer,
        categories: categoryReducer,
        users: userReducer,
        orders: orderReducer,
        revenue: revenueReducer,
        variants: variantReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {},
            },
            serializableCheck: false,
        }).concat(thunkMiddleware),
    devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
