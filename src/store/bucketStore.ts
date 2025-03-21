import { ICardItem } from './store';

class BucketStore {
    // ^ Сделать общий стор, от которого расширять все остальные
    // ^ Добавить восстановление корзины из localStorage

    private _selectedItems: Set<ICardItem> = new Set();

    public get cardsInBucket() {
        return [...this._selectedItems];
    }

    public get bucketSumPrice() {
        return [...this._selectedItems].reduce((acc, curr) => acc + curr.price, 0);
    }

    public addToBucket(card: ICardItem) {
        // ^ Лучше передавать id или урезанный объект без изображения, а не весь польностью
        this._selectedItems.add(card);
    }

    public removeFromBucket(card: ICardItem) {
        this._selectedItems.delete(card);
    }
}

export const bucketStore = new BucketStore();
