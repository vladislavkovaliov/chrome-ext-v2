// @ts-ignore
chrome.runtime.onMessage.addListener(function(request: any, sender: any, sendResponse: any) {
    console.log(request);
    // @ts-ignore
    sendResponse({fa: 42});

});

console.log(2)