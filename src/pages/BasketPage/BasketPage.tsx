import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { basketStore } from '../../store/basketStore';
import { BasketCard } from '../../components/BasketCard/BasketCard';
import { Box } from '@mui/material';

export const BasketPage: FC = observer(() => {
    return (
        <main>
            <Box sx={{ fontSize: '1.5rem' }}>Summary price: {basketStore.basketSumPrice} $</Box>
            <br />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {basketStore.cardsInBasket.map((card) => {
                    return <BasketCard item={card} key={card.id} />;
                })}
            </Box>
        </main>
    );
});
