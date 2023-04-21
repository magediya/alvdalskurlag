/**
 * FLOATING WINDOW
 */
$(document).ready(function ($) {

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

});