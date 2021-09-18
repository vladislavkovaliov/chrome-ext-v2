describe("", () => {
    const jestPostMessage = jest.fn();
    const jestOnMessage = jest.fn();

    const handler = new Handler({
        postMessage: jestPostMessage,
        onMessage: jestOnMessage,
    });

    describe("addMessageCallback()", () => {
        it("should add callback function into onMessageCallbacks", () => {
            
        });
    });

    describe("message()", () => {
       it("", () => {
            handler.message("methodNane", {
                payload: "data",
            });

            expect(jestPostMessage).toBeCalledWith({
                method: "methodNane",
                payload: "data",
            })
       });
    });

    describe("onMessage()", () => {
    });

    describe("dospose()", () => {
       
    });
});

describe("", () => {
    const transport = new Instance();

    describe("hanldeMessage()", () => {
       it("should send message into chrome runtime", () => {});
    });

    describe("subscribeMessage()", () => {
       it("sould subsribe on chrome runtime message", () => {

       });
    });

    describe("dospose()", () => {
       
    });
});