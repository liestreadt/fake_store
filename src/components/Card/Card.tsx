import { FC, useCallback } from 'react';
import styles from './Card.module.css';
import { Button, Card as MuiCard } from '@mui/material';
import { ICardProps } from './Card.types';
import { bucketStore } from '../../store/bucketStore';

export const Card: FC<ICardProps> = ({ item }) => {
    const { id, title, price, image, description } = item;

    const handleAddingToBucket = useCallback(() => {
        bucketStore.addToBucket(item);
    }, []);

    return (
        <article>
            <MuiCard className={styles.cardWrapper} variant="outlined">
                <div style={{ whiteSpace: 'nowrap' }}>{title}</div>
                <div className={styles.imageContainer}>
                    <img src={image} alt={`card id - ${id}`} />
                </div>
                <div style={{ display: 'flex', flexGrow: 1, maxHeight: '150px', textOverflow: 'ellipsis' }}>
                    {description}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="outlined" onClick={handleAddingToBucket}>
                        Add to bucket
                    </Button>
                    <span>{price} $</span>
                </div>
            </MuiCard>
        </article>
    );
};
