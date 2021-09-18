const selectors: Record<string, string> = {
    BASKET_ITEM_TABLE: '#basket-item-table',
};

class Content {
    private _table: Element = null;

    public init = () => {
        this._table = this.getTableElement();
        this.inject();
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

    public get table(): Element | null {
        return this._table;
    }

    private getTableElement = (): Element => {
        const table = document.querySelector(selectors.BASKET_ITEM_TABLE);

        return table;
    };
}

export default Content;
