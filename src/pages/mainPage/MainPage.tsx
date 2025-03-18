import { FC, useEffect } from "react";
import { mainStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { Grid2} from '@mui/material';
import { Card } from "../../components/Card/Card";
export const MainPage: FC = observer(() => {

  useEffect( () => {
    mainStore.requestStoreData()
  }, [])


  return <main>
      <div>
        <Grid2 container spacing={2}>
          {
            mainStore.data && mainStore.data.map((item) => {
              console.log(item.id);

              return <Card />
            })
          }
        </Grid2>
      </div>
  </main>
});
