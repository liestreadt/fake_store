import { observer } from 'mobx-react-lite';
import { FC, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { itemStore } from '../../store/itemStore';
import { Box, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { BasketButton } from '../../components/BasketButton/BasketButton';

export const ItemPage: FC = observer(() => {
    const { id } = useParams();

    useLayoutEffect(() => {
        if (id) {
            itemStore.requestItem(id);
        }

        return () => {
            itemStore.clearItem();
        };
    }, [id]);

    return (
        itemStore.itemData && (
            <main>
                <Card sx={{ padding: '0 1rem' }}>
                    <CardHeader
                        action={<BasketButton item={itemStore.itemData} />}
                        title={<h4 style={{ margin: 0 }}>{itemStore.itemData.title}</h4>}
                    />
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            fontSize: '1.25rem',
                            '& > div': {
                                display: 'flex',
                                gap: '1rem',
                                '& > div:first-of-type': {
                                    minWidth: '7rem',
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* // ^ Добавить какой-нибудь слайдер или ImageList от Mui */}
                            {itemStore.itemData.images.map((image) => {
                                console.log(image);

                                return (
                                    <CardMedia
                                        key={itemStore.itemData?.id}
                                        component="img"
                                        sx={{ width: '15rem', borderRadius: '4px' }}
                                        image={image}
                                        alt={`image_${itemStore.itemData?.title}`}
                                    />
                                );
                            })}
                        </Box>
                        <Box>
                            <Box>
                                <b>Description: </b>
                            </Box>
                            <Box>{itemStore.itemData.description}</Box>
                        </Box>
                        <Box>
                            <Box>
                                <b>Category: </b>
                            </Box>
                            <Box>{itemStore.itemData.category.name}</Box>
                        </Box>
                        <Box>
                            <Box>
                                <b>Price: </b>
                            </Box>
                            <Box>{itemStore.itemData.price} $</Box>
                        </Box>
                    </CardContent>
                </Card>
            </main>
        )
    );
});
