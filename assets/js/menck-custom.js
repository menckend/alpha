$(document).ready(function () {
    // Enable statefulness across pages/refreshes for manually-toggled sidebars
    // When an item is shown (un-collapsed), create a local-storage item with a key of the item's ID (prepended by "coll_") and a value of true.
    $(".collapse").on("shown.bs.collapse", function () {
    sessionStorage.setItem("coll_" + this.id, true);
    });
    // When an item is collapsed/hidden, remove the related localStorage item (item ID prepended by "coll_")
    $(".collapse").on("hidden.bs.collapse", function () {
    sessionStorage.removeItem("coll_" + this.id);
    });

    // Things to do if this is an existing browser session (synchronize sidebars and toggle-controls to shown/checked)
    if (sessionStorage.getItem("menckenania-alpha-return-visitor") === "true") {
        // Make the state of the actual collapsible elements (and their control switches) match that of the localStorage items that track their state
        $(".collapse").each(function () {
            if (sessionStorage.getItem("coll_" + this.id) === "true") {
                $(this).collapse("show");
                $(".menck-tn-toggle-control").each(function () {
                    var jstglctrl = $(this);
                    var domtglctrl = this;
                    if ((this.id === "MenckSidebarToggle")) {
                        jstglctrl.trigger("click");
                    }
                    if ((this.id === "MenckRightBarToggle")) {
                        jstglctrl.trigger("click");
                    }
                });
            }
        });
    }
    // If this is a new-browser session, "click" all the sidebar toggle controls to "check" them and expand the associated sidebars 
    else {
        sessionStorage.setItem("menckenania-alpha-return-visitor", true);
        $(".menck-tn-toggle-control").each(function () {
                var jstglctrl = $(this);
                jstglctrl.trigger("click");
            });
         }
});
