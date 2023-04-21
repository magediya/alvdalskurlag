// This loads jQuery (automatically found in /node_modules/jquery)
global.$ = global.jQuery = require('jquery');
require('slick-carousel');
require("@fancyapps/fancybox");
require('isotope-layout');
require('loading-attribute-polyfill');

var clientWidth = document.body.clientWidth;
var cookie;

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

  $(document).on('click', '.add-fav', function(event) {
    event.preventDefault();

    var id = $(this).data('id');
    var found = false;
    if(id != "" && id != null && id != 'null')
    {
      cookie = getCookie('favourites_items');
      if(cookie == "")
      {
        cookie = [];
      }
      else
      {
        cookie = JSON.parse(cookie);
      }

      for( var i = 0; i < cookie.length; i++)
      {
        if ( cookie[i] === id || cookie[i] == null || cookie[i] == "null")
        {
          found = true;
          // cookie.splice(i, 1);
        }
      }

      $(this).addClass('current');
      $(this).val($(this).data('active_text'));

      if(found == false)
      {
        cookie.push(id);
        cookie = JSON.stringify(cookie);
        setCookie('favourites_items', cookie, 30);
        addFavCount();
      }

      $(this).blur();
      return true;

    }
  });

  $(document).on('click', '.remove-item-fav', function(event) {
    event.preventDefault();

    var id = $(this).data('id');
    if(id != "" && id != null && id != 'null')
    {
      cookie = getCookie('favourites_items');
      if(cookie == "")
      {
        cookie = [];
      }
      else
      {
        cookie = JSON.parse(cookie);
      }

      for( var i = 0; i < cookie.length; i++)
      {
        if ( cookie[i] === id || cookie[i] == null || cookie[i] == "null")
        {
          cookie.splice(i, 1);
        }
      }

      cookie = JSON.stringify(cookie);
      setCookie('favourites_items', cookie, 30);
      $(this).parents('.repeater:first').fadeOut(function(){
        addFavCount();
        $(this).remove();

        if(! $('.repeater').length) {
          $('.no-data').show();
          $('.has-data').hide();
        }
      })
    }
    else
    {
      alert('Product ID not found!');
    }
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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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