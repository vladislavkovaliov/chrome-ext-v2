
export enum Methods {
    ADD,
    ADDED,
    REMOVE,
    UPDATE,
    REMOVE_FROM_CART,
    INITIALIZED,
}

class Handler {
    private _sendMessage: (x: any, cb: (data: any) => void) => void;
    private _onMessage: (x: any) => void;
    private _onInitialized: (x: any) => void;

    public constructor({
        sendMessage,
        onMessage,
        onInitialized,
    }: {
        sendMessage: (x: any, cb: (data: any) => void) => void,
        onMessage: (x: any) => void,
        onInitialized: (x: any) => void,
    }) {
        this._sendMessage = sendMessage;
        this._onMessage = onMessage;
        this._onInitialized = onInitialized;
    }

    public sendMessage = (method: Methods, cb: (value: boolean) => void, payload?: any) => {
        switch (method) {
            case Methods.ADD: {
                this._sendMessage({
                    method: Methods.ADD,
                    payload: payload,
                }, cb);
                break;
            }
            case Methods.INITIALIZED: {
                this._sendMessage({
                    method: Methods.INITIALIZED,
                }, cb);
                break;
            }
            case Methods.REMOVE: {
                this._sendMessage({
                    method: Methods.REMOVE,
                    payload: payload,
                }, cb);
                break;
            }
            case Methods.REMOVE_FROM_CART: {
                this._sendMessage({
                    method: Methods.REMOVE_FROM_CART,
                    payload: payload,
                }, cb);
            }
            default: {
                break;
            }
        }
    };

    public onMessage = () => {};
}

export default Handler;