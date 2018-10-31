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

			function select_game(index) {
				switch (index) {
					case 0:
						// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
						require(['games/pre1', 'dosbox']);
						break;
					case 1:
						// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
						require(['games/pre2', 'dosbox']);
						break;
					default:
						break;
				}
			}

			if (!first) {
				var index_selected = parseInt($.url().param('game'), 10);
				$('.game option').prop('selected', false).removeAttr('selected');
				$('.game option:eq('+ index_selected +')').prop('selected', true).attr('selected', true);
				select_game(index_selected);
			}

			$(document).on('click', '.load', function() {
				var index_selected = parseInt($('.game').val(), 10);

				if (first) {
					first = false;
					select_game(index_selected);
				} else {
					location.href = location.protocol + '//' + location.host + location.pathname + '?game=' + index_selected;
				}
			})
		});
	});
} (this));