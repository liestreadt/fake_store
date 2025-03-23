/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { FC, useCallback } from 'react';
import styles from './Card.module.css';
import {
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    Card as MuiCard,
    styled,
    Typography,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { ExpandMoreProps, ICardProps } from './Card.types';
import { basketStore } from '../../store/basketStore';

export const Card: FC<ICardProps> = ({ item }) => {
    const {
        id,
        title,
        price,
        images,
        description,
        category: { name: categoryName },
    } = item;

    const handleAddingToBasket = useCallback(() => {
        basketStore.addCardToBasket(item);
    }, []);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { ...other } = props;
        return <IconButton {...other} />;
    })(({ theme }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        variants: [
            {
                props: ({ expand }) => !expand,
                style: {
                    transform: 'rotate(0deg)',
                },
            },
            {
                props: ({ expand }) => !!expand,
                style: {
                    transform: 'rotate(180deg)',
                },
            },
        ],
    }));

    return (
        <article>
            <MuiCard className={styles.cardWrapper} variant="outlined">
                <CardHeader
                    sx={{ overflow: 'hidden' }}
                    action={
                        <IconButton onClick={handleAddingToBasket} aria-label="settings">
                            <ShoppingBasketIcon />
                        </IconButton>
                    }
                    title={
                        <div
                            style={{
                                whiteSpace: 'nowrap',
                                width: '245px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {title}
                        </div>
                    }
                    subheader={
                        <div
                            style={{
                                whiteSpace: 'nowrap',
                                width: '245px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >{`${price} $`}</div>
                    }
                />
                <CardMedia component="img" height="194" image={images[0] ?? ''} alt={`image_${title}`} />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {categoryName}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography sx={{ marginBottom: 2 }}>{description}</Typography>
                    </CardContent>
                </Collapse>

                {/* <div style={{ whiteSpace: 'nowrap' }}>{title}</div>
                <div className={styles.imageContainer}>
                    <img src={images[0] ?? ''} alt={`card id - ${id}`} />
                </div>
                <div style={{ display: 'flex', flexGrow: 1, maxHeight: '150px', textOverflow: 'ellipsis' }}>
                    {description}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="outlined" onClick={handleAddingToBasket}>
                        Add to basket
                    </Button>
                    <span>{price} $</span>
                </div> */}
            </MuiCard>
        </article>
    );
};
