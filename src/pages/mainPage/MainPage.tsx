import { FC, useEffect } from 'react';
import { mainStore } from '../../store/mainStore';
import { observer } from 'mobx-react-lite';
import { Grid2 } from '@mui/material';
import { Card } from '../../components/Card/Card';

export const MainPage: FC = observer(() => {
    useEffect(() => {
        mainStore.requestStoreData();
    }, []);

    return (
        <main>
            <div>
                <Grid2 justifyContent={'space-between'} container spacing={2}>
                    {mainStore.data &&
                        mainStore.data.map((item, index) => {
                            return <Card key={index} item={item} />;
                        })}
                </Grid2>
            </div>
        </main>
    );
});
