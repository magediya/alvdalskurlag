/**
 * TABBING
 */
$(document).ready(function ($) 
{
  // responsive dropdown
  var resDD = $('.responsive-dd');
  if(resDD.length > 0){
      $(resDD).wrap('<div class="responsive-dd-wrap"></div>');
      $(resDD).before('<span class="responsive-select">Select category</span>');
  var resDDWrap = $('.responsive-dd-wrap'),
      resDDSelect = $('.responsive-select');

      resDDSelect.html($(resDD).find('.active').text())
      resDDSelect.click(function(){
          $(resDD).stop().slideUp()
          $(this).next().stop().slideToggle();
      })
      resDDWrap.click(function(e){
          e.stopPropagation();
      });
      $('body').click(function(){
          $(resDD).slideUp();
      })
      $(window).on('load resize',function(){
          if($(window).width() < resDD.attr('breckpoint')){
            resDD.find('a').click(function(){
                  $(this).parent().parent().prev(resDDSelect).html($(this).html());
                  $(this).parent().parent().stop().slideUp()
              });
              resDD.hide();
          }else{
            resDD.show();
          }
      })
  }

  $('.tab-trigger').click(function(event) {
    event.preventDefault();

    if(! $(this).hasClass('active'))
    {
      $(this).parent().siblings().find('.tab-trigger').each(function(index, el) {
        $(this).removeClass('active');
        $('#' + $(this).data('tab')).hide();
      });

      $(this).addClass('active');
      $('#' + $(this).data('tab')).show();
    }
  });
});