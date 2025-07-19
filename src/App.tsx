import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { MainPage } from './pages/MainPage/MainPage';
import { BasketPage } from './pages/BasketPage/BasketPage';
import { ItemPage } from './pages/ItemPage/ItemPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

function AppComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/basket" element={<BasketPage />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export const App = observer(AppComponent);
