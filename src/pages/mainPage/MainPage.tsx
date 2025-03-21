import { FC, useEffect } from 'react';
import { mainStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { Grid2 } from '@mui/material';
import { Card } from '../../components/Card/Card';

export const MainPage: FC = observer(() => {
    useEffect(() => {
        mainStore.requestStoreData();

        setTimeout(() => {
            console.log(mainStore.data);
        }, 1000);
    }, []);

    return (
        <main>
            <div>
                <Grid2 justifyContent={'space-between'} container spacing={2}>
                    {mainStore.data &&
                        mainStore.data.map((item, index) => {
                            console.log(item.id);
                            return <Card key={index} item={item} />;
                        })}
                </Grid2>
            </div>
        </main>
    );
});
