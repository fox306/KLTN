import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

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
        route: '/orders',
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
        icon: DiscountOutlinedIcon,
        route: '/coupons',
        label: 'Coupons',
    },
    {
        icon: Inventory2OutlinedIcon,
        route: '/supplier',
        label: 'Suppliers',
    },
    {
        icon: LocalShippingOutlinedIcon,
        route: '/goodReceipt',
        label: 'Good Receipts',
    },
];
