(function() {
	if (!$sys.feature.SYSTEM_FEATURE_ES6) {
		$sys.import('js/components/components.js', 'text/babel');

		// noinspection JSUnresolvedVariable
		if (typeof Babel !== 'undefined') {
			// noinspection JSUnresolvedVariable
			if (typeof Babel.transformScriptTags === 'function') {
				// noinspection JSUnresolvedVariable
				Babel.transformScriptTags();
			}
		}

		$sys.get('body').innerHTML = '<emuos-desktop></emuos-desktop>';
	} else {
		$sys.import('js/components/components.js', function() {
			$sys.get('body').innerHTML = '<emuos-desktop></emuos-desktop>';
		});
	}
})();