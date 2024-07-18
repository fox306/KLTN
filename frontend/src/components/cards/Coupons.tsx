import { ListCoupon, ValidCoupons } from '@/types/type';
import React, { Dispatch, SetStateAction } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { format } from 'date-fns';
import { formatCurrency } from '@/utils/convertMoney';

type Props = {
    setActive: Dispatch<SetStateAction<boolean>>;
    listCoupons: ListCoupon;
    setDiscount: Dispatch<SetStateAction<ValidCoupons | undefined>>;
    setFlag: Dispatch<SetStateAction<boolean>>;
};

const Coupons = ({ setActive, listCoupons, setDiscount, setFlag }: Props) => {
    const handleSetDiscount = (item: ValidCoupons) => {
        setDiscount(item);
        setFlag((prev) => !prev);
        setActive(false);
    };
    console.log(listCoupons);
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center py-10 px-[60px] rounded-md shadow-form gap-5 relative">
                <span className="font-semibold text-xl">List Coupons</span>

                <ClearRoundedIcon
                    fontSize="large"
                    className="text-orange cursor-pointer absolute right-[10px] top-[10px]"
                    onClick={() => setActive(false)}
                />
                {listCoupons.validCoupons.length !== 0 && (
                    <span className="text-xl font-bold w-full">Valid Coupon</span>
                )}
                <div className={`${listCoupons.validCoupons.length !== 0 ? 'grid grid-cols-2 gap-4' : ''}`}>
                    {listCoupons.validCoupons.length !== 0 ? (
                        listCoupons.validCoupons.map((item) => (
                            <div
                                key={item._id}
                                className="w-[500px] border h-[116px] p-4 flex flex-col justify-center items-center hover:border-blue cursor-pointer"
                                onClick={() => handleSetDiscount(item)}
                            >
                                <div className="flex items-center justify-between font-bold text-lg w-full">
                                    <span>Code: {item.code} </span>
                                    <span>Name: {item.name} </span>
                                </div>
                                <span className="font-semibold">Minimum Orders: {formatCurrency(item.minAmount)}</span>
                                <span className="font-semibold">
                                    Maximum Discount: {formatCurrency(item.maxDiscount)}
                                </span>
                                <span>Effective from: {format(new Date(item.startDate), 'dd-MM-yyyy')}</span>
                                <span>Expried Day: {format(new Date(item.endDate), 'dd-MM-yyyy')}</span>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            <span>You dont have Coupon yet. Review some Product to get</span>
                        </div>
                    )}
                </div>
                {listCoupons.recommendCoupons.length !== 0 && (
                    <span className="text-xl font-bold w-full">Recommend Coupons</span>
                )}

                <div className={`${listCoupons.recommendCoupons.length !== 0 ? 'grid grid-cols-2 gap-4' : ''}`}>
                    {listCoupons.recommendCoupons.length !== 0 &&
                        listCoupons.recommendCoupons.map((item) => (
                            <div
                                key={item._id}
                                className="w-[500px] border min-h-[116px] p-4 flex flex-col justify-center items-center cursor-pointer"
                            >
                                <div className="flex items-center justify-between font-bold text-lg w-full">
                                    <span>Code: {item.code} </span>
                                    <span>Name: {item.name} </span>
                                </div>
                                <span className="font-semibold">Minimum Orders: {formatCurrency(item.minAmount)}</span>
                                <span className="font-semibold">
                                    Maximum Discount: {formatCurrency(item.maxDiscount)}
                                </span>

                                <span>Effective from: {format(new Date(item.startDate), 'dd-MM-yyyy')}</span>
                                <span>Expried Day: {format(new Date(item.endDate), 'dd-MM-yyyy')}</span>
                                <span className="text-center">{item.recommend}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Coupons;
