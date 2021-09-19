export function getPrice(el: HTMLDivElement): number {
    const price = el.querySelector('.basket-items-list-item-price .basket-item-price-current-text')?.textContent;
    return Number(price?.split(' ')[0]);
}

export function getName(el: HTMLDivElement): string {
    const name = el.querySelector('span[data-entity=basket-item-name]')?.textContent;
    return name as string;
}

export function getUrl(el: HTMLDivElement): string {
    const url = (el.querySelector('.basket-item-info-name-link') as HTMLLinkElement)?.href;
    return url as string;
}
export function getCount(el: HTMLDivElement):number {
    const count = (el.querySelector('.basket-item-amount-filed') as HTMLInputElement).value;
    return Number(count);
}

// export {
//     getPrice,
//     getName,
//     getCount,
//     getUrl,
// }