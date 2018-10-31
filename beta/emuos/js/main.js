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
			jqueryuitree: {
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
			jquerymousewheel: 'libraries/jquery-mousewheel-3.1.13.min',
			jqueryui: 'libraries/jquery-ui-1.11.4.min',
			jqueryuicontextmenu: 'libraries/jquery-ui-contextmenu-1.18.1.min',
			jqueryuitree: 'libraries/jquery-ui-tree-3.0.0.min',
			jquerycustomscrollbar: 'libraries/jquery-customscrollbar-3.1.5.min',
			jqyeryajaxretry: 'libraries/jquery-ajax-retry-0.2.7.min',
			jsrsasign: 'libraries/jsrsasign-all-8.0.12.min',
			promise: 'polyfills/es6-promise-4.2.5.min',
			fetch: 'polyfills/es6-fetch-3.0.0',
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
		'jqueryuitree',
		'jquerycustomscrollbar',
		'jqyeryajaxretry'
	], function($, EmuOS, FileSystem, github_private_key) {
		$(function() {
			var filesystem = new FileSystem({
				github: {
					private_key: github_private_key
				}
			});

			// noinspection JSUnusedLocalSymbols
			var desktop = new EmuOS({
				filesystem: filesystem,
				theme: 'theme-win9x'
			});

			// noinspection JSUnresolvedFunction
			desktop.window({
				title: 'Simple Window with Text',
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
			desktop.window({
				title: 'Tree Component',
				icon: 'apps/wing/favicon.ico',
				content:'<ul class="tree theme-classic">' +
							'<li class="tree-leaf tree-has-children">' +
								'<a class="tree-leaf-label" href="javascript:">Label A</a>' +
								'<input type="checkbox" />' +
								'<span class="tree-toggle"></span>' +
								'<ul class="tree-subtree">' +
									'<li class="tree-leaf tree-has-children">' +
										'<a class="tree-leaf-label" href="javascript:">Label A.A</a>' +
										'<input type="checkbox" />' +
										'<span class="tree-toggle"></span>' +
										'<ul class="tree-subtree">' +
											'<li class="tree-leaf">' +
												'<a class="tree-leaf-label" href="javascript:">Label A.A.A</a>' +
											'</li>' +
											'<li class="tree-leaf">' +
												'<a class="tree-leaf-label" href="javascript:">Label A.A.B</a>' +
											'</li>' +
										'</ul>' +
									'</li>' +
									'<li class="tree-leaf">' +
										'<a class="tree-leaf-label" href="javascript:">Label A.A.A</a>' +
									'</li>' +
									'<li class="tree-leaf">' +
										'<a class="tree-leaf-label" href="javascript:">Label A.A.B</a>' +
									'</li>' +
									'<li class="tree-leaf tree-has-children">' +
										'<a class="tree-leaf-label" href="javascript:">Label A.A</a>' +
										'<input type="checkbox" />' +
										'<span class="tree-toggle"></span>' +
										'<ul class="tree-subtree">' +
											'<li class="tree-leaf">' +
												'<a class="tree-leaf-label" href="javascript:">Label A.A.A</a>' +
											'</li>' +
											'<li class="tree-leaf">' +
												'<a class="tree-leaf-label" href="javascript:">Label A.A.B</a>' +
											'</li>' +
										'</ul>' +
									'</li>' +
								'</ul>' +
							'</li>' +
							'<li class="tree-leaf tree-has-children">' +
								'<a class="tree-leaf-label" href="javascript:">Label B</a>' +
								'<input type="checkbox" />' +
								'<span class="tree-toggle"></span>' +
								'<ul class="tree-subtree">' +
									'<li class="tree-leaf">' +
										'<a class="tree-leaf-label" href="javascript:">Label B.A</a>' +
									'</li>' +
								'</ul>' +
							'</li>' +
						'</ul>'
			});

			// noinspection JSUnresolvedFunction
			desktop.window({
				title: 'FileTree Component',
				icon: 'apps/wing/favicon.ico',
				content: '<div id="treeview"></div>'
			});

			// noinspection JSUnresolvedFunction
			filesystem.getTree(function (tree) {
				console.log(tree);

				// noinspection AmdModulesDependencies
				$('#treeview').btechcotree({
					containerid: 'treeview',
					dataset: {root: tree},
					datatype: $treedatatype.Json,
					dataformat: $treedataformat.Hierarchy,
					class_node_collapse: 'ui-icon-circle-minus',
					class_node_expand: 'ui-icon-circle-plus',
					class_node_item: 'ui-icon-clipboard',
					class_node_highlight: 'ui-state-highlight',
					class_node_add: 'ui-icon-plusthick',
					class_node_remove: 'ui-icon-minusthick',
					collapse_tree: true,
					show_button_check: false,
					show_button_add: false,
					show_button_remove: false,
					node_remove_message: 'Are you sure?'
				});
			});

			// noinspection JSUnresolvedFunction
			desktop.iframe({
				title: 'Visual Studio Code',
				icon: 'apps/monaco-editor/favicon.ico',
				src: 'apps/monaco-editor/index.html'
			});

			// noinspection JSUnresolvedFunction
			desktop.iframe({
				title: 'DOSBox 0.74',
				icon: 'apps/dosbox/favicon.ico',
				src: 'apps/dosbox/index.html'
			});
		});
	});
} (this));