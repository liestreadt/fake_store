import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export type TCategory = {
    id: number;
    name: string;
    image: string;
    slug: string;
};

export interface ICardItem {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    slug: string;
    category: TCategory;
}

class MainStore {
    private _data: ICardItem[] | undefined = undefined;
    private _loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public async requestStoreData() {
        this._loading = true;

        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');

            this._data = response.data;
        } catch (error) {
            console.error('Error while fetching data', error);
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
}

export const mainStore = new MainStore();
