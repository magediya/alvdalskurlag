/**
 * BEFORE AND AFTER IMAGE
 */
$(document).ready(function ($) 
{
    $('.before-after-colors').click(function(event) 
    {
        event.preventDefault();
        if(! $(this).hasClass('active'))
        {
            $(this).parent().siblings().find('.before-after-colors').each(function(index, el) 
            {
                $(this).removeClass('active');
            });

            $(this).addClass('active');
            $(this).parents('ul:first').prev('.beforeafter-wrapper').find('.before-img').attr('src', $(this).data('before'));
            $(this).parents('ul:first').prev('.beforeafter-wrapper').find('.beforeafter-color-name').children('h4').html($(this).find('input[type="radio"]').val());
            $(this).parents('ul:first').prev('.beforeafter-wrapper').find('.after-img').attr('src', $(this).data('after'));
        }
    });
});