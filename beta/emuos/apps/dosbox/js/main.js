// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols
(function(global) {
	'use strict';

	// noinspection JSFileReferences
	require.config({
		waitSeconds : 300,
		shim: {
			jquery: {
				deps: ['system']
			},
			purl: {
				deps: ['jquery']
			},
			loader: {
				deps: ['browserfs']
			},
			browserfs: {
				deps: ['es6promise']
			},
			es6promise: {
				deps: ['jquery']
			}
		},
		map: {
			'*': {
				'jQuery': 'jquery'
			}
		},
		paths: {
			jquery: 'libraries/jquery-3.3.1.min',
			json: 'libraries/requirejs-json-0.3.2',
			text: 'libraries/requirejs-text-2.0.15',
			optional: 'libraries/requirejs-optional-1.0.0',
			purl: 'libraries/purl-2.3.1',
			es6promise: 'polyfills/es6-promise-4.2.5.min',
			es6fetch: 'polyfills/es6-fetch-3.0.0',
			browserfs: 'libraries/browserfs-1.4.3.min',
			dropbox: 'libraries/dropbox-sdk-4.0.12'
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	require([
		'jquery',
		'purl',
		'json!games.json',
		'browserfs',
		'dropbox',
		'es6fetch',
		'loader'
	], function($, purl, games, browserfs, dropbox, fetch, loader) {
		$(function() {
			console.log(games);

			// noinspection JSUnresolvedFunction
			var dbx = new dropbox.Dropbox({accessToken: 'Rw1XBhHt3aAAAAAAAAADLlH_3RQLTgbyiwKwBQlcRIHkzxzKbhFyX4oTPGvSqgqt', fetch: fetch.fetch});

			global.BrowserFS = browserfs;

			var $game_dropdown = $('.game-dropdown');
			var $game_list = $('.game-list');

			function format_name(name) {
				return typeof name !== 'undefined' ? name : '?';
			}

			function format_bytes(bytes, decimals) {
				if (bytes === 0) {
					return '0 Bytes';
				}

				var k = 1024,
					dm = decimals <= 0 ? 0 : decimals || 2,
					sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(k));

				return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
			}

			function render_game_dropdown(games) {
				var html = '<select>';

				var i = 0;

				for (var game in games['games']) {
					// noinspection JSUnfilteredForInLoop
					html += '<option value="' + i + '" data-game="' + games['games'][game]['id'] + '">' + games['games'][game]['name'] + ' (' + games['games'][game]['year'] + ')' + ' (' + games['games'][game]['genre'] + ')'  + ' (' + format_bytes(parseInt(games['games'][game]['size'], 10)) + ')</option>';
					i++;
				}

				html += '</select>';

				return html;
			}

			function render_game_list(games) {
				var html = '<table>';

				html += '<thead>';
				html += '<tr>';
				// html += '<th>ID</th>';
				html += '<th>Name</th>';
				html += '<th>Year</th>';
				html += '<th>Genre</th>';
				html += '<th>Size</th>';
				html += '<th>Developer</th>';
				html += '<th>Publisher</th>';
				html += '<th>Copyright</th>';
				html += '<th>Licence</th>';
				html += '</tr>';

				html += '</thead>';
				html += '<tbody>';

				for (var game in games['games']) {
					html += '<tr>';
					// noinspection JSUnfilteredForInLoop
					// html += '<td>' + games['games'][game]['id'] + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + games['games'][game]['name'] + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + games['games'][game]['year'] + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + games['games'][game]['genre'] + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + format_bytes(parseInt(games['games'][game]['size'], 10)) + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + games['games'][game]['developer'] + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + games['games'][game]['publisher'] + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + format_name(games['games'][game]['copyright']) + '</td>';
					// noinspection JSUnfilteredForInLoop
					html += '<td>' + games['games'][game]['licence'] + '</td>';
					html += '</tr>';
				}

				html += '</tbody>';
				html += '</table>';

				return html;
			}

			function start(file, executable, args) {
				// noinspection JSUnresolvedFunction
				dbx.filesGetTemporaryLink({path: '/' + file}).then(function(response) {
					// console.log(response);
					// noinspection JSUnresolvedFunction,JSUnresolvedVariable
					var emulator = new global.Emulator(document.getElementById('canvas'), null,
						// noinspection JSUnresolvedFunction,JSUnresolvedVariable
						new global.DosBoxLoader(global.DosBoxLoader.emulatorJS(SYSTEM_FEATURE_WEBASSEMBLY ? 'js/dosbox-sync-wasm.js' : 'js/dosbox-sync-asm.js'),
							// noinspection JSUnresolvedFunction,JSUnresolvedVariable
							global.DosBoxLoader.locateAdditionalEmulatorJS(function(filename) {
								if (filename === 'dosbox.html.mem') {
									return 'js/dosbox-sync.mem';
								}

								if (filename === 'dosbox.wasm') {
									return 'js/dosbox-sync.wasm';
								}
								return filename;
							}),
							// noinspection JSUnresolvedFunction,JSUnresolvedVariable
							global.DosBoxLoader.nativeResolution(640, 400),
							// noinspectionJSUnresolvedFunction,JSUnresolvedVariable
							global.DosBoxLoader.mountZip('c', global.DosBoxLoader.fetchFile('Game File', response.link)),
							// noinspection JSUnresolvedFunction,JSUnresolvedVariable
							global.DosBoxLoader.extraArgs(args),
							// noinspection JSUnresolvedFunction,JSUnresolvedVariable
							global.DosBoxLoader.startExe(executable)));
					emulator.start({waitAfterDownloading: false});
				}).catch(function(error) {
					console.log(error);
				});
			}

			$game_list.html('').html(render_game_list(games));
			$game_dropdown.html('').html(render_game_dropdown(games));

			if (SYSTEM_FEATURE_CANVAS && SYSTEM_FEATURE_TYPED_ARRAYS) {
				var first = typeof $.url().param('game') === 'undefined';

				if (!first) {
					$('.game option').prop('selected', false).removeAttr('selected');

					var index_selected = parseInt($.url().param('game'), 10);
					var game_selected = $game_dropdown.find('option:eq('+ index_selected +')').prop('selected', true).attr('selected', true).data('game');

					for (var game in games['games']) {
						// noinspection JSUnfilteredForInLoop
						if (games['games'][game]['id'] === game_selected) {
							// noinspection JSUnfilteredForInLoop
							start(games['games'][game]['file'], games['games'][game]['executable'], games['games'][game]['args']);
							break;
						}
					}
				}

				$(document).on('click', '.load', function() {
					var index_selected = parseInt($game_dropdown.val(), 10);
					var game_selected = $game_dropdown.find('option:eq('+ index_selected +')').data('game');

					if (first) {
						first = false;

						for (var game in games['games']) {
							// noinspection JSUnfilteredForInLoop
							if (games['games'][game]['id'] === game_selected) {
								// noinspection JSUnfilteredForInLoop
								start(games['games'][game]['file'], games['games'][game]['executable'], games['games'][game]['args']);
								break;
							}
						}
					} else {
						location.href = location.protocol + '//' + location.host + location.pathname + '?game=' + index_selected;
					}
				});

				$(document).on('click', '.list', function() {
					$game_list.toggle();
				});
			} else {
				alert('DOSBox cannot work because Canvas and/or Typed Arrays are not supported in your browser!')
			}
		});
	});
} (this));