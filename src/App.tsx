import { observer } from 'mobx-react-lite'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { BucketPage } from './pages/BucketPage/BucketPage'

function AppComponent() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/bucket' element={<BucketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export const App = observer(AppComponent)
