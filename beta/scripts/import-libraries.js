'use strict';

var fs						= require('fs-extra');
var replace					= require('replace-in-file');
var packages				= require('../package.json');
//var crypto					= require('crypto');
var logger					= require('debug-logger');

var app_directory			= './application/';
var server_directory		= './server/assets/';
var images_directory		= 'images/';
var fonts_directory			= 'fonts/';
var scss_directory			= 'scss/';
var less_directory			= 'less/';
var css_directory			= 'css/';
var js_directory			= 'js/';
var libraries_directory		= 'js/libraries/';
var nodemodules_directory	= './node_modules/';

var copy_options			= {
	overwrite: false,
	preserveTimestamps: false,
	transform: function (readStream, writeStream, file) {
		writeStream.on('open', function() {
			// noinspection JSUnresolvedVariable
			file.mode = process.platform === 'win32' && (file.mode & 146) === 0 ? file.mode | 146 : 664;
			readStream.pipe(writeStream);
		});
	}
};

//noinspection JSUnresolvedVariable
var dependencies			= typeof packages.dependencies !== 'undefined' ? Object.keys(packages.dependencies) : [];
//noinspection JSUnresolvedVariable
var server_dependencies		= typeof packages.devDependencies !== 'undefined' ? Object.keys(packages.devDependencies) : [];
//noinspection JSUnresolvedVariable
var napa_dependencies		= typeof packages.napa !== 'undefined' ? Object.keys(packages.napa) : [];

var tag						= 'import-libraries';
//noinspection JSUnresolvedFunction
var log						= logger.config({
	inspectOptions: {
		colors: true
	},
	ensureNewline: true,
	levels: {
		warn: {
			fd: 1
		},
		error: {
			fd: 1
		}
	}
})(tag);

function install(install_directory, dependency, version) {
	switch (dependency) {
		case 'alameda':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + 'requirejs-' + version + '.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case '@babel/standalone':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/babel.min.js', install_directory + libraries_directory + 'babel-standalone-' + version + '.min.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/babel.js', install_directory + libraries_directory + 'babel-standalone-' + version + '.js', copy_options, function (error) {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jquery':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.appendFile(install_directory + libraries_directory + dependency + '-' + version + '.min.js', '//# sourceMappingURL=' + dependency + '-' + version + '.map', function (error) {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.map', install_directory + libraries_directory + dependency + '-' + version + '.map', copy_options, function (error) {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									replace({
										files: install_directory + libraries_directory + dependency + '-' + version + '.map',
										from: dependency + '.js',
										to: dependency + '-' + version + '.js'
									}, function(error) {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											replace({
												files: install_directory + libraries_directory + dependency + '-' + version + '.map',
												from: dependency + '.min.js',
												to: dependency + '-' + version + '.min.js'
											}, function(error) {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, function (error) {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'jquery.ajax-retry':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + 'jquery-ajax-retry-' + version + '.min.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + 'jquery-ajax-retry-' + version + '.js', copy_options, function (error) {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'requirejs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/require.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs-plugins':
		case 'requirejs-plugins-current':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/src/json.js', install_directory + libraries_directory + 'requirejs-json-' + version + '.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/src/noext.js', install_directory + libraries_directory + 'requirejs-noext-' + version + '.js', copy_options, function (error) {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'requirejs-text':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/text.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs-babel-plugin':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/es6.js', install_directory + libraries_directory + 'requirejs-es6-' + version + '.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'babel-polyfill':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/polyfill.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'mithril':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, function (error) {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, function (error) {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							replace({
								files: install_directory + 'index.html',
								from: dependency + '.js',
								to: dependency + '-' + version + '.min.js'
							}, function(error) {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
	}
}

log.trace('');
log.trace('Importing application dependencies');
log.trace('');

for (var i = 0; i < dependencies.length; i++) {
	install(app_directory, dependencies[i], require('../node_modules/' + dependencies[i] + '/package.json').version);
}