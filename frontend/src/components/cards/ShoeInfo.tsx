import React from 'react';
type Props = {
    detail: string;
};

const ShoeInfo = ({ detail }: Props) => {
    const paragraphs = detail?.split('\n');
    return (
        <div className="flex flex-col">
            <span>Thông tin sản phẩm:</span>
            {paragraphs?.map((paragraph, index) => (
                <React.Fragment key={index}>
                    {paragraph.includes('Đặc điểm nổi bật:') ? (
                        <>
                            <br />
                            <span dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br>') }} />
                        </>
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br>') }} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ShoeInfo;
