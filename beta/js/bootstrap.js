/**
 * @license Emupedia 1.0.0 Copyright Emupedia and other contributors.
 * Released under license https://emupedia.net/LICENSE
 */

;(function() {
	require.config({
		config: {
			es6: {
				sourceMaps: true,
				resolveModuleSource: function(source) {
					return 'es6!' + source;
				}
			}
		},
		paths: {
			jquery: 'library/jquery-3.0.0-beta1.min',
			mithril: 'library/mithril-0.2.3.min',
			es6: 'library/requirejs-babel-0.0.8',
			'babel': 'library/babel-browser-5.8.35.min'
		}
	});

	require([
		'mithril'
	], function() {
		require(['es6!app']);
	});
})();