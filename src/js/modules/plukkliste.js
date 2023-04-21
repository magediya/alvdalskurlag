/**
 * Plukkliste (favorites)
 */
var cookie;
$(document).ready(function ($) {

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
      })
    }
    else
    {
      alert('Product ID not found!');
    }
  });

  addFavCount();

  clientWidth = document.body.clientWidth;
  $('.floating-window').hover(function(event) {
    if(clientWidth >= 768)
    {
      $(this).addClass('open');
    }
  }, function() {
      $(this).removeClass('open');
  });

  $(document).on('click', '.floating-window__logo', function(event) {
    event.preventDefault();
    if(clientWidth < 768)
    {
      $(this).parent('.floating-window').toggleClass('open');
    }
  });

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

});