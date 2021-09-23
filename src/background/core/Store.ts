import { observable, makeObservable, computed, reaction, action } from "mobx";
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
            token: observable,
        });

        // @ts-ignore
        chrome.identity.getAuthToken({interactive: true}, (token) => {
            console.log('got the token', token);
            this.token = token;
        });

        this.onMessage = onMessage;
        this.subscribe();

        reaction(() => this.google, async (google) => {
            // try {
            //     const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1zQJHG5Ls9L4scLRK2IOamVvz4hm_Yn43piPG5vsjnGg/values/List2', {
            //         headers: {
            //             'Authorization': `Bearer ${this.token}`,
            //         }
            //     });
            //     const json = await response.json()
            //     console.log(json);
            // } catch(e) {
            //     console.error(e);
            // }
            
            await fetch('https://sheets.googleapis.com/v4/spreadsheets/1zQJHG5Ls9L4scLRK2IOamVvz4hm_Yn43piPG5vsjnGg/values/List2?valueInputOption=RAW', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
                body: JSON.stringify({
                    values: [
                        [],
                        ...google,
                        ...Array.from({length: 1000 - google.length}, _ => ["", "", ""]),
                    ]
                })
            });
        });
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
        if (!this.map.has(item.name)) {
            return;
        }

        this.map.set(item.name, item);
    };

    public get = (item: Item): Item | null => {
        return this.map.has(item.name) ? this.map.get(item.name) : null;
    };

    public get count() {
        return this.map.size;
    }

    public get google(): Array<[string, string, string]> {
        if (!this.map.size) {
            return [];
        }

        return Array.from(this.map.values()).reduce(Store.mapGoogle, []);
    }

    public static mapGoogle = (acc: Array<[string, string, string]>, item: Item) => {
        if (item.count > 1) {
            for(let i = 0; i < item.count; i++) {
                acc.push([
                    item.name, "", String(item.price),
                ]);
            }
        } else {
            acc.push([
                item.name, "", String(item.price),
            ]);
        }

        // for (let i = acc.length; i < 1000 - acc.length; i++) {
        //     acc.push(["", "", ""]);
        // }

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
            case Methods.UPDATE: {
                this.update(payload);
                sendResponse(true);
                break;
            }
            case Methods.REMOVE_FROM_CART: {
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