
// Saves options to localStorage.
function save_options() {
    var settings = {
        "wrong_tab_order": ($("#wrong_tab_order:checked").val() == "on")
    };
    console.log(settings);

    chrome.extension.sendRequest({ "method": "setSettings", "settings": settings }, function(response) {
        // Update status to let user know options were saved.
        $("#status").html("Options Saved.");
        setTimeout(function() {
            $("#status").html("");
        }, 750);
    });
}

// Restores state to saved value from localStorage.
function restore_options() {
    chrome.extension.sendRequest({ "method": "getSettings" }, function(settings) {
        console.log(settings);
        if (settings === null) settings = {};
        if (settings.wrong_tab_order) {
            $("#wrong_tab_order").attr("checked", "checked");
        } else {
            $("#wrong_tab_order").removeAttr("checked");
        }
    });
}

