$(function() {

	// noinspection JSValidateTypes
	$('.window, .dialog').draggable({
		handle: '.title-bar',
		containment: 'document'
	}).resizable({
		minWidth: 64,
		minHeight: $('.window').height(),
		containment: 'document',
		handles: {
			n: '.ui-resizable-n',
			e: '.ui-resizable-e',
			s: '.ui-resizable-s',
			w: '.ui-resizable-w',
			nw: '.ui-resizable-nw',
			ne: '.ui-resizable-ne',
			sw: '.ui-resizable-sw',
			se: '.ui-resizable-se'
		}
	});

	$('.window .content').mCustomScrollbar({
		theme: 'win311',
		axis: 'yx',
		scrollbarPosition: 'inside',
		scrollInertia: 0,
		alwaysShowScrollbar: 0,
		keyboard: {
			enable: true
		},
		scrollButtons: {
			enable: true
		},
		mouseWheel: {
			enable: true
		},
		advanced: {
			updateOnContentResize: true,
			updateOnImageLoad: true,
			updateOnSelectorChange: true
		},
		live: true
	});

	$('.list').mCustomScrollbar({
		theme: 'win311',
		scrollbarPosition: 'inside',
		scrollInertia: 0,
		snapAmount: $('.list li').height(),
		keyboard: {
			enable: true,
			scrollAmount: $('.list li').height(),
			scrollType: 'stepped'
		},
		scrollButtons: {
			enable: true,
			scrollAmount: $('.list li').height(),
			scrollType: 'stepped'
		},
		mouseWheel: {
			enable: true,
			scrollAmount: $('.list li').height()
		},
		advanced: {
			updateOnContentResize: true,
			updateOnImageLoad: true,
			updateOnSelectorChange: true
		},
		live: true
	});

	$('.list li').off('click').on('click', function() {
		$('.list li').removeClass('selected');
		$(this).addClass('selected');
	});

});