// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	console.log('╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗\n' +
				'╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣\n' +
				'╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩');

	// noinspection JSUnusedLocalSymbols
	define('optional', [], {
		load: function(name, req, onload, config) {
			var onLoadSuccess = function(moduleInstance) {
				onload(moduleInstance);
			};

			var onLoadFailure = function(err) {
				var failedId = err.requireModules && err.requireModules[0];
				console.warn('Could not load optional module: ' + failedId);

				requirejs.undef(failedId);

				// noinspection JSRedundantSwitchStatement
				switch (failedId) {
					default:
						define(failedId, [], function(){return {};});
						break;
				}

				req([failedId], onLoadSuccess);
			};

			req([name], onLoadSuccess, onLoadFailure);
		},
		normalize: function (name, normalize) {
			return normalize(name);
		}
	});

	define('github', [], {
		load: function (name, req, onload, config) {
			// noinspection JSUnresolvedVariable,DuplicatedCode
			var obj = {
				use_get_files_contents: false,
				cache_prefix: 'github!',
				cache: {},
				storage_usable: SYSTEM_FEATURE_LOCAL_STORAGE,
				get_cache: function (url) {
					var item = obj.cache_prefix + url;
					var ret = !!obj.cache[item] ? obj.cache[item] : false;

					if (!ret && obj.storage_usable) {
						var s_data = localStorage.getItem(item);

						if (s_data) {
							try {
								s_data = JSON.parse(s_data);
							} catch (e) {
								s_data = false;
							}

							if (s_data) {
								ret = obj.cache[url] = s_data;
							}
						}
					}

					return ret;
				},
				set_cache: function (url, data) {
					var item = obj.cache_prefix + url;
					obj.cache[item] = data;

					if (obj.storage_usable) {
						localStorage.setItem(item, JSON.stringify(data));
					}
				},
				get_files_contents: function (data, cb) {
					var tmp_data = JSON.parse(JSON.stringify(data));
					var ret_data = [];
					var files_count = 0;
					var loaded_count = 0;

					// noinspection JSDuplicatedDeclaration
					for (var file_index in tmp_data) {
						// noinspection JSDuplicatedDeclaration,JSUnfilteredForInLoop
						var file = tmp_data[file_index];

						if (file.type === 'file') {
							files_count++;
						}
					}

					// noinspection JSDuplicatedDeclaration
					for (var file_index in tmp_data) {
						// noinspection JSDuplicatedDeclaration,JSUnfilteredForInLoop
						var file = tmp_data[file_index];

						if (file.type === 'file') {
							// noinspection JSUnresolvedVariable
							obj.load_url({url: file.download_url}, function (data) {
								loaded_count++;

								// noinspection JSReferencingMutableVariableFromClosure
								file.content = data.response;
								// noinspection JSReferencingMutableVariableFromClosure
								ret_data.push(file);

								if (loaded_count === files_count) {
									if (typeof cb === 'function') {
										cb(ret_data);
									}
								}
							});
						} else {
							ret_data.push(file);
						}
					}
				},
				load: function (url, cb) {
					obj.use_get_files_contents = false;

					if (!!url) {
						if (url.indexOf('get-content!') !== -1) {
							obj.use_get_files_contents = true;
							url = url.split('get-content!').join('');
						}

						if (url.indexOf('https://api.github.com/repos/') === -1) {
							url = 'https://api.github.com/repos/' + url;
						}
					}

					var data = obj.get_cache(url) || {url: url};

					obj.load_url(data, function (ret) {
						if (obj.use_get_files_contents) {
							if (Array.isArray(ret.response)) {
								obj.get_files_contents(ret.response, cb);
							} else if (typeof cb === 'function') {
								cb(ret.response);
							}
						} else {
							if (typeof cb === 'function') {
								cb(ret.response);
							}
						}
					});
				},
				load_url: function (data, cb) {
					var xml_http = new XMLHttpRequest();

					xml_http.onreadystatechange = function() {
						if (xml_http.readyState === 4) {
							var response = data.response || false;

							if (xml_http.status === 200) {
								try {
									response = JSON.parse(xml_http.response);
								} catch (e) {
									response = xml_http.response;
								}
							}

							var ret = data.url.indexOf('api.github.com') !== -1 ? {
								url: data.url,
								token: xml_http.getResponseHeader('ETag'),
								limit_remaining: xml_http.getResponseHeader('X-RateLimit-Remaining'),
								limit_reset: xml_http.getResponseHeader('X-RateLimit-Reset'),
								last_modified: xml_http.getResponseHeader('Last-Modified'),
								status: xml_http.status,
								response: response
							} : {
								url: data.url,
								status: xml_http.status,
								response: response
							};

							if (xml_http.status === 200) {
								obj.set_cache(data.url, ret);
							}

							if (typeof cb === 'function') {
								cb(ret);
							}
						}
					};

					xml_http.open('GET', data.url);

					if (data) {
						if (data.token) {
							xml_http.setRequestHeader('If-None-Match', data.token);
						}

						if (data.last_modified) {
							xml_http.setRequestHeader('If-Modified-Since', data.last_modified);
						}
					}

					xml_http.send();
				}
			};

			// noinspection JSUnresolvedVariable
			if (config.isBuild && config.inlineJSON === false) {
				onload(null);
			} else {
				obj.load(name, onload);
			}
		},
		normalize: function (name, normalize) {
			return normalize(name);
		}
	});

	// noinspection JSFileReferences
	requirejs.config({
		waitSeconds: 300,
		paths: {
			browserfs: 'libraries/browserfs-1.4.3.min',
			clippy: 'libraries/clippy-0.0.3',
			desktop: 'desktop',
			dropbox: 'libraries/dropbox-4.0.30.min',
			emuos: 'emuos',
			es3base64: 'polyfills/es3-base64-1.0.1.min',
			es6promise: 'polyfills/es6-promise-auto-4.2.8.min',
			es6fetch: 'polyfills/es6-fetch-3.0.0',
			esheep: 'libraries/esheep-0.7.2.min',
			filesystem: 'filesystem',
			jquery: 'libraries/jquery-2.2.4.min',
			jquerymousewheel: 'libraries/jquery-mousewheel-3.1.13',
			jqueryui: 'libraries/jquery-ui-1.11.4.min',
			jqueryuicontextmenu: 'libraries/jquery-ui-contextmenu-1.18.1.min',
			jqueryuitree: 'libraries/jquery-ui-tree-3.0.0.min',
			jquerycustomscrollbar: 'libraries/jquery-customscrollbar-3.1.5.min',
			jqyeryajaxretry: 'libraries/jquery-ajax-retry-0.2.8.min',
			json: 'libraries/requirejs-json-1.0.3',
			jsrsasign: 'libraries/jsrsasign-all-8.0.12.min',
			lang: 'lang-en',
			noext: 'libraries/requirejs-noext-1.0.3',
			octokat: 'libraries/octokat-0.10.0',
			taskbar: 'taskbar',
			text: 'libraries/requirejs-text-2.0.15',
			window: 'window'
		},
		shim: {
			clippy: {
				exports: 'clippy',
				deps: ['jquery']
			},
			desktop: {
				deps: ['window', 'lang', 'jqueryuicontextmenu']
			},
			emuos: {
				deps: ['desktop', 'filesystem']
			},
			esheep: {
				exports: 'eSheep'
			},
			filesystem: {
				deps: ['jqyeryajaxretry', 'jsrsasign', 'octokat']
			},
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
				deps: ['jquerymousewheel']
			},
			jsrsasign: {
				exports: 'KJUR'
			},
			lang: {
				deps: ['taskbar']
			},
			octokat: {
				deps: ['es6promise', 'es6fetch', 'es3base64']
			},
			taskbar: {
				deps: ['jqueryui']
			},
			window: {
				deps: ['taskbar']
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	requirejs([
		'jquery',
		'filesystem',
		'emuos'
	], function($, FileSystem, EmuOS) {
		$(function() {
			/*var filesystem = new FileSystem({
				github: {
					organization: 'Emupedia',
					repo: 'emupedia.github.io',
					branch: 'master',
					app_id: 18939,
					app_install_id: 1580976,
					private_key: window['GITHUB_PRIVATE_KEY']
				},
				dropbox: {
					token: window['DROPBOX_TOKEN']
				}
			});*/

			// var webamp = new Webamp({template: webamp_template});

			// noinspection JSUnusedLocalSymbols
			var desktop = new EmuOS({
				filesystem: null,
				theme: 'theme-win9x'
			});

			// noinspection JSUnresolvedFunction
			/*desktop.window({
				title: 'Tree Component',
				icon: 'apps/wing/favicon.ico',
				content: tree_template
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
			});*/
		});
	});
} (this));