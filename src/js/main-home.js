// This loads jQuery (automatically found in /node_modules/jquery)
global.$ = global.jQuery = require('jquery');
// For popup
require("@fancyapps/fancybox");
// For parallax
require('paroller.js');
// Lazy loading polyfill
require('loading-attribute-polyfill');

// Init vars
var clientWidth = document.body.clientWidth;

$(document).ready(function ($) {

    if ( typeof(urlHash) !== "undefined" && urlHash != '' )
    {
        $('html,body').animate({
            scrollTop: $('#' + urlHash).offset().top - 90
        }, 1000);
    }

    addFavCount();
});

$(window).on('resize',function(){
    clientWidth = document.body.clientWidth;
});

var urlHash = "";
window.addEventListener("DOMContentLoaded", function(e) {
    urlHash = window.location.href.split("#")[1];
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
    {
        history.pushState("", document.title, loc.pathname + loc.search);
    }
    else
    {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}, false);

// For window on load
$(window).on("load", function () {
    // Init floating tab
    $('.floating-window').removeAttr('style');
    parollerTrigger();
});

// For window on scroll
$(window).scroll(function () {
  if ($(window).scrollTop() > 100)
  {
    $('header').addClass('is-stick')
  }
  if ($(window).scrollTop() == 0)
  {
    $('header.is-stick').removeClass('is-stick')
  }
});

// For window on load and resize
$(window).on('load resize', function () {
    /* headerspacer */
    if ( $('.header-spacer').length )
    {
        $('.header-spacer').css('min-height',$('#header').innerHeight() + $('.breadcrumb').innerHeight())
    }
});

function parollerTrigger() {
    if($('.parallax-wrapper').length > 0 && $(window).width() > 767){
        $('.parallax-wrapper').each(function(index, el) {
            if(($(window).scrollTop() + 400) > $(this).offset().top && typeof($(this).find('.parallax-img').attr('style')) === "undefined")
            {
                $(this).children('.parallax-img').paroller();
            }
        });

        setTimeout(function() {
            $(window).resize();
        }, 200);
    }

    $(window).scroll(function () {
        if($('.parallax-wrapper').length > 0 && $(window).width() > 767){
            $('.parallax-wrapper').each(function(index, el) {
                if(($(window).scrollTop() + 400) > $(this).offset().top && typeof($(this).find('.parallax-img').attr('style')) === "undefined")
                {
                    $(this).children('.parallax-img').paroller();
                    /*setTimeout(function() {
                        $(window).resize();
                    }, 200);*/
                }
            });
        }
    });
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function addFavCount()
{
  if($('.fav-count').length)
  {
    cookie = getCookie('favourites_items');
    if(cookie != '')
    {
      cookie = JSON.parse(cookie);
      if(cookie.length > 0)
      {
        if($('.fav-count').children('a').children('span').length)
        {
          $('.fav-count').children('a').children('span').html(" (" + cookie.length + ")")
        }
        else
        {
          $('.fav-count').children('a').append("<span style=\"color: inherit;\">(" + cookie.length + ")</span>");
        }
      }
      else
      {
        $('.fav-count').children('a').children('span').remove();
      }
    }
  }
}