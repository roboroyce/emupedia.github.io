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

		/*$('.window.ui-dialog-content').mCustomScrollbar({
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
		});*/

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

		$(document).contextmenu({
			delegate: '.emuos-taskbar-window-copy',
			menu: [{
				title: 'Refresh',
				cmd: 'refresh',
				uiIcon: 'ui-icon-copy'
			} , {
				title: '----'
			} , {
				title: 'Themes',
				children: [{
					title: 'Windows 3.1/3.11',
					cmd: 'win311',
					uiIcon: 'ui-icon-scissors'
				} , {
					title: 'Windows 95/98/Me',
					cmd: 'win98',
					uiIcon: 'ui-icon-clipboard'
				}]
			}],
			select: function(e, ui) {
				switch (ui.cmd) {
					case 'refresh':
						window.location = window.location;
						break;
					case 'win311':
						$('body').removeClass('theme-win98').addClass('theme-win311');
						break;
					case 'win98':
						$('body').removeClass('theme-win311').addClass('theme-win98');
						break;
				}

				return true;
			}
		});

	});

} (this));