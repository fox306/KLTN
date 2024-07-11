import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

export const userNav = [
    {
        icon: AccountCircleOutlined,
        route: '/user',
        label: 'Profile',
    },
    {
        icon: LockOutlined,
        route: '/user/changePassword',
        label: 'Change Password',
    },
    {
        icon: PlaceOutlined,
        route: '/user/address',
        label: 'Addresses',
    },
    {
        icon: ArticleOutlined,
        route: '/user/orders',
        label: 'Orders',
    },
    {
        icon: DiscountOutlinedIcon,
        route: '/user/discounts',
        label: 'Discounts',
    },
    {
        icon: FavoriteBorderRoundedIcon,
        route: '/user/favorites',
        label: 'Favorites',
    },
];
