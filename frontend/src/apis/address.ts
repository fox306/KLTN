import { Address, AddressLess, UpdateAddress } from '@/types/type';
import axios from '../utils/axios';

const addressApi = {
    getAllAddressByUserId: (user: string) => {
        const url = `/deliveryAddress/user/${user}`;
        const pageSize = 5;
        const pageNumber = 1;
        return axios.get(url);
    },
    getAddressByAddressId: (address: string) => {
        const url = `/deliveryAddress/${address}`;
        const pageSize = 5;
        const pageNumber = 5;
        return axios.get(url);
    },
    createAddress: (address: AddressLess) => {
        const url = '/deliveryAddress';
        return axios.post(url, address);
    },
    updateAddressByAddressId: (address: UpdateAddress) => {
        const url = '/deliveryAddress';
        return axios.put(url, address);
    },
    setDefaultAddressByAddressId: (address: Address) => {
        const url = `/deliveryAddress/default/${address._id}`;
        return axios.patch(url);
    },
    unsetDefaultAddressByAddressId: (address: Address) => {
        const url = `/address/unDefault`;
        const id = address._id;
        return axios.patch(url, id);
    },
    deleteAllAddressByUserId: (user: string) => {
        const url = `/deliveryAddress/user/${user}`;
        return axios.delete(url);
    },
    deleteAddressByAddressId: (address: Address) => {
        const url = `/deliveryAddress/${address._id}`;
        return axios.delete(url);
    },
};

export default addressApi;
