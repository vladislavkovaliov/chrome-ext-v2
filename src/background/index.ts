import { Store } from "./core/Store";

const store = new Store({
    // @ts-ignore
    onMessage: chrome.runtime.onMessage
});
