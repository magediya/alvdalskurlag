/**
 * PRODUCT DETAIL
 *
 * Product tabs.
 */

$(document).ready(function ($) {   

   //---- product tabbing ----- //
  $('.product-tabbing__switch .tab').on("click", function (e) {
    $('.product-tabbing__switch .btn.active').removeClass('active')
    $(this).find('.btn').addClass('active')
    $('.product-tabbing__block').hide();
    $('.product-tabbing__block').eq($(this).index()).show()
  });

  //---- product slider ----- //
  $('.product-slider__large').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.product-slider__thumbnails',
  });

  $('.product-slider__thumbnails').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    asNavFor: '.product-slider__large',
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 5,
        }
      }
    ]
  });  

});