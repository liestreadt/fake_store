import React, { FC, useCallback } from 'react';
import {
    CardActionArea,
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
import { ExpandMoreProps, ICardProps } from './Card.types';
import { useNavigate } from 'react-router';
import { BasketButton } from '../BasketButton/BasketButton';

export const Card: FC<ICardProps> = ({ item }) => {
    const {
        id,
        title,
        price,
        images,
        description,
        category: { name: categoryName },
    } = item;

    const navigate = useNavigate();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const handleCardClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();

            navigate(`/item/${id}`);
        },
        [id, navigate],
    );

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
            <MuiCard sx={{ maxWidth: '345px', width: '345px' }} variant="outlined">
                <CardHeader
                    sx={{ overflow: 'hidden' }}
                    action={<BasketButton item={item} />}
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
                <CardActionArea onClick={handleCardClick}>
                    <CardMedia component="img" height="194" image={images[0] ?? ''} alt={`image_${title}`} />
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {categoryName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
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
            </MuiCard>
        </article>
    );
};
