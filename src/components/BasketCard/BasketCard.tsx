import { Box, CardContent, CardMedia, IconButton, Card as MuiCard } from '@mui/material';
import { ICardProps } from '../Card/Card.types';
import { FC, useCallback } from 'react';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { basketStore } from '../../store/basketStore';

export const BasketCard: FC<ICardProps> = ({ item }) => {
    const {
        title,
        price,
        category: { name },
        images,
    } = item;

    const handleRemoveFromBasket = useCallback(() => {
        basketStore.removeFromBasket(item.id);
    }, [item.id]);

    return (
        <article>
            <MuiCard
                sx={{
                    display: 'flex',
                    padding: '1rem',
                    justifyContent: 'space-between',
                }}
                variant="elevation"
            >
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: '14rem', borderRadius: '4px', margin: 'auto' }}
                        image={images[0] ?? ''}
                        alt={`image_${title}`}
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Box>{title}</Box>
                        <Box>Price: {price} $</Box>
                        <Box>Catefory: {name}</Box>
                    </CardContent>
                </Box>
                <Box>
                    <IconButton onClick={handleRemoveFromBasket}>
                        <RemoveShoppingCartIcon />
                    </IconButton>
                </Box>
            </MuiCard>
        </article>
    );
};
