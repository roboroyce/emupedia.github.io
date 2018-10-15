// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols
(function(global) {
	'use strict';

	// noinspection JSFileReferences
	require.config({
		waitSeconds : 300,
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
			jsrsasign: {
				exports: 'KJUR'
			},
			octokat: {
				deps: ['promise', 'fetch']
			},
			emuos: {
				deps: ['desktop']
			},
			filesystem: {
				deps: ['jqueryui', 'jqyeryajaxretry', 'jsrsasign', 'octokat']
			},
			desktop: {
				deps: ['window']
			},
			taskbar: {
				deps: ['filesystem']
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
			jqyeryajaxretry: 'libraries/jquery-ajax-retry-0.2.7.min',
			jsrsasign: 'libraries/jsrsasign-all-8.0.12.min',
			promise: 'libraries/es6-promise.auto-polyfill-4.2.5.min',
			fetch: 'libraries/es6-fetch-polyfill-3.0.0',
			octokat: 'libraries/octokat-0.10.0',
			json: 'libraries/requirejs-json-1.0.2',
			text: 'libraries/requirejs-text-2.0.15',
			optional: 'libraries/requirejs-optional-1.0.0',
			emuos: 'emuos',
			system: 'system',
			filesystem: 'filesystem',
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
		'filesystem',
		'text!../certs/emudisk.pem',
		'desktop',
		'taskbar',
		'window',
		'lang',
		'system',
		'jquerymousewheel',
		'jqueryuicontextmenu',
		'jquerycustomscrollbar',
		'jqyeryajaxretry'
	], function($, EmuOS, FileSystem, github_private_key) {
		$(function() {
			// noinspection JSUnusedLocalSymbols
			var desktop = new EmuOS({
				filesystem: new FileSystem({
					github: {
						private_key: github_private_key
					}
				}),
				theme: 'theme-win9x'
			});

			// noinspection JSUnresolvedFunction
			desktop.window({
				title: 'test',
				icon: 'apps/wing/favicon.ico',
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
			});

			// noinspection JSUnresolvedFunction
			desktop.iframe({
				title: 'test2',
				icon: 'apps/monaco-editor/favicon.ico',
				src: 'apps/monaco-editor/index.html'
			});
		});
	});
} (this));