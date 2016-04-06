// JavaScript Default Document

//jQuery Shortcut For DomReady Event
$(function() {

	//SVG/PNG Fallback
	if(!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src', function(i, val) {return val.replace('.svg','.png')});
    });
	}

});