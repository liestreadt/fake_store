import { makeAutoObservable } from 'mobx';
import { ICardItem } from './mainStore';

class BasketStore {
    private _selectedItems: Map<number, ICardItem> = new Map();

    constructor() {
        makeAutoObservable(this);
        this.addBasketFromLocalStorage();
    }

    public get cardsInBasket() {
        return [...this._selectedItems.values()];
    }

    public get basketSumPrice() {
        return [...this._selectedItems.values()].reduce((acc, curr) => acc + curr.price, 0);
    }

    public isItemInBasket(id: number) {
        return this._selectedItems.has(id);
    }

    public addCardToBasket(item: ICardItem) {
        this._selectedItems.set(item.id, item);
        localStorage.setItem('basket', JSON.stringify([...this._selectedItems.entries()]));
    }

    private addBasketFromLocalStorage() {
        const basketItems: [number, ICardItem][] = JSON.parse(localStorage.getItem('basket') ?? '[]');

        if (basketItems.length > 0) {
            this._selectedItems = new Map(basketItems);
        }
    }

    public removeFromBasket(id: number) {
        this._selectedItems.delete(id);
        localStorage.setItem('basket', JSON.stringify(this._selectedItems));
    }
}

export const basketStore = new BasketStore();
