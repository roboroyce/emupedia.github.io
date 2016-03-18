var fs = require('fs-extra');
var packages = require('../package.json');

Object.keys(packages.dependencies).forEach(function(dependency) {
	switch (dependency) {
		case 'systemjs':
			var version = require('../node_modules/' + dependency + '/package.json').version;

			fs.copy('./node_modules/' + dependency +  '/dist/system.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'mithril':
			var version = require('../node_modules/' + dependency + '/package.json').version;

			fs.copy('./node_modules/' + dependency + '/mithril.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
	}
});