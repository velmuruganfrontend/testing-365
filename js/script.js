
function lessMore (e) {
    if ($(e.target).hasClass("less-more-container--less")) {
        $(e.target).hide()
            .next()
            .show()
            .parent()
            .find("> ul li:not(.no-hide)")
            .hide();

        $(e.target).closest(".container-with-mobile-banner")[0].scrollIntoView();
    }
    else if ($(e.target).hasClass("less-more-container--more")) {
        $(e.target).hide()
            .prev()
            .show()
            .parent()
            .find("ul:first-of-type li:not(.no-hide)")
            .show();
    }
};

$(document).ready(function () {
   $(document).on("click", lessMore);
});