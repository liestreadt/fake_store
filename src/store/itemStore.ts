import { makeAutoObservable } from 'mobx';
import { ICardItem } from './mainStore';
import axios from 'axios';

class ItemStore {
    private _data: ICardItem | undefined = undefined;
    private _loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public async requestItem(id: string) {
        this._loading = true;

        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);

            if (response.status >= 200 && response.status < 300) {
                this._data = response.data;
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error('Error while fetching item: ', err);
        } finally {
            this._loading = false;
        }
    }

    public clearItem() {
        this._data = undefined;
    }

    public get loading() {
        return this._loading;
    }

    public get itemData() {
        return this._data;
    }
}

export const itemStore = new ItemStore();
