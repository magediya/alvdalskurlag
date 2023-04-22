/**
 * HAMBURGER MENU
 */
$(document).ready(function ($) {

	/* Responsive Jquery Navigation */
	$('.hamburger').click(function (event) {
		$('.flyoutmenu').toggleClass('is-open');
		$('body').toggleClass('flyoutmenu-open');
	});

	document.onkeydown = function (evt) {
		evt = evt || window.event;
		if (evt.keyCode == 27) {
			$('.flyoutmenu.is-open').removeClass('is-open');
			$('body.flyoutmenu-open').removeClass('flyoutmenu-open');
		}
	};

	$('body').click(function(){
		$('.flyoutmenu.is-open').removeClass('is-open');
		$('body.flyoutmenu-open').removeClass('flyoutmenu-open');
	});

	$(".hamburger, .flyoutmenu").click(function(e){
		e.stopPropagation();
	});

  	// var clickable = $( '.flyoutmenu__menu-top' ).attr( 'data-clickable' );
  	// $( '.flyoutmenu__menu-top > ul > li' ).each(function(index, el) {
  	// 	if($(this).find('ul').length)
  	// 	{
	// 		$(this).addClass( 'has-sub' );
  	// 	}
  	// });
  	// $( '.flyoutmenu__menu-top .has-sub>a' ).appendTo( '<em class="menu__caret">' );

	// if ( clickable == 'true' )
	// {
	// 	$( '.flyoutmenu__menu-top .has-sub>.menu__caret' ).addClass( 'trigger-caret' );
	// }
	// else
	// {
	// 	$( '.flyoutmenu__menu-top .has-sub>a' ).addClass( 'trigger-caret' ).attr( 'href','javascript:;' );
	// }

	/* menu open and close on single click */
	$( '.flyoutmenu__menu-top .has-sub>.trigger-caret' ).click( function() {
		var element = $( this ).parent( 'li' );
		if ( element.hasClass( 'is-open' ) ) {
			element.removeClass( 'is-open' );
			element.find( 'li' ).removeClass( 'is-open' );
			element.find( 'ul' ).slideUp(200);
		}
		else {
			element.addClass( 'is-open' );
			element.children( 'ul' ).slideDown( 200 );
			element.siblings( 'li' ).children( 'ul' ).slideUp( 200 );
			element.siblings( 'li' ).removeClass( 'is-open' );
			element.siblings( 'li' ).find( 'li' ).removeClass( 'is-open' );
			element.siblings( 'li' ).find( 'ul' ).slideUp( 200 );
		}
	} );

	$('li.a-open').find('.trigger-caret').click();

});