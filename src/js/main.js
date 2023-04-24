// This loads jQuery (automatically found in /node_modules/jquery)
global.$ = global.jQuery = require('jquery');
require('slick-carousel');
require("@fancyapps/fancybox");
require('isotope-layout');
require('paroller.js');
require('loading-attribute-polyfill');

var clientWidth = document.body.clientWidth;

$(document).ready(function ($) {

	document.addEventListener('DOMContentLoaded', function() {
	  fitContent();
	})

	function fitContent()
	{
	  if ('objectFit' in document.documentElement.style === false) {
	    Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function(image) {
	      (image.runtimeStyle || image.style).background = "url(\"".concat(image.src, "\") no-repeat 50%/").concat(image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'))
	      image.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='".concat(image.width, "' height='").concat(image.height, "'%3E%3C/svg%3E")
	    })
	  }
	}

  if(typeof(urlHash) !== "undefined" && urlHash != '')
  {
    $('html,body').animate({
        scrollTop: $('#' + urlHash).offset().top - 90
    }, 1000);
  }

  $(document).on('click', '.brochures-carret', function(event) {
    event.preventDefault();
    if($(this).hasClass('is-open')) {
      $(this).stop().removeClass('is-open').stop().next().stop().slideUp();
    } else {
      $('.brochures-carret').stop().removeClass('is-open').stop().next().stop().slideUp();
      $(this).stop().addClass('is-open').stop().next().stop().slideDown();
    }
  });

  $(document).on('click', '.mobile-search .header-search', function(event) {
    $(this).parent().addClass('searchIsShow');
  });

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
      history.pushState("", document.title, loc.pathname + loc.search);
  else {
      // Prevent scrolling by storing the page's current scroll offset
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;

      loc.hash = "";

      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
  }
}, false);

$(window).on("load", function () {
    // before after aniamtoin
    if($('.before-after').length > 0){
      $(".before-after").beforeafter({default_offset_pct: 0.5});
    }
    parollerTrigger();
});

$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $('header').addClass('is-stick')
  }
  if ($(window).scrollTop() == 0) {
    $('header.is-stick').removeClass('is-stick')
  }
});

$(window).on('load resize', function () {
    /* headerspacer */
    if($('.header-spacer').length){
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