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
			emuos: {
				deps: ['desktop']
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
			emuos: 'emuos',
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
		'emuos',
		'jquerymousewheel',
		'jqueryuicontextmenu',
		'jquerycustomscrollbar',
		'system',
		'desktop',
		'taskbar',
		'window',
		'lang'
	], function($, EmuOS) {
		$(function() {
			// noinspection JSUnusedLocalSymbols
			var desktop = new EmuOS({
				theme: 'theme-win9x'
			});

			// noinspection JSUnresolvedFunction
			desktop.window({
				title: 'test',
				content: 'this is how the world ends thisdnosifvoibdfo dfuvbdf difubfd' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>' +
					'<p>another paragraph</p>'
			}).minimize();

			// noinspection JSUnresolvedFunction
			desktop.iframe({
				title: 'test2',
				src: 'apps/monaco-editor/index.html'
			}).minimize();
		});
	});
} (this));