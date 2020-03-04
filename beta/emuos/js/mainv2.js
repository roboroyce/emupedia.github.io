(function() {
	function start() {
		if (!$sys.feature.SYSTEM_FEATURE_ES6) {
			$sys.api.import('js/components/components.js', 'text/babel');

			// noinspection JSUnresolvedVariable
			if (typeof Babel !== 'undefined') {
				// noinspection JSUnresolvedVariable,ES6ModulesDependencies
				if (typeof Babel.transformScriptTags === 'function') {
					// noinspection JSUnresolvedVariable,ES6ModulesDependencies
					Babel.transformScriptTags();
				}
			}

			$sys.api.get('body').innerHTML = '<emuos-desktop></emuos-desktop>';
		} else {
			$sys.api.import('js/components/components.js', function() {
				$sys.api.get('body').innerHTML = '<emuos-desktop></emuos-desktop>';
			});
		}
	}

	if (typeof $lib !== 'undefined' && typeof $sys !== 'undefined') {
		if (!$sys.feature.SYSTEM_FEATURE_ES6 && !$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V1) {
			$sys.api.import($lib['babel-polyfill'], function() {
				$sys.api.import($lib['babel-standalone'], function() {
					$sys.api.import($lib['web-components'], function() {
						$sys.api.import($lib['hybrids'], function() {
							$sys.api.hybrids = hybrids;
							start();
						});
					});
				});
			});
		} else if (!$sys.feature.SYSTEM_FEATURE_WEBCOMPONENTS_V1) {
			$sys.api.import($lib['web-components'], function() {
				$sys.api.import($lib['hybrids'], function() {
					$sys.api.hybrids = hybrids;
					start();
				});
			});
		} else {
			$sys.api.import($lib['hybrids'], function() {
				$sys.api.hybrids = hybrids;
				start();
			});
		}
	}
})();