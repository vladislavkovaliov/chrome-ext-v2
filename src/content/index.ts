import Content from './core/Content';
import { getName, getCount, getPrice, getUrl } from '../utils/index'
import Handler, { Methods } from '../core/Handler';

function runApp() {
    const handler = new Handler({
        // @ts-ignore
        sendMessage: chrome.runtime.sendMessage,
        onMessage: (x: any) => console.log(x),
        // @ts-ignore
        onInitialized: chrome.runtime.sendMessage,
    });
    
    const handleTableClick = (event: Event) => {
        const tr = (event.target as Element).closest("tr");
        if (!tr) {
            return;
        }
    
        const element = (event.target as Element);
        const id = element.getAttribute("id");
    
        if (id === "add-into-excel") {
            handler.sendMessage(Methods.ADD, (isDone: boolean) => {
                if (isDone) {
                    element.textContent = "Удалить";
                    element.setAttribute("id", "remove-from-excel");
                }
            }, {
                name: getName(tr),
                price: getPrice(tr),
                url: getUrl(tr),
                count: getCount(tr),
            });
        }
    
        if (id === "remove-from-excel") {
            handler.sendMessage(Methods.REMOVE, (isDone: boolean) => {
                if (isDone) {
                    element.textContent = "Добавить";
                    element.setAttribute("id", "add-into-excel");
                }
            }, {
                name: getName(tr),
                price: getPrice(tr),
                url: getUrl(tr),
                count: getCount(tr),
            });
        }
        
        if (element.classList.contains("basket-item-amount-btn-plus") || 
            element.classList.contains("basket-item-amount-btn-minus")) {
                handler.sendMessage(Methods.UPDATE, () => {}, {
                    name: getName(tr),
                    price: getPrice(tr),
                    url: getUrl(tr),
                    count: getCount(tr),
                });
        }
    
        if (element.classList.contains("cart-remove")) {
            handler.sendMessage(Methods.REMOVE_FROM_CART, () => {}, {
                name: getName(tr),
                price: getPrice(tr),
                url: getUrl(tr),
                count: getCount(tr),
            });
        }
    };
    
    const initMutationObserver = (table: Element): void => {
        if (!table) {
            return;
        }
    
        let observer = new MutationObserver((data) => {
            if (data[0].target === table.querySelector("tbody")) {
                data[0].removedNodes.forEach((x: HTMLTableRowElement) => {
                    handler.sendMessage(Methods.REMOVE_FROM_CART, () => {}, {
                        name: getName(x),
                        price: getPrice(x),
                        url: getUrl(x),
                        count: getCount(x),
                    });
                });
            }
        });
    
        observer.observe(table.querySelector("tbody"), {
            childList: true,
            subtree: true,
            characterDataOldValue: true,
        });
    };
    
    const content = new Content();
    content.init();
    
    if (content.isReady) {
        handler.sendMessage(Methods.INITIALIZED, () => {});
    }
    
    if (content.table) {
        content.attachClickTable(handleTableClick);
        initMutationObserver(content.table);
    }
}
runApp();