import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

export const adminNav = [
    {
        icon: HomeRoundedIcon,
        route: '/',
        label: 'Home',
    },
    {
        icon: AccountCircleRoundedIcon,
        route: '/users',
        label: 'Users',
    },
    {
        icon: ArticleRoundedIcon,
        route: '/order',
        label: 'Orders',
    },
    {
        icon: ListAltRoundedIcon,
        route: '/categories',
        label: 'Categories',
    },
    {
        icon: WarehouseRoundedIcon,
        route: '/warehouse',
        label: 'Warehouse',
    },
    {
        icon: MonetizationOnRoundedIcon,
        route: '/price',
        label: 'Price',
    },
    {
        icon: MonetizationOnRoundedIcon,
        route: '/coupons',
        label: 'Coupons',
    },
    {
        icon: MonetizationOnRoundedIcon,
        route: '/supplier',
        label: 'Suppliers',
    },
    {
        icon: MonetizationOnRoundedIcon,
        route: '/goodReceipt',
        label: 'Good Receipts',
    },
];
