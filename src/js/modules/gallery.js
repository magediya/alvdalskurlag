/**
 * GALLERY
 */
$(document).ready(function ($) 
{
  // init Isotope
  if ( $('.gallery-grid').length > 0 )
  {
    var $grid = $('.gallery-grid').isotope({});

    /*$('.filters').on( 'click', 'a', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      $('.filters a.active').removeClass('active');
      $(this).addClass('active');
    });*/
  }
});