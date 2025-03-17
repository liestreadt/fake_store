import axios from "axios";
import { makeAutoObservable } from "mobx";

interface IMockInterface {
  id: number | string;
  title: string;
  body: string;
}

const mockData: IMockInterface[] = [
  {
    id: 1,
    title: "Title number 1",
    body: "Body text number 1",
  },
  {
    id: 3,
    title: "Title number 3",
    body: "Body text number 3",
  },
  {
    id: 5,
    title: "Title number 5",
    body: "Body text number 5",
  },
  {
    id: 2,
    title: "Title number 2",
    body: "Body text number 2",
  },
  {
    id: 4,
    title: "Title number 4",
    body: "Body text number 4",
  },
  {
    id: 6,
    title: "Title number 6",
    body: "Body text number 6",
  },
];

const getMockData = new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockData);
  }, 1000);
});

class MainStore {
  private _data: IMockInterface[] | undefined = undefined;
  private _loading: boolean = false;
  private _count: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public async requestStoreData() {
    this._loading = true;

    try {
      // const response = await axios.get(
      //   "https://jsonplaceholder.typicode.com/posts"
      // );

      const response = await getMockData;

      this._data = response;
    } catch (error) {
      console.error("custom error", error);
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
