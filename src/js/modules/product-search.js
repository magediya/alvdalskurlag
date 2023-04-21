/**
* PRODUCT SEARCH
*/
var debug = false;
var params = {};
var found = false;

$(document).ready(function() {

    var q = getUrlParameter('q');
    if(typeof(q) !== "undefined" && q !== '')
    {
        $('input[name="q"]').val(q);
    }

    var subcats = getUrlParameter('subcats[]');
    if(! subcats.length && window.location.search.indexOf('subcats') !== -1)
    {
        subcats = getArrayParameters("subcats");
    }

    if(subcats.length)
    {
        $.each(subcats, function(index, val) {
            $('input[name="subcats[]"][value="' + val + '"]').prop('checked', true);
        });
    }

    if($('input[name="subcats[]"]:checked').length)
    {

        var kvaliteter = getUrlParameter('kvaliteter[]');
        if(! kvaliteter.length && window.location.search.indexOf('kvaliteter') !== -1)
        {
            kvaliteter = getArrayParameters("kvaliteter");
        }
        if(kvaliteter.length)
        {
            $.each(kvaliteter, function(index, val) {
                $('input[name="kvaliteter[]"][value="' + val + '"]').prop('checked', true);
            });
        }

        var colors = getUrlParameter('colorsVarig[]');
        if(! colors.length && window.location.search.indexOf('colors') !== -1)
        {
            colors = getArrayParameters("colorsVarig");
        }
        if(colors.length)
        {
            $.each(colors, function(index, val) {
                $('input[name="colors[Alvdal Varig][]"][value="' + val + '"]').prop('checked', true);
            });
        }

        colors = getUrlParameter('colorsRoyal[]');
        if(! colors.length && window.location.search.indexOf('colors') !== -1)
        {
            colors = getArrayParameters("colorsRoyal");
        }
        if(colors.length)
        {
            $.each(colors, function(index, val) {
                $('input[name="colors[Alvdal Royal][]"][value="' + val + '"]').prop('checked', true);
            });
        }

        colors = getUrlParameter('colorsSolid[]');
        if(! colors.length && window.location.search.indexOf('colors') !== -1)
        {
            colors = getArrayParameters("colorsSolid");
        }
        if(colors.length)
        {
            $.each(colors, function(index, val) {
                $('input[name="colors[Alvdal Solid][]"][value="' + val + '"]').prop('checked', true);
            });
        }

        var dimensions = getUrlParameter('dimensions[]');
        if(! dimensions.length && window.location.search.indexOf('dimensions') !== -1)
        {
            dimensions = getArrayParameters("dimensions");
        }
        if(dimensions.length)
        {
            $.each(dimensions, function(index, val) {
                $('input[name="dimensions[]"][value="' + val + '"]').prop('checked', true);
            });
        }

        var _default = $('input[name="subcats[]"]:checked:first');
        var li = _default.parents('li:first').parents('li:first');
        var slug = li.data('slug');
        li.addClass('active').find('.checkboxes').show();

        sidebarElementFilters();
    }

    $(document).on('click', '.main-cat > .multi-filter__caret', function(event) {
        event.preventDefault();
        let li = $(this).parent('li');

        li.siblings().removeClass('active').find('input[name="subcats[]"]').prop('checked', false);
        li.siblings().find('.checkboxes').stop().slideUp();
        $(this).stop().parent().toggleClass('active');
        $(this).next().stop().slideToggle();

        log('Click on Main Categories');
    });

    $('.sidebar-search').on('change', 'input[name="subcats[]"]', function(event) {
        event.preventDefault();
        if($(this).parents('li:first').parents('li:first').hasClass('active'))
        {
            $(this).parents('li:first').siblings().find('input[name="subcats[]"]').prop('checked', false);
            log('AJAX Search calling from Sub Categories');

            sidebarElementFilters();
            performSearch();
        }
        else
        {
            log('Parent LI is not active.');
        }
    });

    $(document).on('click', 'input[name="kvaliteter[]"]', function(event) {
        li = $(this).parents('li:first');
        if($(this).parents('label:first').find('input[type="checkbox"]').prop('checked'))
        {
            $(this).parents('li:first').addClass('active');
            $(this).parents('li:first').find('ul').stop().slideDown();
        }
        else
        {
            $(this).parents('li:first').removeClass('active');
            $(this).parents('li:first').find('ul').slideUp();
        }

        log('Click on kvaliteter Categories');
    });

    $('.sidebar-search').on('change', 'input[name="colors[Alvdal Varig][]"], input[name="colors[Alvdal Royal][]"], input[name="colors[Alvdal Solid][]"], input[name="dimensions[]"], input[name="kvaliteter[]"]', function(event) {
        event.preventDefault();
        if($('input[name="subcats[]"]:checked').length)
        {
            log('AJAX Search calling from Colors/Dimensions');
            if($(this).attr('name') == 'colors[Alvdal Varig][]' || $(this).attr('name') == 'colors[Alvdal Solid][]' || $(this).attr('name') == 'colors[Alvdal Royal][]') {
                var name = $(this).attr('name');
                $('input[name="kvaliteter[]"]').each(function(index, el) {
                    if($(this).parents("li:first").find("input[name='"+ name +"']").length) {
                        $(this).prop('checked', false).removeAttr('checked');
                    } else {
                        $(this).prop('checked', false).removeAttr('checked').parents("li:first").removeClass('active').find('ul').slideUp();
                    }
                });

                if(name == 'colors[Alvdal Varig][]') {
                    uncheckColors('Alvdal Varig');
                } else if(name == 'colors[Alvdal Royal][]') {
                    uncheckColors('Alvdal Royal');
                } else if(name == 'colors[Alvdal Solid][]') {
                    uncheckColors('Alvdal Solid');
                }

            } else if($(this).attr('name') == 'kvaliteter[]') {
                uncheckColors("foo");
            }

            sidebarElementFilters();
            performSearch();
        }
        else
        {
            log('Colors/Dimensions fallback if not sub cat is selected');
        }
    });

    $(document).on('submit', 'form.sidebar-search', function(event) {
        event.preventDefault();
        log('Searching from custom search string.');
        performSearch();
    });

    $(document).on('click', '.products-paginate', function(event) {
        event.preventDefault();

        log('Starting Pagination call');

        var url = $(this).attr('href');
        if(url.indexOf('product-feed') === -1)
        {
            url = url.replace('/produkter', '/produkter/product-feed');
        }

        $('.loading').show();
        var newurl = url.replace('/produkter/product-feed', '/produkter');
        window.history.pushState({path:newurl},'',newurl);

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            cache: true,
        })
        .done(function(data, status, xhr) {
            log('AJAX Paginate finished. Showing Results to product container');


            $('.instructions').hide();
            $('.product-data').html(data).show();
            // fitContent();
            $("html, body").animate({
                scrollTop: $('.py-50.py-md-100.content-width').offset().top - 50
            }, "fast");
        })
        .fail(function() {
            log("AJAX Paginate Failed. Please review the query and feed template");
        })
        .always(function() {
            $('.loading').hide();
            log("Hiding Loading bar and Closing pagination call.");
        });
    });

});

function sidebarElementFilters()
{

    $('.kvaliteter-item').hide().parent('ul').hide().parent('.kvaliteter-wrapper').hide();
    $('.dimensions-item').hide().parent('ul').hide().parent('.dimensions-wrapper').hide();
    $('.colors-item').hide();

    var _this = $('input[name="subcats[]"]:checked');
    var slug = 'cat-' + _this.data('slug');
    $('input[name="kvaliteter[]"]:checked').each(function(index, el) {
        if(! $(this).parents('li:first').hasClass(slug)) {
            $(this).prop('checked', false).removeAttr('checked').parents('li:first').hide();
        } else {
            $(this).parents('li:first').addClass('active').find('ul').show();
        }
    });

    $('input[name="dimensions[]"]:checked').each(function(index, el) {
        if(! $(this).parents('li:first').hasClass(slug)) {
            $(this).prop('checked', false).removeAttr('checked').parents('li:first').hide();
        }
    });

    $('input[name="colors[Alvdal Varig][]"]:checked').each(function(index, el) {
        if(! $(this).parents('li:first').hasClass(slug)) {
            $(this).prop('checked', false).removeAttr('checked').parents('li:first').hide();
        }
    });

    $('input[name="colors[Alvdal Royal][]"]:checked').each(function(index, el) {
        if(! $(this).parents('li:first').hasClass(slug)) {
            $(this).prop('checked', false).removeAttr('checked').parents('li:first').hide();
        }
    });

    $('input[name="colors[Alvdal Solid][]"]:checked').each(function(index, el) {
        if(! $(this).parents('li:first').hasClass(slug)) {
            $(this).prop('checked', false).removeAttr('checked').parents('li:first').hide();
        }
    });

    log("Check for kvaliteter-item for : " + slug);
    if($('li.' + slug + '.kvaliteter-item').length) {
        log("Found : " + slug);
        $('li.' + slug + '.kvaliteter-item').show().parent('ul').show().parent('.kvaliteter-wrapper').show();
    } else {
        log("Not Found : " + slug);
        $('li.' + slug + '.kvaliteter-item').hide().parent('ul').hide().parent('.kvaliteter-wrapper').hide();
    }

    if($('li.' + slug + '.dimensions-item').length) {
        $('li.' + slug + '.dimensions-item').show().parent('ul').show().parent('.dimensions-wrapper').show();
    } else {
        $('li.' + slug + '.dimensions-item').hide().parent('ul').hide().parent('.dimensions-wrapper').hide();
    }

    if($('li.' + slug + '.colors-item').length) {
        $('li.' + slug + '.colors-item').show();
    } else {
        $('li.' + slug + '.colors-item').hide();
    }

    if($('input[name="colors[Alvdal Varig][]"]:checked').length == 0 && $('input[name="colors[Alvdal Varig][]"]:first').parents('ul:first').parents('li:first').find('input[name="kvaliteter[]"]:checked').length == 0) {
        $('input[name="colors[Alvdal Varig][]"]:first').parents('ul:first').hide().parent('li').removeClass('active');
    } else {
        $('input[name="colors[Alvdal Varig][]"]:first').parents('ul:first').show().parent('li').addClass('active');
    }

    if($('input[name="colors[Alvdal Royal][]"]:checked').length == 0 && $('input[name="colors[Alvdal Royal][]"]:first').parents('ul:first').parents('li:first').find('input[name="kvaliteter[]"]:checked').length == 0) {
        $('input[name="colors[Alvdal Royal][]"]:first').parents('ul:first').hide().parent('li').removeClass('active');
    } else {
        $('input[name="colors[Alvdal Royal][]"]:first').parents('ul:first').show().parent('li').addClass('active');
    }

    if($('input[name="colors[Alvdal Solid][]"]:checked').length == 0 && $('input[name="colors[Alvdal Solid][]"]:first').parents('ul:first').parents('li:first').find('input[name="kvaliteter[]"]:checked').length == 0) {
        $('input[name="colors[Alvdal Solid][]"]:first').parents('ul:first').hide().parent('li').removeClass('active');
    } else {
        $('input[name="colors[Alvdal Solid][]"]:first').parents('ul:first').show().parent('li').addClass('active');
    }

}

function uncheckColors(base = "")
{
    var baseColors = ["Alvdal Varig", "Alvdal Royal", "Alvdal Solid"];
    if(base != "")
    {
        baseColors = removeArrayItem(baseColors, base);
    }

    $.each(baseColors, function(index, val) {
        $('input[name="colors[' + val + '][]"]:checked').each(function(index, el) {
            $(this).prop('checked', false).removeAttr('checked');
        });

        if(! $('input[name="colors[' + val + '][]:checked"').length) {
            $('input[name="colors[' + val + '][]:first"').parents('ul:first').slideUp().parent('li').removeClass('active');
        }
    });
}

function performSearch()
{

    var q = $('input[name="q"]').val();
    if(q != "")
    {
        log('Adding Custom Query to search : ' + q);
    }

    var subcats = [];
    $('input[name="subcats[]"]:checked').each(function(index, el) {
        subcats.push($(this).val());
    });

    if(subcats.length)
    {
        log("Adding Sub Cats in filter : ");
        log(subcats);
    }

    var colorsVarig = [];
    $('input[name="colors[Alvdal Varig][]"]:checked').each(function(index, el) {
        colorsVarig.push($(this).val());
    });
    if(colorsVarig.length)
    {
        log("Adding Alvdal Varig Colors in filter : ");
        log(colorsVarig);
    }

    var colorsRoyal = [];
    $('input[name="colors[Alvdal Royal][]"]:checked').each(function(index, el) {
        colorsRoyal.push($(this).val());
    });
    if(colorsRoyal.length)
    {
        log("Adding Alvdal Royal Colors in filter : ");
        log(colorsRoyal);
    }

    var colorsSolid = [];
    $('input[name="colors[Alvdal Solid][]"]:checked').each(function(index, el) {
        colorsSolid.push($(this).val());
    });
    if(colorsSolid.length)
    {
        log("Adding Alvdal Solid Colors in filter : ");
        log(colorsSolid);
    }

    var dimensions = [];
    $('input[name="dimensions[]"]:checked').each(function(index, el) {
        dimensions.push($(this).val());
    });
    if(dimensions.length)
    {
        log("Adding Dimensions in filter : ");
        log(dimensions);
    }

    var kvaliteter = [];
    $('input[name="kvaliteter[]"]:checked').each(function(index, el) {
        kvaliteter.push($(this).val());
    });
    if(kvaliteter.length)
    {
        log("Adding Kvaliteter in filter : ");
        log(kvaliteter);
    }

    log('Perform Search if Sub Cat or Custom query is not null');
    params = {
        q: q,
        subcats: subcats,
        dimensions: dimensions,
        kvaliteter: kvaliteter,
        colorsVarig: colorsVarig,
        colorsRoyal: colorsRoyal,
        colorsSolid: colorsSolid,
    };

    log("Changing URL Parameters to:");
    log(params);
    var newurl = window.location.origin + "/produkter?" + decodeURI($.param(params));
    window.history.pushState({path:newurl},'',newurl);

    if(subcats != "" || q != "")
    {
        log('Starting Search');
        $('.loading').show();

        $.ajax({
            url: '/produkter/product-feed',
            type: 'GET',
            dataType: 'html',
            cache: true,
            data: params,
        })
        .done(function(data, status, xhr) {
            log('AJAX finished. Showing Results to product container')
            $('.instructions').hide();
            $('.product-data').html(data).show();
            // fitContent();
            $("html, body").animate({
                scrollTop: $('.py-50.py-md-100.content-width').offset().top - 50
            }, "fast");
        })
        .fail(function() {
            log("AJAX Failed. Please review the query and feed template");
        })
        .always(function() {
            $('.loading').hide();
            log("Hiding Loading bar.");
        });

    }
    else
    {
        log('Cannot Search due to missing Sub cat and Custom query both. Hiding product container');
        $('.product-data').html('').hide();
        $('.instructions').show();
    }
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }

    return ret.join('&');
}

function removeArrayItem(array, item)
{
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }

    return array;
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1).replace(new RegExp("\\+","g"),' '));
    var array =[]
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            array.push(sParameterName[1]);
        }
    }
    return array;
}

function getArrayParameters(key, start = 0, data = [], retry = 0)
{
    var tmp = getUrlParameter(key + "[" + start + "]");
    if(tmp.length) {
        data.push(tmp[0]);
        return getArrayParameters(key, start+1, data, 0);
    }

    if(retry < 5) {
        return getArrayParameters(key, start+1, data, retry+1);
    }

    return data;
}

function log(message = "")
{
    if(debug)
    {
        console.log(message);
    }
}