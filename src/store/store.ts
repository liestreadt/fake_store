import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export interface ICardItem {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

class MainStore {
    private _data: ICardItem[] | undefined = undefined;
    private _loading: boolean = false;
    private _count: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    public async requestStoreData() {
        this._loading = true;

        try {
            const response = await axios.get('https://fakestoreapi.com/products');

            console.log(response.data);

            this._data = response.data;
        } catch (error) {
            console.error('custom error', error);
        } finally {
            this._loading = false;
        }
    }

    public get isLoading() {
        return this._loading;
    }

    public get data() {
        return this._data;
    }

    public get count() {
        return this._count;
    }

    public increment() {
        this._count += 1;
    }

    public decrement() {
        this._count -= 1;
    }
}

export const mainStore = new MainStore();
