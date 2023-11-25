$(document).ready(function () {
    // Things to do if this is a new browser session (synchronize sidebars and toggle-controls to shown/checked)
    if (sessionStorage.getItem("menckenania-alpha-return-visitor") === "true") {
        // Enable statefulness across pages/refreshes for manually-toggled sidebars
        // When an item is shown (un-collapsed), create a local-storage item with a key of the item's ID (prepended by "coll_") and a value of true.
            $(".collapse").on("shown.bs.collapse", function () {
            sessionStorage.setItem("coll_" + this.id, true);
        });
        // When an item is collapsed/hidden, remove the related localStorage item (item ID prepended by "coll_")
            $(".collapse").on("hidden.bs.collapse", function () {
            sessionStorage.removeItem("coll_" + this.id);
        });
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
            else {
                jstglctrl.collapse("hide");
                }
        });
    }
    else {
        sessionStorage.setItem("menckenania-alpha-return-visitor", true);
        $(".menck-tn-toggle-control").each(function () {
                var jstglctrl = $(this);
                jstglctrl.trigger("click");
            });
         }
});
