// Navigation Scroll To Section Function
$("a[href^='#']").click(function(e) {
    "use strict";
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;
    position -= 50;

    $("body, html").animate({
        scrollTop: position
    }, 1000);
    if ($("#navbarNavDropdown").hasClass("show")) {
        $("button.navbar-toggler").click();
    }

    $("li.nav-item").removeClass("active");
    $(e.target.parentNode).addClass("active");

});


// Project Modal Open/Close Function
$(".project-image").click( function () {
    var itemType = $(this).data("item-type");
    var targetModalId = "#modal-" + itemType;
    console.log(targetModalId);
    $(targetModalId).removeClass("project-modal-hide");
});

$(".project-modal-close").click( function () {
    $(".project-modal").addClass("project-modal-hide");
});

// Close modal when clicked outside of modal
// $(document).click( function () {
//     console.log(event.target.nodeName);
//     if ($(event.target.nodeName).closest(".project-modal, .project-modal-content")) {
//         console.log("clicked inside modal");
//     } else {
//         console.log("clicked outside modal");
//     }
//     var test = $(event.target).closest(".project-modal-content, .project-modal").length;
//     console.log(test);
//
// });