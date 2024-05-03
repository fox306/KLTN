import React, { useEffect, useState } from 'react';

const Text = () => {
    const [text, setText] = useState('Sản phẩm đẹp, đúng với mô tả. Giao hàng nhanh chóng. Shipper nhiệt tình.');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('YOUR_API_ENDPOINT');
    //             const data = await response.text();
    //             setText(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const formatText = (text: any) => {
        const firstDotIndex = text.indexOf('.');
        const modifiedText = (
            <>
                {text.substring(0, firstDotIndex + 1)}
                <br />
                {text.substring(firstDotIndex + 1)}
            </>
        );
        return modifiedText;
    };

    return <div>{formatText(text)}</div>;
};

export default Text;
