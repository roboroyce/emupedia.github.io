// noinspection ES6ConvertVarToLetConst
var $import_interval = null;

$import = function (url, cb, type) {
	url = typeof url !== 'undefined' ? url : '';
	cb = typeof cb === 'function' ? cb : $noop;
	type = typeof type !== 'undefined' ? type : 'text/javascript';

	// noinspection DuplicatedCode
	if (url) {
		// noinspection ES6ConvertVarToLetConst
		var script = document.createElement('script');
		script.type = type;
		script.src = url;
		script.async = false;

		if (script.addEventListener) {
			script.addEventListener('load', cb, false);
		} else if (script.readyState) {
			script.onreadystatechange = function() {
				if (script.readyState === 'loaded') {
					cb();
				}
			};
		}

		document.body.appendChild(script);
	}
};

if (!SYSTEM_FEATURE_ES6 && !SYSTEM_FEATURE_WEBCOMPONENTS_V1) {
	$import('js/polyfills/es7-babel-polyfill-7.6.0.min.js', function() {
		$import('js/libraries/babel-standalone-7.6.0.min.js', function() {
			$import('js/polyfills/es6-web-components-2.2.10.min.js', function() {
				$import('js/libraries/hybrids-4.0.2.min.js', function() {
					$import('js/components/main.js', $noop(), 'text/babel');
					window.addEventListener("DOMContentLoaded", function() {
						if ($import_interval != null) {
							clearInterval($import_interval);
							$import_interval = null;
						}
					}, false);

					if ($import_interval == null) {
						$import_interval = setInterval(function() {
							window.dispatchEvent(new Event('DOMContentLoaded'));
						}, 10);
					}
				});
			});
		});
	});
} else if (!SYSTEM_FEATURE_WEBCOMPONENTS_V1) {
	$import('js/polyfills/es6-web-components-2.2.10.min.js', function() {
		$import('js/libraries/hybrids-4.0.2.min.js', function() {
			$import('js/components/main.js');
		});
	});
} else {
	$import('js/libraries/hybrids-4.0.2.min.js', function() {
		$import('js/components/main.js');
	});
}