import Image from 'next/image';
import React from 'react';

const Loading = () => {
    return (
        <div className="modal">
            <div className="flex items-center justify-center">
                <Image
                    src="/loading.gif"
                    alt="Loading"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px] rounded-full"
                />
            </div>
        </div>
    );
};

export default Loading;
