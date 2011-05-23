(function() {

    var settings = { "wrong_tab_order": false };
    var keynav = function(e) {
        if (e.ctrlKey && e.keyCode >= 37 && e.keyCode <= 40) {
            e.stopImmediatePropagation();
            e.preventDefault();
            if (e.keyCode == 37) { // left
                $(e.target).closest("td").prev().find("input:first-child").focus();
            } else if (e.keyCode == 39) { // right
                $(e.target).closest("td").next().find("input:first-child").focus();
            } else { // up/down
                var col_index = $(e.target).closest("td").prevAll().length;
                if (e.keyCode == 38) {
                    $(e.target).closest("tr.rgEditRow").prev().find("td:nth-child(" + (col_index + 1) + ") input:first-child").focus();
                } else {
                    $(e.target).closest("tr.rgEditRow").next().find("td:nth-child(" + (col_index + 1) + ") input:first-child").focus();
                }
            }
        }
    };
    var reorder = function(settings) {
        var rows = $("table.rgMasterTable tr.rgEditRow");
        var columns_in_row = $("tr.rgEditRow:first span.RadInput input:first-child").length;
        $.each(rows, function(row_index) {
            $.each($(this).find("span.RadInput input:first-child"), function(column_index) {
                if (settings["wrong_tab_order"]) {
                    $(this).attr("tabindex", "" + (row_index * columns_in_row + (column_index + 1))).keydown(keynav);
                } else {
                    $(this).attr("tabindex", "" + (column_index * rows.length + (row_index + 1))).keydown(keynav);
                }
            });
        });
        $("span.RadInput input:first").focus();
    }
    chrome.extension.sendRequest({ "method": "getSettings" }, reorder);

})();

