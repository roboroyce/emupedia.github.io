var Module = {
	preRun: [],
	postRun: [],
	print: (function() {
		return function(text) {
			if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
			console.log(text);
		};
	})(),
	printErr: function(text) {
		if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
		console.error(text);
	},
	canvas: (function() {
		var canvas = document.getElementById('canvas');

		// As a default initial behavior, pop up an alert when webgl context is lost. To make your
		// application robust, you may want to override this behavior before shipping!
		// See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
		canvas.addEventListener("webglcontextlost", function(e) {
			alert('WebGL context lost. You will need to reload the page.');
			e.preventDefault();
		}, false);

		return canvas;
	})(),
	setStatus: function(text) {
		if (!Module.setStatus.last) Module.setStatus.last = {time: Date.now(), text: ''};
		if (text === Module.setStatus.last.text) return;
		var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
		var now = Date.now();
		if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
		Module.setStatus.last.time = now;
		Module.setStatus.last.text = text;
		if (m) {
			text = m[1];
		}
		console.log(text);
		document.getElementById('status').innerHTML = text;
	},
	totalDependencies: 0,
	monitorRunDependencies: function(left) {
		this.totalDependencies = Math.max(this.totalDependencies, left);
		Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
	}
};

Module.setStatus('Idle...');

if (!Module.expectedDataFileDownloads) {
	Module.expectedDataFileDownloads = 0;
	Module.finishedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

// noinspection JSUnusedLocalSymbols
var loadPackage = function(file, size, file_data, compressed_data, executable) {
	var metadata = {files: file_data, remote_package_size: size, package_uuid: '00000000-0000-0000-0000-000000000000'};

	var PACKAGE_PATH;
	if (typeof window === 'object') {
		// noinspection JSUnusedAssignment
		PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
	} else if (typeof location !== 'undefined') {
		// worker
		// noinspection JSUnusedAssignment
		PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
	} else {
		throw 'using preloaded data can only be done on a web page or in a web worker';
	}

	var PACKAGE_NAME = file;

	var REMOTE_PACKAGE_BASE = 'js/games/' + file;

	if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
		Module['locateFile'] = Module['locateFilePackage'];
		err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
	}

	var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;

	var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
	// noinspection JSUnusedLocalSymbols
	var PACKAGE_UUID = metadata.package_uuid;

	// noinspection JSUnusedLocalSymbols
	function fetchRemotePackage(packageName, packageSize, callback, errback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', packageName, true);
		xhr.responseType = 'arraybuffer';
		xhr.onprogress = function(event) {
			var url = packageName;
			var size = packageSize;
			if (event.total) size = event.total;
			if (event.loaded) {
				if (!xhr.addedTotal) {
					xhr.addedTotal = true;
					if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
					Module.dataFileDownloads[url] = {
						loaded: event.loaded,
						total: size
					};
				} else {
					Module.dataFileDownloads[url].loaded = event.loaded;
				}
				var total = 0;
				var loaded = 0;
				var num = 0;
				for (var download in Module.dataFileDownloads) {
					// noinspection JSUnfilteredForInLoop
					var data = Module.dataFileDownloads[download];
					total += data.total;
					loaded += data.loaded;
					num++;
				}
				total = Math.ceil(total * Module.expectedDataFileDownloads/num);
				if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
			} else if (!Module.dataFileDownloads) {
				if (Module['setStatus']) Module['setStatus']('Downloading data...');
			}
		};
		xhr.onerror = function() {
			throw new Error("NetworkError for: " + packageName);
		};
		xhr.onload = function() {
			if (xhr.status === 200 || xhr.status === 304 || xhr.status === 206 || (xhr.status === 0 && xhr.response)) { // file URLs can return 0
				var packageData = xhr.response;
				callback(packageData);
			} else {
				throw new Error(xhr.statusText + " : " + xhr.responseURL);
			}
		};
		xhr.send(null);
	}

	function handleError(error) {
		console.error('package error:', error);
	}

	var fetchedCallback = null;
	var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

	if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
		if (fetchedCallback) {
			fetchedCallback(data);
			fetchedCallback = null;
		} else {
			fetched = data;
		}
	}, handleError);

	function runWithFS() {

		function assert(check, msg) {
			if (!check) throw msg + new Error().stack;
		}

		function DataRequest(start, end, audio) {
			this.start = start;
			this.end = end;
			this.audio = audio;
		}
		DataRequest.prototype = {
			requests: {},
			open: function(mode, name) {
				this.name = name;
				this.requests[name] = this;
				Module['addRunDependency']('fp ' + this.name);
			},
			send: function() {},
			onload: function() {
				var byteArray = this.byteArray.subarray(this.start, this.end);
				this.finish(byteArray);
			},
			finish: function(byteArray) {
				var that = this;

				Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
				Module['removeRunDependency']('fp ' + that.name);

				this.requests[this.name] = null;
			}
		};

		function processPackageData(arrayBuffer) {
			Module.finishedDataFileDownloads++;
			assert(arrayBuffer, 'Loading data file failed.');
			assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
			var compressedData = compressed_data;
			compressedData.data = new Uint8Array(arrayBuffer);
			assert(typeof LZ4 === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
			LZ4.loadPackage({ 'metadata': metadata, 'compressedData': compressedData });
			Module['removeRunDependency']('datafile_/' + file);

		}
		Module['addRunDependency']('datafile_/' + file);

		if (!Module.preloadResults) Module.preloadResults = {};

		Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
		if (fetched) {
			processPackageData(fetched);
			fetched = null;
		} else {
			fetchedCallback = processPackageData;
		}
	}

	if (Module['calledRun']) {
		runWithFS();
	} else {
		if (!Module['preRun']) Module['preRun'] = [];
		Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
	}

	Module['arguments'] = [ executable ];
};

// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols
(function(global) {
	'use strict';

	// noinspection JSFileReferences
	require.config({
		waitSeconds : 300,
		shim: {
			purl: {
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
			purl: 'libraries/purl-2.3.1'
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	require([
		'jquery',
		'json!games/games.json',
		'purl',
		'system'
	], function($, games, purl) {
		$(function() {
			console.log(games);

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
					html += '<th>ID</th>';
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
					html += '<td>' + games['games'][game]['id'] + '</td>';
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
							loadPackage(games['games'][game]['id'] + '.data', games['games'][game]['size'], games['games'][game]['files'], games['games'][game]['data'], games['games'][game]['executable']);
							break;
						}
					}

					// noinspection JSCheckFunctionSignatures
					require([SYSTEM_FEATURE_WEBASSEMBLY ? 'dosbox-wasm' : (SYSTEM_FEATURE_ASMJS ? 'dosbox-asm' : alert('DOSBox cannot work because WebAssembly and/or ASM.JS is not supported in your browser!'))]);
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
								loadPackage(games['games'][game]['id'] + '.data', games['games'][game]['size'], games['games'][game]['files'], games['games'][game]['data'], games['games'][game]['executable']);
								break;
							}
						}

						// noinspection JSCheckFunctionSignatures
						require([SYSTEM_FEATURE_WEBASSEMBLY ? 'dosbox-wasm' : (SYSTEM_FEATURE_ASMJS ? 'dosbox-asm' : alert('DOSBox cannot work because WebAssembly and/or ASM.JS is not supported in your browser!'))]);
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