// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	global.GoogleAnalyticsObject = '__ga__';
	global.__ga__ = function() {
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];

			// noinspection JSUnresolvedVariable
			if (arg.constructor === Object && arg.hitCallback) {
				arg.hitCallback();
			}
		}
	};
	global.__ga__.q = [['create', 'UA-47896346-6', 'auto']];
	global.__ga__.l = Date.now();

	// noinspection JSUnusedLocalSymbols,DuplicatedCode
	define('optional', [], {
		load: function(name, req, onload, config) {
			var onLoadSuccess = function(moduleInstance) {
				onload(moduleInstance);
			};

			var onLoadFailure = function(err) {
				var failedId = err.requireModules && err.requireModules[0];
				global.console.warn('Could not load optional module: ' + failedId);

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

	// noinspection JSFileReferences
	requirejs.config({
		paths: {
			'jquery': '../../beta/emuos/assets/js/libraries/jquery-3.5.1.min',
			'jquery-ajax-retry': '../../beta/emuos/assets/js/libraries/jquery-ajax-retry-0.2.8.min',
			network: '../../beta/emuos/assets/js/network',
			socket: '../../beta/emuos/assets/js/socket',
			simplestorage: '../../beta/emuos/assets/js/libraries/simplestorage-0.2.1.min'
		},
		shim: {
			'jquery': {
				exports: 'jQuery'
			},
			network: {
				deps: ['socket', 'jquery-ajax-retry']
			}
		},
		map: {
			'*': {
				lang: 'lang-en',
				json: 'requirejs-json',
				text: 'requirejs-text'
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	requirejs([
		'jquery',
		'network'
	], function($, network) {
		$(function() {
			window['NETWORK_CONNECTION'] = network.start({
				servers: ['wss://ws.emupedia.net/ws/', 'wss://ws.emupedia.org/ws/', 'wss://ws.emuos.net/ws/', 'wss://ws.emuos.org/ws/'],
				server: ~window.location.hostname.indexOf('emupedia.net') ? 0 : (~window.location.hostname.indexOf('emupedia.org') ? 1 : (~window.location.hostname.indexOf('emuos.net') ? 2 : (~window.location.hostname.indexOf('emuos.org') ? 3 : 0))),
				mode: 0
			});

			// noinspection DuplicatedCode
			$(document).find('iframe').first().off('load').on('load', function() {
				var net = window['NETWORK_CONNECTION'];

				if (typeof net !== 'undefined') {
					// noinspection JSUnresolvedVariable
					if (typeof net.register_iframe === 'function') {
						// noinspection JSUnresolvedVariable,JSUnresolvedFunction
						net.register_iframe('emuchat');
					}
				}
			});
		});
	});
}(this));