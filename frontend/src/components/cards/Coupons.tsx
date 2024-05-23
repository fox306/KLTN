import { ListCoupon, ValidCoupons } from '@/types/type';
import React, { Dispatch, SetStateAction } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

type Props = {
    setActive: Dispatch<SetStateAction<boolean>>;
    listCoupons: ListCoupon;
    setDiscount: Dispatch<SetStateAction<ValidCoupons | undefined>>;
};

const Coupons = ({ setActive, listCoupons, setDiscount }: Props) => {
    const handleSetDiscount = (item: ValidCoupons) => {
        setDiscount(item);
        setActive(false);
    };
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center py-10 px-[60px] rounded-md shadow-form gap-5 relative">
                <span className="font-semibold text-xl">List Coupons</span>

                <ClearRoundedIcon
                    fontSize="large"
                    className="text-orange cursor-pointer absolute right-[10px] top-[10px]"
                    onClick={() => setActive(false)}
                />
                <span className="text-base font-medium">Valid Coupon</span>
                <div className={`${listCoupons.validCoupons.length !== 0 ? 'grid grid-cols-2 gap-4' : ''}`}>
                    {listCoupons.validCoupons.length !== 0 ? (
                        listCoupons.validCoupons.map((item) => (
                            <div
                                className="border h-[116px] p-4 flex flex-col justify-center items-center"
                                onClick={() => handleSetDiscount(item)}
                            >
                                <div className="flex items-center justify-between font-bold text-lg w-full">
                                    <span>Code: {item.code} </span>
                                    <span>Name: {item.name} </span>
                                </div>
                                <span className="font-semibold">Minimum Orders: {item.minAmount}</span>

                                <span>Effective from: {item.startDate}</span>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            <span>You dont have Coupon yet. Review some Product to get</span>
                        </div>
                    )}
                </div>
                {listCoupons.recommendCoupons.length !== 0 && (
                    <span className="text-base font-medium">Valid Coupon</span>
                )}

                <div className={`${listCoupons.recommendCoupons.length !== 0 ? 'grid grid-cols-2 gap-4' : ''}`}>
                    {listCoupons.recommendCoupons.length !== 0 &&
                        listCoupons.recommendCoupons.map((item) => (
                            <div
                                className="border h-[116px] p-4 flex flex-col justify-center items-center"
                                onClick={() => handleSetDiscount(item)}
                            >
                                <div className="flex items-center justify-between font-bold text-lg w-full">
                                    <span>Code: {item.code} </span>
                                    <span>Name: {item.name} </span>
                                </div>
                                <span className="font-semibold">Minimum Orders: {item.minAmount}</span>

                                <span>Effective from: {item.startDate}</span>
                                <span>{item.recommend}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Coupons;
