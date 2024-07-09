import Image from 'next/image';
import React from 'react';

const NoData = () => {
    return (
        <div className="flex justify-center items-center">
            <Image
                src="/noData.jpg"
                alt="No Data"
                width={300}
                height={300}
                className="rounded-[5px] w-[300px] h-[300px]"
            />
        </div>
    );
};

export default NoData;
