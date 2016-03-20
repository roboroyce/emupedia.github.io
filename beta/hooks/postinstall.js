var fs = require('fs-extra');
var packages = require('../package.json');

function install(dependency, version) {
	switch (dependency) {
		case 'json3':
			fs.copy('./node_modules/' + dependency +  '/lib/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'es5-shim':
			fs.copy('./node_modules/' + dependency +  '/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					fs.copy('./node_modules/' + dependency +  '/es5-sham.min.js', './js/library/es5-sham-' + version + '.min.js', function (err) {
						if (err) {
							console.error(err);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'es6-shim':
			fs.copy('./node_modules/' + dependency +  '/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					fs.copy('./node_modules/' + dependency +  '/es6-sham.min.js', './js/library/es6-sham-' + version + '.min.js', function (err) {
						if (err) {
							console.error(err);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'alameda':
			fs.copy('./node_modules/' + dependency +  '/' + dependency + '.js', './js/library/' + dependency + '-' + version + '.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs-babel':
			fs.copy('./node_modules/' + dependency +  '/es6.js', './js/library/' + dependency + '-' + version + '.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'babel-core':
			fs.copy('./node_modules/' + dependency +  '/browser.min.js', './js/library/babel-browser-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					fs.copy('./node_modules/' + dependency +  '/browser-polyfill.min.js', './js/library/babel-browser-polyfill-' + version + '.min.js', function (err) {
						if (err) {
							console.error(err);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jquery':
			fs.copy('./node_modules/' + dependency + '/dist/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					fs.copy('./node_modules/' + dependency + '/dist/' + dependency + '.min.map', './js/library/' + dependency + '-' + version + '.min.map', function (err) {
						if (err) {
							console.error(err);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'mithril':
			fs.copy('./node_modules/' + dependency + '/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					fs.copy('./node_modules/' + dependency + '/' + dependency + '.min.js.map', './js/library/' + dependency + '.min.js.map', function (err) {
						if (err) {
							console.error(err);
						} else {
							fs.copy('./node_modules/' + dependency + '/' + dependency + '.js', './js/library/' + dependency + '.js', function (err) {
								if (err) {
									console.error(err);
								} else {
									console.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
	}
}

var dependencies = Object.keys(packages.dependencies);

for (var i = 0; i < dependencies.length; i++) {
	install(dependencies[i], require('../node_modules/' + dependencies[i] + '/package.json').version);
}