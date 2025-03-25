import { makeAutoObservable } from 'mobx';
import { ICardItem } from './mainStore';

class BasketStore {
    private _selectedItems: Set<ICardItem> = new Set();
    private _selectedItemsIds: Set<number> = new Set();

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

    public isItemInBasket(id: number) {
        return this._selectedItemsIds.has(id);
    }

    public addCardToBasket(card: ICardItem) {
        this._selectedItems.add(card);
        this._selectedItemsIds.add(card.id);
        localStorage.setItem('basket', JSON.stringify([...this._selectedItems]));
    }

    private addBasketFromLocalStorage() {
        const basketItems: ICardItem[] = JSON.parse(localStorage.getItem('basket') ?? '[]');

        if (basketItems.length > 0) {
            this._selectedItems = new Set(basketItems);
            this._selectedItemsIds = new Set(basketItems.map((item) => item.id));
        }
    }

    public removeFromBasket(card: ICardItem) {
        this._selectedItems.delete(card);
        this._selectedItemsIds.delete(card.id);
        localStorage.setItem('basket', JSON.stringify([...this._selectedItems]));

        console.log(this._selectedItems);
    }
}

// ^ Нужно сделать Map в котором будет id - ключ и значение item

export const basketStore = new BasketStore();
