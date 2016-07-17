
jQuery.fn.isOnScreen = function() {

    var win = jQuery(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};



jQuery(function($) {
    /***********************************
     Global Variables
     ************************************/
    var $window = $(window);
    var $body = $('body');
    /***********************************
     Scrollers
     ************************************/
    function scrollTo(object, speed) {
        var $object;
        var scroll;
        if (typeof speed === "undefined" || speed === null) {
            speed = 1500;
        }

        if (typeof object === 'string') {
            $object = $(object);
            scroll = $object.offset().top - 70;
        } else if (object instanceof $) {
            $object = object;
            scroll = $object.offset().top - 70;
        } else if ($.isNumeric(object)) {
            scroll = object;
        } else {
            $object = $('body');
            scroll = $object.offset().top - 70;
        }

        scroll = (scroll >= 0) ? scroll : 0;
        $('body, html').animate({
            scrollTop: scroll
        }, speed);
    }

    $('a[data-scrollTo]').click(function(e) {
        var target = $(this).attr('data-scrollTo');
        scrollTo(target);
        e.preventDefault();
    });
    $('#backtotop').click(function() {
        scrollTo(0);
    });
    $('.next-section').click(function() {
        var $btn = $(this);
        var $parent = $btn.parents('section');
        var parentindex = $('section').index($parent);
        var $nextparent = $('section').eq(parentindex + 1);
        scrollTo($nextparent);
    });
    /***********************************
     Element Animation
     ************************************/

    function animate() {
        $('[data-animate]').each(function() {
            var $this = $(this);
            if ($this.isOnScreen()) {
                var animation = $this.attr('data-animate');
                var delay = $this.attr('data-animate-delay') ? $this.attr('data-animate-delay') : 0;
                setTimeout(function() {
                    $this.addClass('animated').addClass(animation);
                }, delay);
            }
        });
    }

        /***********************************
     Window Binding
     ************************************/
    var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    $window.scroll(function(e) {
        var scrolled = $window.scrollTop();
            animate();
        
        if (scrolled > 0) {
            $('#navbar').removeClass('navbar-lg');
        } else {
            $('#navbar').addClass('navbar-lg');
        }

        if (scrolled > 100) {
            $('#backtotop').removeClass('opacity-hide');
        } else {
            $('#backtotop').addClass('opacity-hide');
        }
    }).trigger('scroll');
    $window.resize(function() {

    }).trigger('resize');

});