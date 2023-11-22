$(document).ready(function () {

    // Enable statefulness across pages/refreshes for manually-toggled sidebars

    // When an item is shown (un-collapsed), create a local-storage item with a key of the item's ID (prepended by "coll_") and a value of true.
        $(".collapse").on("shown.bs.collapse", function () {
        localStorage.setItem("coll_" + this.id, true);
    });

    // When an item is collapsed/hidden, remove the related localStorage item (item ID prepended by "coll_")
    $(".collapse").on("hidden.bs.collapse", function () {
        localStorage.removeItem("coll_" + this.id);
    });

    // Make the state of the actual collapsible elements (and their control switches) match that of the localStorage items that track their state
    $(".collapse").each(function () {
        if (localStorage.getItem("coll_" + this.id) === "true") {
            $(this).collapse("show");
            $(".menck-tn-toggle-control").each(function () {
                $(this).attr("data-bs-target", "");
                $(this).trigger("click");
                $(this).attr("data-bs-target", "#MenckSidebar");
                });
        }
        else {
            $(this).collapse("hide");
        }
    });

});
