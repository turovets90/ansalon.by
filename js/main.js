$(document).ready(function(){

    /* перевод картинки svg в код */
    $('.icon img, img.icon').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
    /* end перевод картинки svg в код */

    $('.nav .arrow').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('act');
    });

    $('.hamburger').click(function () {
        $('.main_menu').toggleClass('open');
        $('html').toggleClass('page-noscroll');

        $('.main_menu .mm_close').click(function () {
            $('.main_menu').removeClass('open');
            $('html').removeClass('page-noscroll');
        });
        return false;
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".main_menu.open").length) {
            $(".main_menu.open").removeClass('open');
            $("html").removeClass('page-noscroll');
        }
        e.stopPropagation();
    });


    if($(window).innerWidth()> 767){

        $('.main_slider').on('init', function(event, slick) {

            var dotsClone = ''
            jQuery(".main_slider ul.slick-dots li").each(function(t) {
                var counter = t+1;
                dotsClone = dotsClone + '<li class="dot-' + jQuery(this).index() + '" data-slick-index="' + jQuery(this).index() + '"> '+ 0 + counter + '</li>'
            });

            var dotsCloneElement = document.createElement('ul');
            dotsCloneElement.className = 'slick-dots-clone slick-dots';
            dotsCloneElement.innerHTML = dotsClone;

            jQuery('main .slick-dots').addClass('slick-dots-original');

            jQuery('main .slick-slider').append(dotsCloneElement);

            jQuery('.slick-dots-clone li').click(function() {
                var slickIndex = jQuery(this).data('slick-index');
                jQuery('.slick-dots-clone li').removeClass('slick-active');
                jQuery(this).addClass('slick-active');

                jQuery('.slick-dots-original li').eq(slickIndex).click();
            });

            setInterval(function() {
                jQuery(".slick-dots-original li").each(function() {
                    if (jQuery(this).hasClass('slick-active')) {
                        var slickIndex = (jQuery(this).find('button').text() -1);
                        jQuery('.slick-dots-clone li').removeClass('slick-active');
                        jQuery('.slick-dots-clone li').eq(slickIndex).addClass('slick-active');
                    }
                });
            }, 100);

        });


    }


    $(".main_slider").slick({
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: false,
        //speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    });


    $('.product_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        //fade: true,
        asNavFor: '.product_slider_nav'
    });
    $('.product_slider_nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product_slider',
        dots: false,
        arrows:true,
        //centerMode: true,
        focusOnSelect: true,
        vertical:true,
        responsive: [
            {
                breakpoint: 767,

                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });


    $('.threeD_toggler').click(function(){
        $('.product_slider_box').addClass('show_3d');
    });
    $('.product_slider_nav').click(function(){
        $('.product_slider_box').removeClass('show_3d');
    });




});





