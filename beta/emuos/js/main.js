// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols
(function(global) {
	'use strict';

	// noinspection JSFileReferences
	require.config({
		shim: {
			jquerymousewheel: {
				deps: ['jquery']
			},
			jqueryui: {
				deps: ['jquery']
			},
			jqueryuicontextmenu: {
				deps: ['jqueryui']
			},
			jquerycustomscrollbar: {
				deps: ['jquery']
			},
			desktop: {
				deps: ['window']
			},
			taskbar: {
				deps: ['jqueryui']
			},
			window: {
				deps: ['taskbar']
			},
			lang: {
				deps: ['taskbar']
			}
		},
		map: {
			'*': {
				'jQuery': 'jquery'
			}
		},
		paths: {
			jquery: 'libraries/jquery-2.2.4.min',
			jquerymousewheel: 'libraries/jquery.mousewheel-3.1.13.min',
			jqueryui: 'libraries/jquery-ui-1.11.4.min',
			jqueryuicontextmenu: 'libraries/jquery.ui-contextmenu-1.18.1.min',
			jquerycustomscrollbar: 'libraries/jquery.mCustomScrollbar-3.1.5.min',
			system: 'system',
			desktop: 'desktop',
			taskbar: 'taskbar',
			window: 'window',
			lang: 'lang-en'
		}
	});

	// noinspection JSCheckFunctionSignatures, JSUnusedLocalSymbols
	require([
		'jquery',
		'jquerymousewheel',
		'jqueryuicontextmenu',
		'jquerycustomscrollbar',
		'system',
		'desktop',
		'taskbar',
		'window',
		'lang'
	], function($) {
		$(function() {
			var $document	= $(document);
			var $window		= $(window);
			var $html		= $('html');
			var $body		= $('body');

			if (!(isIE || isEdge)) {
				// TODO: Performance problem on window drag and resize caused by custom cursors
				importStyles('css/themes/win3x/cursors.css');
			}

			// noinspection JSUnresolvedFunction
			$('.taskbar').taskbar({
				draggable: true,
				resizable: true,
				minimizeAll: false,
				languageSelect: false,
				toggleFullscreen: true,
				clock: true
			});

			// noinspection JSUnresolvedFunction
			$('.desktop').desktop({
				iconClass: '.icon',
				parent: '.emuos-taskbar-windows-containment'
			});

			// noinspection JSUnresolvedFunction
			$('.window').window({
				icons: {
					main: ''
				}
			});

			// noinspection JSUnresolvedFunction
			$('.iframe').window({
				embeddedContent: true,
				width: 640,
				height: 480,
				position: {
					my: 'center',
					at: 'center center-20%',
					of: window,
					collision: 'fit'
				},
				icons: {
					main: ''
				}
			});

			$('.emuos-window .window.emuos-window-content').mCustomScrollbar({
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

			$html.contextmenu({
				delegate: 'body, .emuos-taskbar',
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
							$body.removeClass('theme-win3x theme-win9x');
							break;
						case 'win3x':
							$body.removeClass('theme-win9x').addClass('theme-win3x');
							break;
						case 'win9x':
							$body.removeClass('theme-win3x').addClass('theme-win9x');
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
					switch (ui.cmd) {
						case 'close':
							$(e.target).children('.window, .iframe').first().window('close');
							break;
					}

					return true;
				},
				close: function (e) {
					console.log(e);
				}
			});

			$('.emuos-window-icon').on('click', function(e) {
				$(this).parents('.emuos-window').first().contextmenu('open', $(this));
				e.preventDefault();
			});
		});
	});
} (this));