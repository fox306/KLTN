import React from 'react';
type Props = {
    detail: string;
};

const ShoeInfo = ({ detail }: Props) => {
    return (
        <div className="flex flex-col">
            <span>Thông tin sản phẩm:</span>
            <p className="text-justify">{detail}</p>
        </div>
    );
};

export default ShoeInfo;
