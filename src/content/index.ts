import Content from './core/Content';

const handleTableClick = (event: Event) => {
    const element = event.target as Element;
    if (!element.closest("tr")) {
        return;
    }

    const id = element.getAttribute("id");

    if (id === "add-into-excel") {
        console.log("add");
    }

    if (id === "remove-from-excel") {
        console.log("remove");
    }
    
    if (element.classList.contains("basket-item-amount-btn-plus") || 
        element.classList.contains("basket-item-amount-btn-minus")) {
        console.log("update");
    }

    if (element.classList.contains("cart-remove")) {
        console.log("remove");
    }
};

const content = new Content();
content.init();

if (content.table) {
    content.attachClickTable(handleTableClick);
}
