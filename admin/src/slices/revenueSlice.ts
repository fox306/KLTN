import revenueApi from '@/apis/revenue';
import { brandYear, cateYear, day } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRevenueToday = createAsyncThunk('revenue/getRevenueToday', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getRevenueToday();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getRevenueThisMonth = createAsyncThunk('revenue/getRevenueThisMonth', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getRevenueThisMonth();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const getDetailRevenueOfMonth = createAsyncThunk(
    'revenue/getDetailRevenueOfMonth',
    async (item: day, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailRevenueOfMonth(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getRevenueThisWeek = createAsyncThunk('revenue/getRevenueThisWeek', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getRevenueThisWeek();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getDetailRevenueThisWeek = createAsyncThunk(
    'revenue/getDetailRevenueThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailRevenueThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getToTalUser = createAsyncThunk('revenue/getToTalUser', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getToTalUser();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getToTalUserThisMonth = createAsyncThunk(
    'revenue/getToTalUserThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getToTalUserThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getTotalUserThisWeek = createAsyncThunk('revenue/getTotalUserThisWeek', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getTotalUserThisWeek();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getDetailTotalNewUserOfMonth = createAsyncThunk(
    'revenue/getDetailTotalNewUserOfMonth',
    async (item: day, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalNewUserOfMonth(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTopUserThisMonth = createAsyncThunk('revenue/getTopUserThisMonth', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getTopUserThisMonth();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getTotalOrderToday = createAsyncThunk('revenue/getTotalOrderToday', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getTotalOrderToday();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getTotalOrderThisWeek = createAsyncThunk(
    'revenue/getTotalOrderThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalOrderThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getTotalOrderThisMonth = createAsyncThunk(
    'revenue/getTotalOrderThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalOrderThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalOrderThisWeek = createAsyncThunk(
    'revenue/getDetailTotalOrderThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalOrderThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalOrderOfMonth = createAsyncThunk(
    'revenue/getDetailTotalOrderOfMonth',
    async (item: day, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalOrderOfMonth(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTotalProductSoldToday = createAsyncThunk(
    'revenue/getTotalProductSoldToday',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalProductSoldToday();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTotalProductSoldThisWeek = createAsyncThunk(
    'revenue/getTotalProductSoldThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalProductSoldThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getTotalProductSoldThisMonth = createAsyncThunk(
    'revenue/getTotalProductSoldThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalProductSoldThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTopTotalProductSoldThisMonth = createAsyncThunk(
    'revenue/getTopTotalProductSoldThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTopTotalProductSoldThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalProductSoldOfMonth = createAsyncThunk(
    'revenue/getDetailTotalProductSoldOfMonth',
    async (item: day, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalProductSoldOfMonth(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getEachBrand = createAsyncThunk('revenue/getEachBrand', async (item: day, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getEachBrand(item);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getEachCate = createAsyncThunk('revenue/getEachCate', async (item: day, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getEachCate(item);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const detailBrand = createAsyncThunk('revenue/detailBrand', async (item: brandYear, { rejectWithValue }) => {
    try {
        const res = await revenueApi.detailBrand(item);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const detailCate = createAsyncThunk('revenue/detailCate', async (item: cateYear, { rejectWithValue }) => {
    try {
        const res = await revenueApi.detailCate(item);
        console.log(res);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const revenueSlice = createSlice({
    name: 'revenue',
    initialState: {
        today: {},
        thisWeek: {},
        thisMonth: {},
        detailMonth: {},
        detailWeek: {},
        eachBrand: {},
        eachCate: {},
        detailMonthCB: {},
        top: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        //Revenue
        builder.addCase(getRevenueToday.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueToday.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getRevenueToday.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getRevenueThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getRevenueThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailRevenueOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailRevenueOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailRevenueOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getRevenueThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getRevenueThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.thisWeek = action.payload.data.data;
        });
        builder.addCase(getDetailRevenueThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailRevenueThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailRevenueThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.detailWeek = action.payload.data.data;
        });

        //User
        builder.addCase(getToTalUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getToTalUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getToTalUser.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getTotalUserThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalUserThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalUserThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getToTalUserThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getToTalUserThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getToTalUserThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisWeek = action.payload.data.data;
        });
        builder.addCase(getDetailTotalNewUserOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalNewUserOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalNewUserOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getTopUserThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTopUserThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTopUserThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.top = action.payload.data.data;
        });

        //Orders
        builder.addCase(getTotalOrderToday.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalOrderToday.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalOrderToday.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getTotalOrderThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalOrderThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalOrderThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.thisWeek = action.payload.data.data;
        });
        builder.addCase(getTotalOrderThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalOrderThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalOrderThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailTotalOrderThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalOrderThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalOrderThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.detailWeek = action.payload.data.data;
        });
        builder.addCase(getDetailTotalOrderOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalOrderOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalOrderOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });

        //Products
        builder.addCase(getTotalProductSoldToday.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalProductSoldToday.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalProductSoldToday.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getTotalProductSoldThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalProductSoldThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalProductSoldThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.thisWeek = action.payload.data.data;
        });
        builder.addCase(getTotalProductSoldThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalProductSoldThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalProductSoldThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailTotalProductSoldOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalProductSoldOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalProductSoldOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getTopTotalProductSoldThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTopTotalProductSoldThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTopTotalProductSoldThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.top = action.payload.data.data;
        });

        builder.addCase(getEachBrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEachBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getEachBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.eachBrand = action.payload.data.data;
        });

        builder.addCase(getEachCate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEachCate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getEachCate.fulfilled, (state, action) => {
            state.loading = false;
            state.eachCate = action.payload.data.data;
        });

        builder.addCase(detailBrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(detailBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(detailBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonthCB = action.payload.data.data;
        });

        builder.addCase(detailCate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(detailCate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(detailCate.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonthCB = action.payload.data.data;
        });
    },
});

export default revenueSlice.reducer;
