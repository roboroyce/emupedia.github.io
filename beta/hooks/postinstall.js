var fs = require('fs-extra');
var packages = require('../package.json');

function install(dependency, version) {
	switch (dependency) {
		case 'systemjs':
			fs.copy('./node_modules/' + dependency +  '/dist/system.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'mithril':
			fs.copy('./node_modules/' + dependency + '/mithril.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
	}
}

var dependencies = Object.keys(packages.dependencies);

for (var i = 0; i < dependencies.length; i++) {
	install(dependencies[i], require('../node_modules/' + dependencies[i] + '/package.json').version);
}