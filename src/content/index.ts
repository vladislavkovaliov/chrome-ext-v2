import Content from './core/Content';
import { getName, getCount, getPrice, getUrl } from '../utils/index'
import Handler, { Methods } from '../core/Handler';

const handler = new Handler({
    // @ts-ignore
    sendMessage: chrome.runtime.sendMessage,
    onMessage: (x: any) => console.log(x),
    // @ts-ignore
    onInitialized: chrome.runtime.sendMessage,
});


class ItemsStore {
    private _map: Map<string, any> = new Map();

    constructor() {}

    public insert = () => {}

    public remove = () => {}

    public update = () => {}

    public getAll = () => {}

    public getById = () => {}
}

const handleTableClick = (event: Event) => {
    const tr = (event.target as Element).closest("tr");
    if (!tr) {
        return;
    }

    const element = (event.target as Element);
    const id = element.getAttribute("id");

    if (id === "add-into-excel") {
        handler.sendMessage(Methods.ADD, {
            name: getName(tr),
            totalPrice: getPrice(tr) * getCount(tr),
            url: getUrl(tr),
            count: getCount(tr),
        });
    }

    if (id === "remove-from-excel") {
        handler.sendMessage(Methods.REMOVE, {
            name: getName(tr),
            totalPrice: getPrice(tr) * getCount(tr),
            url: getUrl(tr),
            count: getCount(tr),
        });
    }
    
    if (element.classList.contains("basket-item-amount-btn-plus") || 
        element.classList.contains("basket-item-amount-btn-minus")) {
            handler.sendMessage(Methods.UPDATE, {
                name: getName(tr),
                totalPrice: getPrice(tr) * getCount(tr),
                url: getUrl(tr),
                count: getCount(tr),
            });
    }

    if (element.classList.contains("cart-remove")) {
        handler.sendMessage(Methods.REMOVE_FROM_CART, {
            name: getName(tr),
            totalPrice: getPrice(tr) * getCount(tr),
            url: getUrl(tr),
            count: getCount(tr),
        });
    }
};

const content = new Content();
content.init();

if (content.isReady) {
    handler.sendMessage(Methods.INITIALIZED);
}

if (content.table) {
    content.attachClickTable(handleTableClick);
}
