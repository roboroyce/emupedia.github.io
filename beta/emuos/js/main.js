// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols
(function(global) {

	'use strict';

	$(function() {

		$('.taskbar').taskbar({
			minimizeAll: false,
			languageSelect: false,
			clock: true
		});

		$('.window').window({
			group: 'demo'
		});

		var window_height = $('.window').height();
		var list_item_height = $('.list li').height();

		/*
		var getDirection = function(e) {
			var dir = '';
			var o = $container.offset();
			var w = $container.outerWidth();
			var h = $container.outerHeight();
			var edge = 10;

			if (e.pageY > o.top && e.pageY < o.top + edge) {
				dir += 'n';
			} else {
				if (e.pageY < o.top + h && e.pageY > o.top + h - edge) {
					dir += 's';
				}
			}

			if (e.pageX > o.left && e.pageX < o.left + edge) {
				dir += 'w';
			} else {
				if (e.pageX > o.left && e.pageX > o.left + w - edge) {
					dir += 'e';
				}
			}

			return dir;
		};

		// noinspection JSValidateTypes
		$('.window').draggable({
			handle: '.title-bar',
			containment: 'document'
		}).resizable({
			minWidth: 64,
			minHeight: window_height,
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

		// noinspection JSValidateTypes
		$('.dialog').draggable({
			handle: '.title-bar',
			containment: 'document'
		});
		*/

		$('.window .content').mCustomScrollbar({
			theme: 'win311',
			axis: 'y',
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
			axis: 'y',
			scrollbarPosition: 'inside',
			scrollInertia: 0,
			snapAmount: list_item_height,
			keyboard: {
				enable: true,
				scrollAmount: list_item_height,
				scrollType: 'stepped'
			},
			scrollButtons: {
				enable: true,
				scrollAmount: list_item_height,
				scrollType: 'stepped'
			},
			mouseWheel: {
				enable: true,
				scrollAmount: list_item_height
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

		$.contextMenu({
			selector: 'body',
			items: {
				edit: {
					name: 'Edit',
					icon: 'edit'
				},
				cut: {
					name: 'Cut',
					icon: 'cut'
				},
				copy: {
					name: 'Copy',
					icon: 'copy'
				},
				paste: {
					name: 'Paste',
					icon: 'paste'
				},
				'delete': {
					name: 'Delete',
					icon: 'delete'
				},
				sep1: '---------',
				refresh: {
					name: 'Refresh',
					callback: function() {
						window.location = window.location;
						return true;
					}
				}
			}
		});

	});

}(this));