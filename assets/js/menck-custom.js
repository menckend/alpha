$(document).ready(function () {
    // Enable statefulness across pages/refreshes for manually-toggled sidebars

    // When an item is shown (un-collapsed), create a local-storage item with a key of the item's ID (prepended by "visible_") and a value of true.
    $(".collapse").on("show.bs.collapse", function () {
    sessionStorage.setItem("show_" + this.id, true);
    console.log ('An element was told to un-collapse/show-istelf. Tried to Write an entry to sessionStorage with this string in the key and value of true:', this.id);
 
    var obj = Object.keys(localStorage).reduce(function(obj, key) {
        obj[key] = localStorage.getItem(key);
        return obj
     }, {});
     
     console.log(obj);


    });

    // When an item is collapsed/hidden, set the related localStorage item (item ID prepended by "show_" to "false")
    $(".collapse").on("hide.bs.collapse", function () {
    sessionStorage.setItem("show_" + this.id, false);
    console.log ('An element was told to collapse/hide-istelf. Tried to Write an entry to sessionStorage with this string in the key and value of true:', this.id);
    });


    // Things to do if this is an existing browser session (synchronize sidebars and toggle-controls to shown/checked)
    if ((sessionStorage.getItem("menckenania-alpha-return-visitor")) === "true") {
        // Make the state of the actual collapsible elements (and their control switches) match that of the localStorage items that track their state
        $(".collapse").each(function () {
            var storagecomp = "this_" + this.id;
            if (sessionStorage.getItem(storagecomp) === "true") {
                $(this).collapse("show");
                var sidebarname = "#" + this.id;
                $(".menck-tn-toggle-control").each(function () {
                    var controlname = this.getAttribute('data-bs-target');
                    if ((sidebarname === controlname)) {
                        $(this).trigger("click");   
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
            $(this).trigger("click");
        });
    }
});
