'use client';
import React, { useEffect, useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
type Props = {
    isFavorite: boolean;
};
const FavoriteIcon = ({ isFavorite }: Props) => {
    const [isIconFavorite, setIsIconFavorite] = useState(isFavorite);

    useEffect(() => {
        setIsIconFavorite(isFavorite);
    }, [isFavorite]);
    console.log(isIconFavorite);
    return (
        <div>
            {isIconFavorite ? (
                <FavoriteRoundedIcon className="w-5 h-5 text-orange" />
            ) : (
                <FavoriteBorderRoundedIcon className="w-5 h-5 text-orange" />
            )}
        </div>
    );
};

export default FavoriteIcon;
