/**
 * Created by ashish kumar on 05-05-2017.
 */

var ta = 6;

function moveSlide(options) {
    var ht = $(window).height() * 0.86;
    var slides = $(".ctr-box > div");
    var total_slides = slides.length - 1;

    if ($.type(options) === "undefined")
        options = {};

    if ($.isNumeric(options.pos))
        var newPos = -(options.pos - 1) * ht;
    else {
        if (!$.isNumeric(options.direction))
            options.direction = -1;
        var newPos = parseInt(slides.css("top")) + options.direction * ht;
    }

    var current_slide = -Math.round(newPos / ht);
    newPos = -current_slide * ht;
    if ($.isNumeric(newPos) && current_slide <= total_slides && current_slide >= 0) {
        slides.animate({top: newPos + "px"}, 800);

        var d = new Date();
        ta = d.getTime();

        var side_nav = $(".side-nav").find("img[data-slide=\"" + (current_slide + 1) + "\"]");
        $(".active").removeClass("active");
        side_nav.parent().addClass("active");
    }

}

$(".bottom-arrow").on("click", function () {
    moveSlide();
});

$(".side-nav").on("click", "img", function () {
    $(this).parents().find(".active").removeClass("active");
    $(this).addClass("active");
    var slide_no = $(this).data("slide");
    moveSlide({pos: slide_no})
});

$('.slide').on('mousewheel', function (event) {


    var d = new Date();
    var ct = d.getTime();

    if (ct - ta > 800) {
        moveSlide({direction: event.deltaY});
        console.log(event.deltaX, event.deltaY, event.deltaFactor, ta);
    }
});

$(".open-icon").on("click", function (e) {
    $(this).toggleClass("open");
    $(".top-nav").toggleClass("show");
});

function zoomBackground() {
    var fxd_bg = $(".fxd-bg.visible");
    // fxd_bg.css("background-image", "url('images/" + Math.ceil(Math.random() * 5) + ".JPG')");
    fxd_bg.animate({
        height: "105%",
        width: "120%"
    }, 2550)
}

function arrayKey(key, len) {
    if (key >= len) {
        key = key-len;
    }
    return key;
}

function bgchange(images) {
    var fxd_bg_a = $(".fxd-bg.visible");
    var fxd_bg_d = $(".fxd-bg.hidden");
    var pos = fxd_bg_a.data("pos");
    console.log(pos);
    if (!$.isNumeric(pos)) {
        fxd_bg_a.css("background-image", "url('" + images[0] + "')");
        fxd_bg_d.css("background-image", "url('" + images[1] + "')");
        fxd_bg_a.data("pos", 0);
        bgchange(images);
    } else {
        fxd_bg_d.animate({opacity: 1}, 400);
        setTimeout(function () {
            fxd_bg_a.animate({opacity: 0}, 400, function () {
                fxd_bg_a.css("background-image", "url('" + images[arrayKey((pos + 2), images.length)] + "')");
                console.log(images[arrayKey((pos + 2), images.length)], arrayKey((pos + 2), images.length));
            });
        }, 350);

        setTimeout(function () {
            fxd_bg_d.animate({
                height: "115%",
                width: "120%"
            }, 4000, function () {
                fxd_bg_a.css({
                    height: "85%",
                    width: "100%"
                });
                bgchange(images);
            });
        }, 600);

        fxd_bg_d.data("pos", arrayKey((pos + 1), images.length));

        fxd_bg_d.removeClass("hidden").addClass("visible");
        fxd_bg_a.removeClass("visible").addClass("hidden");
    }
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

$(document).ready(function () {
    var ht = $(window).height() * 0.86;
    console.log(ht);
    $(".ctr-box > div").css("height", ht);

    $(".info-ctr").mCustomScrollbar({
        scrollbarPosition: "outside"
    });

    $(".event").on("click", function (e) {
        var selector = "#" + $(this).data("type") + "-tpl";
        var info_ctr = $(".info-ctr");
        info_ctr.find(".content").html($(selector).html()).mCustomScrollbar();
        info_ctr.fadeIn(600);
    });

    $(".info-ctr").on("click", ".info-close", function () {
        $(".info-ctr").fadeOut(600);
    });

    preload(['images/1.JPG', 'images/2.JPG', 'images/3.JPG', 'images/4.JPG', 'images/5.JPG']);

    // $("#fxd-bg").backstretch(['images/1.JPG', 'images/2.JPG', 'images/3.JPG', 'images/4.JPG', 'images/5.JPG'], {
    //     fade: "slow",
    //     duration: 6000
    // });
    // changeBackground();

    bgchange(['images/1.JPG', 'images/2.JPG', 'images/3.JPG', 'images/4.JPG', 'images/5.JPG']);
    // setInterval(function () {
    //     bgchange(['images/1.JPG', 'images/2.JPG', 'images/3.JPG', 'images/4.JPG', 'images/5.JPG']);
    // }, 3600)
});