import { Store, Item } from "./Store";

describe("Store", () => {
    let store: Store;

    beforeEach(() => {
        store = new Store();
    });

    describe("insert()", () => {
        it("should insert item", () => {
            const item: Item = {
                name: "name",
                price: 250,
                count: 1,
                url: "url",
            };
            store.insert(item);
            expect(store.get(item)).toEqual(item);
        });
    });

    describe("remove()", () => {
        it("should remove item", () => {
            const item: Item = {
                name: "name",
                price: 250,
                count: 1,
                url: "url",
            };

            store.insert(item);
            expect(store.get(item)).toEqual(item);
            store.remove(item);
            expect(store.get(item)).toEqual(null);
        });
    });

    describe("update", () => {
        it("should update item", () => {
            const item: Item = {
                name: "name",
                price: 250,
                count: 1,
                url: "url",
            };

            store.insert(item);
            expect(store.get(item)).toEqual(item);
            const item2: Item = {
                ...item,
                count: 2,
            };
            store.insert(item2);
            expect(store.get(item2)).toEqual(item2);
            expect(store.count).toEqual(1);
        });
    });

    describe("google", () => {
        it("should google format", () => {
            const items: Item[] = [];
            const count = 3;
            for (let i = 0; i < count; i++) {
                const item = {
                    name: String(i),
                    url: String(i),
                    price: i * 50,
                    count: i,
                };
                store.insert(item);
                items.push(item);
            }

            expect(store.google).toEqual(items.reduce(Store.mapGoogle, []));
        });
    });
});