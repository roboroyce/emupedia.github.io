/**
 * @license Emupedia 1.0.0 Copyright Emupedia and other contributors.
 * Released under license https://emupedia.net/LICENSE
 */

;(function() {
	require.config({
		isBuild: true,
		babel: {
			presets: ['mithril-mjsx'],
			sourceMaps: false
		},
		es6: {
			fileExtension: '.es6'
		},
		paths: {
			polyfill: 'library/babel-polyfill-6.7.4.min',
			text: 'library/requirejs-text-2.0.12',
			noext: 'library/requirejs-noext-1.0.2',
			es6: 'library/requirejs-es6-0.1.6',
			mjsx: 'library/requirejs-mjsx-1.0.0',
			babel: 'library/babel-standalone-6.7.6.min',
			mithril: 'library/mithril-0.2.3.min',
			jquery: 'library/jquery-3.0.0-beta1.min'
		}
	});

	require([
		'polyfill'
	], function(polyfill) {
		// Start Application
		require(['es6!app']);
	});

})();