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
			}
		});

		$('.emuos-window .emuos-window-content').mCustomScrollbar({
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

		$('.emuos-window').contextmenu({
			autoTrigger: false,
			delegate: '.emuos-window-icon',
			menu: [{
				title: 'Restore',
				cmd: 'restore',
				disabled: true
			} , {
				title: 'Move',
				cmd: 'move'
			} , {
				title: 'Size',
				cmd: 'size'
			} , {
				title: 'Minimize',
				cmd: 'minimize'
			} , {
				title: 'Maximize',
				cmd: 'maximize'
			} , {
				title: '----'
			} , {
				title: 'Close',
				cmd: 'close'
			} , {
				title: '----'
			} , {
				title: 'Next',
				cmd: 'next'
			}],
			select: function(e, ui) {

			},
			close: function (e, ui) {
				console.log(e);
			}
		});

		$('.emuos-window-icon').on('click', function() {
			$(this).parents('.emuos-window').contextmenu('open', $(this));
		});
	});
} (this));