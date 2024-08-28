$(document).ready(function () {
    // Enable statefulness across pages/refreshes for manually-toggled sidebars
    // Session-storage at page-load
    // When an item is shown (un-collapsed), create a local-storage item with a key of the item's ID (prepended by "visible_") and a value of true.
    $(".collapse").on("show.bs.collapse", function () {
    sessionStorage.setItem("show_" + this.id, true);
    });
    // When an item is collapsed/hidden, set the related localStorage item (item ID prepended by "show_" to "false")
    $(".collapse").on("hide.bs.collapse", function () {
    sessionStorage.setItem("show_" + this.id, false);
    });
    // Things to do if this is an existing browser session (synchronize sidebars and toggle-controls to shown/checked)
    if ((sessionStorage.getItem("menckenania-alpha-return-visitor")) === "true") {
        $(".collapse").each(function () {
            const storagecomp = "show_" + this.id;
            if (sessionStorage.getItem(storagecomp) === "false") {
//                $(this).collapse('hide');
            };
            if (sessionStorage.getItem(storagecomp) === "true") {
//                $(this).collapse('show');
            };
        });
    }
    // If this is a new-browser session, "click" all the sidebar toggle controls to "check" them and expand the associated sidebars 
    else {
        sessionStorage.setItem("menckenania-alpha-return-visitor", true);
        $(".collapse").each(function () {
            sessionStorage.setItem("show_" + this.id, true);
            $(this).collapse('show');
        });
    };
});
