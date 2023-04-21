/**
 * ACCORDION 
 *
 * Used on the FAQ page
 */
$(document).ready(function ($) 
{
	$('.accordion__card-header').on("click", function (e) 
	{
		$(this).stop().toggleClass('is-show')
		$(this).parent().siblings().find('.accordion__card-body').stop().slideUp()
		$(this).parent().siblings().find('.accordion__card-header').stop().removeClass('is-show')
		$(this).next().stop().slideToggle()
	});
});
