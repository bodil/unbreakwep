chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log("request: ", request);
    var settings = {
        "wrong_tab_order": false
    };
    if (localStorage["settings"]) settings = JSON.parse(localStorage["settings"]);
    console.log("settings: ", settings);
    if (request.method == "getSettings") {
        sendResponse(settings);
    } else if (request.method == "setSettings") {
        localStorage["settings"] = JSON.stringify(request.settings);
    } else {
        sendResponse({});
    }
});
