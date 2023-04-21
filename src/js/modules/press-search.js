/**
* PRESS SEARCH
*/
var debug = false;
var params = {};

$(document).ready(function() {

	$(document).on('click', '.products-paginate', function(event) {
        event.preventDefault();

        log('Starting Pagination call');

        var url = $(this).attr('href');
        if(url.indexOf('feed') === -1)
        {
            url = url.replace('press', '/press/feed');
        }

        $('.loading').show();
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            cache: true,
        })
        .done(function(data, status, xhr) {
            log('AJAX Paginate finished. Showing Results to product container')
            $('.instructions').hide();
            $('.feed').html(data).show();

        })
        .fail(function() {
            log("AJAX Paginate Failed. Please review the query and feed template");
        })
        .always(function() {
            $('.loading').hide();
            log("Hiding Loading bar and Closing pagination call.");
        });
    });

	$(document).on('submit', 'form.search-form', function(event) {
        event.preventDefault();
        log('Searching from custom search string.');
        performSearch();
        /*var search = $('input[name="q"]').val();
        if (search == '') {
        	var newurl = window.location.origin + window.location.pathname;
    		window.history.pushState({path:newurl},'',newurl);
        }*/
    });

	$('.cat-filter').on('change', 'input[type="checkbox"].category-input', function(event) {
		event.preventDefault();
		// $('input[type="checkbox"].category-input').not(this).prop('checked', false);
		performSearch();
	});
});

function performSearch()
{

	var q = $('input[name="q"]').val();
    if(q != "")
    {
        log('Adding Custom Query to search : ' + q);
    }

    var subcats = [];
    $('input[type="checkbox"].category-input:checked').each(function(index, el) {
        subcats.push($(this).val());
    });

    if(subcats.length)
    {
        log("Adding Sub Cats in filter : ");
        log(subcats);
    }

	var params = {
		q: q,
		category: subcats
	}

	var newurl = window.location.origin + window.location.pathname + "?" + $.param(params);
	window.history.pushState({path:newurl},'',newurl);

	if(subcats != "" || q != "")
    {
        log('Starting Search');
		$('.loading').show();

		$.ajax({
		    url: '/press/feed',
		    type: 'GET',
		    dataType: 'html',
		    cache: true,
		    data: params,
		})
		.done(function(data, status, xhr) {
		    log('AJAX finished. Showing Results to product container');
	        $('.instructions').hide();
		    $('.feed').html(data).show();
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
		$('.feed').html('').hide();
	    $('.instructions').show();
	}
}

function log(message = "")
{
    if(debug)
    {
        console.log(message);
    }
}