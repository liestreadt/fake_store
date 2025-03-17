import { FC, useEffect } from "react";
import { mainStore } from "../../store/store";
import { observer } from "mobx-react-lite";

export const MainPage: FC = observer(() => {

  useEffect( () => {
    mainStore.requestStoreData()
  }, [])

  return <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <h1>Fake Store</h1>
      <div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          {
            mainStore.data && mainStore.data.map((item) => {
              console.log(item.id);
              return <div style={
                {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  gap: '2px',
                  outline: '2px dashed #F1F3',
                  borderRadius: '5px',
                  padding: '2px'
                }
              }>
                  <span>{item.id}</span>
                  <span>{item.title}</span>
                  <span>{item.body}</span>
                </div>
          }
        )
      }
        </div>
      </div>
  </main>
});
