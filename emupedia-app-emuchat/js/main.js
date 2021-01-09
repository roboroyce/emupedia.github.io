// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
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
			// noinspection DuplicatedCode
			window['NETWORK_CONNECTION'] = network.start({
				servers: ['wss://ws.emupedia.net/ws/', 'wss://ws.emupedia.org/ws/', 'wss://ws.emuos.net/ws/', 'wss://ws.emuos.org/ws/'],
				server: ~window.location.hostname.indexOf('emupedia.net') ? 0 : (~window.location.hostname.indexOf('emupedia.org') ? 1 : (~window.location.hostname.indexOf('emuos.net') ? 2 : (~window.location.hostname.indexOf('emuos.org') ? 3 : 0))),
				mode: 0
			});

			setTimeout(function() {
				// noinspection HtmlDeprecatedAttribute
				$('body').append('<iframe id="emuchat" width="100%" height="100%" src="https://emuchat.emupedia.net/" frameborder="0" allowFullscreen="allowFullscreen" allowTransparency="true" sandbox="allow-forms allow-downloads allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>');

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