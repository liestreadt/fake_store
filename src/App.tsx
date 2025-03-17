import { observer } from 'mobx-react-lite'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainPage } from './pages/mainPage/MainPage'
import { BucketPage } from './pages/bucketPage/BucketPage'

function AppComponent() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/bucket' element={<BucketPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export const App = observer(AppComponent)
