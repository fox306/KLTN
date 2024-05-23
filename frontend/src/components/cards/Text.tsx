import React, { useEffect, useState } from 'react';

type Props = {
    review: string;
};

const Text = ({ review }: Props) => {
    const [text, setText] = useState(review);

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
        if (text) {
            const firstDotIndex = text.indexOf('.');
            const modifiedText = (
                <>
                    {text.substring(0, firstDotIndex + 1)}
                    <br />
                    {text.substring(firstDotIndex + 1)}
                </>
            );
            return modifiedText;
        }
    };

    return <div>{formatText(text)}</div>;
};

export default Text;
