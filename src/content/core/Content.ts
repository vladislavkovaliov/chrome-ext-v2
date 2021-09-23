const selectors: Record<string, string> = {
    BASKET_ITEM_TABLE: '#basket-item-table',
};

class Content {
    private _table: Element = null;
    private _removeElement: Element = null;
    private _isReady: boolean = false;
    private _map: Map<string, any> = new Map();

    public init = () => {
        this._table = this.getTableElement();
        this._removeElement = this.getRemoveElement();
        this.inject();

        this._isReady = true;
    };

    /**
     * Inject Button into row
     */
    private inject = () => {
        if (!this._table) {
            return;
        }

        const items = Array.from(this._table.querySelector("tbody").children);
        items.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = "Добавить";
            button.setAttribute("id", "add-into-excel");
            const td = document.createElement('td');
            td.append(button);
            item.append(td);
        });
    };

    public attachClickTable = (cb: (event: Event) => void) => {
        if (!this._table) {
            return;
        }

        this._table.addEventListener('click', cb);
    };

    public attachRemoveItem = (cb: (event: Event) => void) => {        
        if (!this._removeElement) {
            return;
        }

        this._removeElement.addEventListener("click", cb);   
    };

    public get table(): Element | null {
        return this._table;
    }

    public get isReady(): Boolean {
        return this._isReady;
    }

    private getTableElement = (): Element | null => {
        const table = document.querySelector(selectors.BASKET_ITEM_TABLE);

        return table;
    };

    private getRemoveElement = (): Element | null => {
        const removeElement = document.querySelector(".cart-page__products-td-remove a");

        return removeElement;
    };
}

export default Content;
