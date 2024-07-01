import { brandYear, cateYear, day, eachBrand } from '@/types/type';
import axios from '@/utils/axios';

const revenueApi = {
    getRevenueToday: () => {
        const url = '/revenue/today';
        return axios.get(url);
    },
    getRevenueThisMonth: () => {
        const url = '/revenue/this-month';
        return axios.get(url);
    },
    getDetailRevenueOfMonth: (item: day) => {
        const url = `/revenue/detail/by-month?month=${item.month}&year=${item.year}`;

        return axios.get(url);
    },
    getRevenueThisWeek: () => {
        const url = '/revenue/this-week';
        return axios.get(url);
    },
    getDetailRevenueThisWeek: () => {
        const url = '/revenue/detail/this-week';
        return axios.get(url);
    },
    getToTalUser: () => {
        const url = '/revenue/users/today';
        return axios.get(url);
    },
    getToTalUserThisMonth: () => {
        const url = '/revenue/users/this-month';
        return axios.get(url);
    },
    getTotalUserThisWeek: () => {
        const url = '/revenue/users/this-week';
        return axios.get(url);
    },
    getDetailTotalNewUserOfMonth: (item: day) => {
        const url = `/revenue/users/detail/by-month?month=${item.month}&year=${item.year}`;
        return axios.get(url);
    },
    getTopUserThisMonth: () => {
        const url = '/revenue/users/top';
        return axios.get(url);
    },
    getTotalOrderToday: () => {
        const url = '/revenue/orders/today';
        return axios.get(url);
    },
    getTotalOrderThisWeek: () => {
        const url = '/revenue/orders/this-week';
        return axios.get(url);
    },
    getTotalOrderThisMonth: () => {
        const url = '/revenue/orders/this-month';
        return axios.get(url);
    },
    getDetailTotalOrderThisWeek: () => {
        const url = '/revenue/orders/detail/this-week';
        return axios.get(url);
    },
    getDetailTotalOrderOfMonth: (item: day) => {
        const url = `/revenue/orders/detail/by-month?month=${item.month}&year=${item.year}`;
        const month = item.month;
        const year = item.year;
        return axios.get(url, {
            params: {
                month: month,
                year: year,
            },
        });
    },
    getTotalProductSoldToday: () => {
        const url = '/revenue/products/today';
        return axios.get(url);
    },
    getTotalProductSoldThisWeek: () => {
        const url = '/revenue/products/this-week';
        return axios.get(url);
    },
    getTotalProductSoldThisMonth: () => {
        const url = '/revenue/products/this-month';
        return axios.get(url);
    },
    getTopTotalProductSoldThisMonth: () => {
        const url = '/revenue/products/top';
        return axios.get(url);
    },
    getDetailTotalProductSoldOfMonth: (item: day) => {
        const url = `/revenue/products/detail/by-month?month=${item.month}&year=${item.year}`;
        return axios.get(url);
    },

    getEachBrand: (item: day) => {
        {
            const url = `/revenue/brand/this-month?month=${item.month}&year=${item.year}`;
            return axios.get(url);
        }
    },
    getEachCate: (item: day) => {
        const url = `/revenue/category/this-month?month=${item.month}&year=${item.year}`;
        return axios.get(url);
    },
    detailBrand: (item: brandYear) => {
        const url = `/revenue/detail/brand/by-year?brand=${item.brand}&year=${item.year}`;
        return axios.get(url);
    },
    detailCate: (item: cateYear) => {
        const url = `/revenue/detail/category/by-year?category=${item.category}&year=${item.year}`;
        return axios.get(url);
    },
};

export default revenueApi;
