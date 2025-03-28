import { FC, useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IBasketButtonProps } from './BasketButton.types';
import { basketStore } from '../../store/basketStore';

export const BasketButton: FC<IBasketButtonProps> = ({ item }) => {
    const [isItemInBasket, setIsItemInBasket] = useState(basketStore.isItemInBasket(item.id));

    const handleButtonClick = useCallback(() => {
        if (isItemInBasket) {
            console.log('remove');
            basketStore.removeFromBasket(item.id);
            setIsItemInBasket(false);
        } else {
            console.log('set');
            basketStore.addCardToBasket(item);
            setIsItemInBasket(true);
        }
    }, [isItemInBasket, item]);

    return (
        <IconButton onClick={handleButtonClick} aria-label="settings">
            {isItemInBasket ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
        </IconButton>
    );
};
