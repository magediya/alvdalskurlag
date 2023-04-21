/**
 * FILE HANDLING
 */
$(document).ready(function ($) 
{
  $(document).on('click', '.file-mask', function(event) {
    event.preventDefault();
    $(this).parent().parent().find('input[type="file"]').click();
  });

  $(document).on('change', 'input[type="file"].hide', function(e){
    if(e.target.files.length > 0)
    {
      if(e.target.files.length == 1)
      {
        $(this).parent().parent().find('span.files').html(e.target.files[0].name);
      }
      else
      {
        $(this).parent().parent().find('span.files').html("");
        for (var i = 0; i < e.target.files.length; i++)
        {
          var html = $(this).parent().parent().find('span.files').html();
          var br = (e.target.files.length != (i+1)) ? "<br>" : "";
          $(this).parent().parent().find('span.files').html(html + e.target.files[i].name + br);
        }
      }
    }
    else
    {
        $(this).parent().parent().find('span.files').html("");
    }
    /*var fileName = e.target.files[0].name;
    alert('The file "' + fileName +  '" has been selected.');*/
  });
});