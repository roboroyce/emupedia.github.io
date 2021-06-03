// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	// noinspection JSFileReferences
	requirejs.config({
		paths: {
			bson: '../../beta/emuos/assets/js/libraries/bson-4.4.0',
			'jquery': '../../beta/emuos/assets/js/libraries/jquery-3.6.0.min',
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
			},
			socket: {
				deps: ['bson']
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
			var servers = ['wss://ws.emupedia.net/ws/', 'wss://ws.emupedia.net/ws/', 'wss://ws.emupedia.org/ws/', 'wss://ws.emupedia.org/ws/', 'wss://ws.emuos.net/ws/', 'wss://ws.emuos.net/ws/', 'wss://ws.emuos.org/ws/', 'wss://ws.emuos.org/ws/', 'ws://cojmar.ddns.net/ws/'];
			var domains = ['emupedia.net', 'emuchat.emupedia.net', 'emupedia.org', 'emuchat.emupedia.org', 'emuos.net', 'emuchat.emuos.net', 'emuos.org', 'emuchat.emuos.org', 'cojmar.ddns.net'];
			var frontend = ~domains.indexOf(window.location.hostname) ? 'https://emuchat.' + domains[domains.indexOf(window.location.hostname)] + '/' : 'https://emuchat.emupedia.net/';

			// noinspection DuplicatedCode
			window['NETWORK_CONNECTION'] = network.start({
				servers: servers,
				server: ~domains.indexOf(window.location.hostname) ? domains.indexOf(window.location.hostname) : 0,
				mode: 0
			});

			setTimeout(function() {
				// noinspection HtmlDeprecatedAttribute
				$('body').append('<iframe id="emuchat" width="100%" height="100%" src="' + frontend + '" frameborder="0" allowFullscreen="allowFullscreen" allowTransparency="true" allow="autoplay; fullscreen; accelerometer; gyroscope; geolocation; microphone; camera; midi; encrypted-media; clipboard-read; clipboard-write" sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>');

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
			}, 1000);
		});
	});
}(this));