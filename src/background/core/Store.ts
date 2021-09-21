import { observable, makeObservable, computed } from "mobx";
import {  Methods } from "../../core/Handler";

export interface Item {
    name: string;
    url: string;
    price: number;
    count: number;
}

export class Store {
    public map: Map<string, Item> = observable.map();
    public token: string = "";
    private onMessage: any;

    constructor({
        onMessage
    }: { onMessage: any }) {
        makeObservable(this, {
            map: observable,    
            count: computed,
            google: computed,
        });

        // @ts-ignore
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            console.log('got the token', token);
            // const provider = new GoogleProvider();
            // // @ts-ignore
            // window.provider = provider;
        });

        this.onMessage = onMessage;
        this.subscribe();
    }

    public insert = (item: Item) => {
        if(this.map.has(item.name)) {
            this.update(item);
        }
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

    public subscribe = () => {
        this.onMessage.addListener(this.handleMessage);
    };

    private handleMessage = (request: any, sender: any, sendResponse: any): boolean => {
        const { method, payload } = request;

        switch (method) {
            case Methods.ADD: {
                this.insert(payload);
                sendResponse(true);
                break;
            }
            case Methods.REMOVE: {
                this.remove(payload);
                sendResponse(true);
                break;
            }
            default: {
                sendResponse(false);
                break;
            }
        }

        return true;
    };
}