const selectors: Record<string, string> = {
    BASKET_ITEM_TABLE: '#basket-item-table',
};

class Content {
    public init = () => {
        this.inject();
    };

    /**
     * Inject Button into row
     */
    private inject = () => {
        const table = document.querySelector(selectors.BASKET_ITEM_TABLE);
        
        if (!table) {
            return;
        }

        const items = Array.from(table.querySelector("tbody").children);
        items.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = "Добавить";
            button.setAttribute("id", "add-into-excel");
            const td = document.createElement('td');
            td.append(button);
            item.append(td);
        });
    };
}

export default Content;
