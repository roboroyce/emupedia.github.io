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
			icons: {
				main: ''
			},
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
					title: 'Basic',
					cmd: 'basic',
					uiIcon: 'ui-icon-clipboard'
				} , {
					title: 'Windows 3.x',
					cmd: 'win3x',
					uiIcon: 'ui-icon-scissors'
				} , {
					title: 'Windows 9x',
					cmd: 'win9x',
					uiIcon: 'ui-icon-clipboard'
				}]
			}],
			select: function(e, ui) {
				switch (ui.cmd) {
					case 'refresh':
						window.location = window.location;
						break;
					case 'basic':
						$('body').removeClass('theme-win3x theme-win9x');
						break;
					case 'win3x':
						$('body').removeClass('theme-win9x').addClass('theme-win3x');
						break;
					case 'win9x':
						$('body').removeClass('theme-win3x').addClass('theme-win9x');
						break;
				}

				return true;
			}
		});

	});

} (this));