// $('.nav-link').click(function(e) {\
//     e.preventDefault();
//     // console.log($(this).attr("data-link"));
//     var link = $(this).attr("data-link");
//     console.log(link);
//     $('section.content').hide();
//     $('section#' + link).show();
//     $('button.navbar-toggler').click();
// })

$("a[href^='#']").click(function(e) {
    "use strict";
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;
    position -= 70;
    // if (position > 70) {
    //     // Adjust for fixed navbar
    //     position -= 70;
    // }

    $("body, html").animate({
        scrollTop: position
    }, 1000);
    if ($("#navbarNavDropdown").hasClass("show")) {
        $("button.navbar-toggler").click();
    }

    $("li.nav-item").removeClass("active");
    $(e.target.parentNode).addClass("active");

});