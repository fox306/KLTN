export const formatCurrency = (amount: number) => {
    return amount?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

// export default formatCurrency;
