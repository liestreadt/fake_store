import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { basketStore } from '../../store/basketStore';
import { BasketCard } from '../../components/BasketCard/BasketCard';
import { Box, Button } from '@mui/material';
import { Chat } from '../../components/Chat/Chat';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const connection = new WebSocket('ws://localhost:3000/');

connection.onopen = () => {
    console.log('Подключение создано');
};

connection.onclose = () => {
    console.log('Подключение окончено');
};

export const BasketPage: FC = observer(() => {
    const handleBasketClearing = useCallback(() => {
        basketStore.clearBasket();
    }, []);

    return (
        <>
            <main>
                <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between' }}>
                    <Box sx={{ fontSize: '1.5rem' }}>Summary price: {basketStore.basketSumPrice} $</Box>
                    <Button
                        onClick={handleBasketClearing}
                        sx={{ display: 'flex', gap: '1rem' }}
                        color="info"
                        variant="contained"
                    >
                        Clear basket
                        <DeleteForeverIcon />
                    </Button>
                </Box>
                <br />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {basketStore.cardsInBasket.map((card) => {
                        return <BasketCard item={card} key={card.id} />;
                    })}
                </Box>
            </main>
            <Chat wsConnection={connection} />
        </>
    );
});
