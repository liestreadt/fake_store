import { makeAutoObservable } from 'mobx';
import { ICardItem } from './mainStore';

class BasketStore {
    // ^ Сделать общий стор, от которого расширять все остальные

    private _selectedItems: Set<ICardItem> = new Set();

    constructor() {
        makeAutoObservable(this);
        this.addBasketFromLocalStorage();
    }

    public get cardsInBasket() {
        return [...this._selectedItems];
    }

    public get basketSumPrice() {
        return [...this._selectedItems].reduce((acc, curr) => acc + curr.price, 0);
    }

    public addCardToBasket(card: ICardItem) {
        this._selectedItems.add(card);
        localStorage.setItem('basket', JSON.stringify([...this._selectedItems]));
    }

    private addBasketFromLocalStorage() {
        const basketItems: ICardItem[] = JSON.parse(localStorage.getItem('basket') ?? '[]');

        if (basketItems.length > 0) {
            this._selectedItems = new Set(basketItems);
        }
    }

    public removeFromBasket(card: ICardItem) {
        this._selectedItems.delete(card);
        localStorage.setItem('basket', JSON.stringify([...this._selectedItems]));
    }
}

export const basketStore = new BasketStore();
