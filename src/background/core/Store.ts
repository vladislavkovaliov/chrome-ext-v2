import { observable, makeObservable, computed } from "mobx";

export interface Item {
    name: string;
    url: string;
    price: number;
    count: number;
}

export class Store {
    public map: Map<string, Item> = observable.map();

    constructor() {
        makeObservable(this, {
            map: observable,    
            count: computed,
            google: computed,
        });
    }

    public insert = (item: Item) => {
        this.map.set(item.name, item);
    };

    public remove = (item: Item) => {
        this.map.delete(item.name);
    };

    public update = (item: Item) => {
        this.map.set(item.name, item);
    };

    public get = (item: Item): Item | null => {
        return this.map.has(item.name) ? this.map.get(item.name) : null;
    };

    public get count() {
        return this.map.size;
    }

    public get google(): Array<[string, string]> {
        if (!this.map.size) {
            return [];
        }

        return Array.from(this.map.values()).reduce(Store.mapGoogle, []);
    }

    public static mapGoogle = (acc: Array<[string, string]>, item: Item) => {
        if (item.count > 1) {
            for(let i = 0; i < item.count; i++) {
                acc.push([
                    item.name, String(item.price),
                ]);
            }
        } else {
            acc.push([
                item.name, String(item.price),
            ]);
        }
        
        return acc;
    };
}