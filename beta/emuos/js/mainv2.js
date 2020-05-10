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
		urlArgs: 'rand=' + (new Date()).getTime(),
		waitSeconds: 300,
		paths: $sys.lib,
		shim: {
			ga: {
				exports: '__ga__'
			},
			'jquery-1.x': {
				exports: 'jQuery'
			},
			'jquery-2.x': {
				exports: 'jQuery'
			},
			'jquery-3.x': {
				exports: 'jQuery'
			},
			'jquery-ui': {
				deps: ['jquery']
			}
		},
		map: {
			'*': {
				'jQuery': 'jquery-3.x',
				'jquery': 'jquery-3.x',
				'jqueryui': 'jquery-ui-1.12.x',
				'jquery-ui': 'jquery-ui-1.12.x',
				'lang': 'lang-en',
				'json': 'requirejs-json',
				'text': 'requirejs-text'
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols
	requirejs([
		'jquery',
		'jquery-ui',
		'optional!ga'
	], function($, ui, ga) {
		$(function() {
			if (typeof ga === 'function') {
				ga('send', {
					hitType: 'pageview',
					page: global.location.pathname,
					title: global.location.href
				});
			}

			var $html = $('html');

			$html.removeClass('boot');

			var $body = $('body');

			$body.html(
				'<div class="emuos-desktop">DESKTOP</div>' +

				'<div class="emuos-window blur">' +
					'<div class="emuos-window-container"></div>' +
				'</div>' +

				'<div class="emuos-window blur">' +
					'<div class="emuos-window-container"></div>' +
				'</div>' +

				'<div class="emuos-taskbar-bg"></div>' +

				'<div class="emuos-taskbar">' +
					'<div class="emuos-taskbar-container">' +
						'<div class="emuos-start"><button class="emuos-start-button"></button></div>' +
						'<div class="emuos-apps">APPS</div>' +
						'<div class="emuos-tray">TRAY</div>' +
					'</div>' +
				'</div>'
			);

			// noinspection JSValidateTypes
			$body.find('.emuos-window').draggable({
				iframeFix: true,
				scroll: false,
				// handle: '.chat-window-title',
				// cancel: 'a',
				// containment: 'document, body'
				stack: '.emuos-window'
			}).resizable({
				// containment: 'document, body',
				// maxWidth: 640,
				// maxHeight: 480,
				minWidth: 200,
				minHeight: 120,
				handles: 'n,e,s,w,se,sw,ne,nw'
			});
		});
	});
}(this));