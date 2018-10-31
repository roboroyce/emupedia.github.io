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
			json: 'libraries/requirejs-json-1.0.2',
			text: 'libraries/requirejs-text-2.0.15',
			optional: 'libraries/requirejs-optional-1.0.0',
			purl: 'libraries/purl-2.3.1'
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	require([
		'jquery',
		'purl'
	], function($, purl) {
		$(function() {
			var first = typeof $.url().param('game') === 'undefined';

			if (!first) {
				$('.game option').prop('selected', false).removeAttr('selected');

				var index_selected = parseInt($.url().param('game'), 10);
				var game_selected = $('.game option:eq('+ index_selected +')').prop('selected', true).attr('selected', true).data('game');

				// noinspection JSCheckFunctionSignatures
				require(['games/' + game_selected, 'dosbox']);
			}

			$(document).on('click', '.load', function() {
				var $game = $('.game');
				var index_selected = parseInt($game.val(), 10);
				var game_selected = $('.game option:eq('+ index_selected +')').data('game');

				if (first) {
					first = false;
					// noinspection JSCheckFunctionSignatures
					require(['games/' + game_selected, 'dosbox']);
				} else {
					location.href = location.protocol + '//' + location.host + location.pathname + '?game=' + index_selected;
				}
			})
		});
	});
} (this));

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