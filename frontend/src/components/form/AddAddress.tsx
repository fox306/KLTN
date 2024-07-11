'use client';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Address, AddressLess, District, Province, UpdateAddress, User, Ward } from '@/types/type';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { createAddress, updateAddressByAddressId } from '@/slices/addressSlice';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from '@/utils/axios';
type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
    addressDetail: Address;
    addressId: string;
    setLoad: Dispatch<SetStateAction<boolean>>;
    province: Province[] | undefined;
    setProvince: Dispatch<SetStateAction<Province[] | undefined>>;
    provinceID: string;
    setProvinceID: Dispatch<SetStateAction<string>>;
    districtID: string;
    setDistrictID: Dispatch<SetStateAction<string>>;
    district: District[] | undefined;
    setDistrict: Dispatch<SetStateAction<District[] | undefined>>;
    setAddressId: Dispatch<SetStateAction<string>>;
    ward: Ward[] | undefined;
    setWard: Dispatch<SetStateAction<Ward[] | undefined>>;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 132,
        },
    },
};
const AddAddress = ({
    setOpen,
    update,
    setUpdate,
    addressDetail,
    addressId,
    setLoad,
    province,
    provinceID,
    setProvinceID,
    districtID,
    setDistrictID,
    district,
    setDistrict,
    setAddressId,
    ward,
    setWard,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const userString = localStorage.getItem('user');
    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const [address, setAddress] = useState<AddressLess>({
        user: id,
        receiver: update ? addressDetail.receiver : '',
        phone: update ? addressDetail.phone : '',
        province: update ? addressDetail.province : '',
        districts: update ? addressDetail.districts : '',
        wards: update ? addressDetail.wards : '',
        specific: update ? addressDetail.specific : '',
    });
    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const handleChangeSelect = (e: SelectChangeEvent<string>) => {
        const selectedProvince = province?.find((item) => item.province_name === e.target.value);
        const selectedDistrict = district?.find((item) => item.district_name === e.target.value);
        setAddress((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (selectedProvince) {
            setProvinceID(selectedProvince.provinceId);
        }
        if (selectedDistrict) {
            setDistrictID(selectedDistrict.districtId);
        }

        console.log(e.target.value);
    };
    const handleCheck = () => {
        if (
            !address.receiver ||
            !address.phone ||
            !address.province ||
            !address.specific ||
            !address.wards ||
            !address.districts
        ) {
            {
                toast.error('Please fill enough info');
                return false;
            }
        }
        return true;
    };
    const handleSumbit = async () => {
        if (update) {
            try {
                const isValid = handleCheck();
                if (!isValid) return;
                const item: UpdateAddress = {
                    address: addressId,
                    ...address,
                };
                const res = await dispatch(updateAddressByAddressId(item));

                if ((res.payload as { status: number }).status === 200) {
                    setOpen(false);
                    setUpdate(false);
                    setLoad((prev) => !prev);
                    toast.success('Update Address success');
                }
            } catch (error) {
                toast.error('Wrong info');
            }
        } else {
            try {
                const isValid = handleCheck();
                if (!isValid) return;
                const res = await dispatch(createAddress(address));
                if ((res.payload as { status: number }).status === 201) {
                    setOpen(false);
                    setLoad((prev) => !prev);
                    toast.success('Add Address success');
                }
            } catch (error) {
                toast.error('Wrong info');
            }
        }
    };
    const handleCancel = () => {
        if (update) {
            setUpdate(false);
            setOpen(false);
            setAddressId('');
        } else {
            setOpen(false);
        }
    };
    console.log(provinceID);
    useEffect(() => {
        const fetchDistrict = async () => {
            const { data } = await axios.get(`/utils/provinces/districts/${provinceID}`);

            console.log(data.result);
            setDistrict(data.result);
        };
        if (provinceID) {
            console.log('Hi');
            console.log(provinceID);
            fetchDistrict();
        }
    }, [provinceID]);
    console.log(district);
    useEffect(() => {
        const fetchWard = async () => {
            const { data } = await axios.get(`/utils/provinces/districts/wards/${districtID}`);

            setWard(data.result);
        };
        if (districtID) {
            fetchWard();
        }
    }, [districtID]);

    return (
        <div className="modal">
            <div className="modal-container">
                <div className="flex items-center justify-between mb-[10px]">
                    <span className="font-bold text-xl">{update ? 'Update' : 'New'} Delivery Address</span>
                    <ClearRoundedIcon onClick={handleCancel} fontSize="large" className="text-orange cursor-pointer" />
                </div>
                <span className="font-medium">Where you want to receive your orders!!!</span>
                <div className="flex gap-10 flex-col mt-10 mb-5">
                    <div className="flex gap-10 items-center">
                        <TextField
                            onChange={handleChangeText}
                            id="receiver"
                            label="Reveiver Name"
                            variant="outlined"
                            className="w-[360px] h-[70px]"
                            defaultValue={address.receiver}
                        />
                        <TextField
                            onChange={handleChangeText}
                            id="phone"
                            label="Phone Number"
                            variant="outlined"
                            className="w-[360px] h-[70px]"
                            defaultValue={address.phone}
                        />
                    </div>
                    <div className="flex gap-5">
                        <Select
                            className="w-[240px] h-[56px]"
                            value={address.province}
                            name="province"
                            MenuProps={MenuProps}
                            onChange={handleChangeSelect}
                        >
                            {province?.map((item: Province) => (
                                <MenuItem key={item.provinceId} value={item.province_name}>
                                    {item.province_name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Select
                            className="w-[240px] h-[56px]"
                            value={address.districts}
                            name="districts"
                            MenuProps={MenuProps}
                            onChange={handleChangeSelect}
                        >
                            {district?.map((item: District) => (
                                <MenuItem key={item.districtId} value={item.district_name}>
                                    {item.district_name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            className="w-[240px] h-[56px]"
                            value={address.wards}
                            name="wards"
                            MenuProps={MenuProps}
                            onChange={handleChangeSelect}
                        >
                            {ward?.map((item: Ward) => (
                                <MenuItem key={item.wardId} value={item.ward_name}>
                                    {item.ward_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <TextField
                            onChange={handleChangeText}
                            id="specific"
                            label="Specific Address"
                            variant="outlined"
                            className="w-full"
                            defaultValue={address.specific}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between font-medium text-xl">
                    <button
                        onClick={handleCancel}
                        className="w-[360px] h-[60px] text-red bg-red bg-opacity-20 rounded-full"
                    >
                        Cancel
                    </button>
                    <div
                        onClick={handleSumbit}
                        className="w-[360px] h-[60px] cursor-pointer flex items-center justify-center gap-[6px] text-blue bg-blue bg-opacity-20 rounded-full"
                    >
                        <CloudUploadOutlinedIcon />
                        <span>Save</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAddress;
