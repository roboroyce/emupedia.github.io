var fs = require('fs-extra');
var replace = require('replace-in-file');
var packages = require('../package.json');

function install(dependency, version) {
	switch (dependency) {
		case 'json3':
			fs.copy('./node_modules/' + dependency +  '/lib/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'es5-shim':
			fs.copy('./node_modules/' + dependency +  '/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					replace({
						files: './js/library/' + dependency + '-' + version + '.min.js',
						replace: '//# sourceMappingURL=es5-shim.map',
						with: '//# sourceMappingURL=es5-shim-' + version + '.map'
					}, function(error, changedFiles) {
						if (error) {
							console.error('Error occurred:', error);
						} else {
							fs.copy('./node_modules/' + dependency +  '/' + dependency + '.map', './js/library/' + dependency + '-' + version + '.map', function (error) {
								if (error) {
									console.error('Error occurred:', error);
								} else {
									replace({
										files: './js/library/es5-shim-' + version + '.map',
										replace: '"sources":["es5-shim.js"]',
										with: '"sources":["es5-shim-' + version + '.js"]'
									}, function(error, changedFiles) {
										if (error) {
											console.error('Error occurred:', error);
										} else {
											fs.copy('./node_modules/' + dependency +  '/es5-shim.js', './js/library/es5-shim-' + version + '.js', function (error) {
												if (error) {
													console.error('Error occurred:', error);
												} else {
													fs.copy('./node_modules/' + dependency +  '/es5-sham.min.js', './js/library/es5-sham-' + version + '.min.js', function (error) {
														if (error) {
															console.error('Error occurred:', error);
														} else {
															replace({
																files: './js/library/es5-sham-' + version + '.min.js',
																replace: '//# sourceMappingURL=es5-sham.map',
																with: '//# sourceMappingURL=es5-sham-' + version + '.map'
															}, function(error, changedFiles) {
																if (error) {
																	console.error('Error occurred:', error);
																} else {
																	fs.copy('./node_modules/' + dependency +  '/es5-sham.map', './js/library/es5-sham-' + version + '.map', function (error) {
																		if (error) {
																			console.error('Error occurred:', error);
																		} else {
																			replace({
																				files: './js/library/es5-sham-' + version + '.map',
																				replace: '"sources":["es5-sham.js"]',
																				with: '"sources":["es5-sham-' + version + '.js"]'
																			}, function(error, changedFiles) {
																				if (error) {
																					console.error('Error occurred:', error);
																				} else {
																					fs.copy('./node_modules/' + dependency +  '/es5-sham.js', './js/library/es5-sham-' + version + '.js', function (error) {
																						if (error) {
																							console.error('Error occurred:', error);
																						} else {
																							console.log(dependency + ' version ' + version + ' installed!');
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
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'es6-shim':
			fs.copy('./node_modules/' + dependency +  '/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					replace({
						files: './js/library/' + dependency + '-' + version + '.min.js',
						replace: '//# sourceMappingURL=es6-shim.map',
						with: '//# sourceMappingURL=es6-shim-' + version + '.map'
					}, function(error, changedFiles) {
						if (error) {
							console.error('Error occurred:', error);
						} else {
							fs.copy('./node_modules/' + dependency +  '/' + dependency + '.map', './js/library/' + dependency + '-' + version + '.map', function (error) {
								if (error) {
									console.error('Error occurred:', error);
								} else {
									replace({
										files: './js/library/es6-shim-' + version + '.map',
										replace: '"sources":["es6-shim.js"]',
										with: '"sources":["es6-shim-' + version + '.js"]'
									}, function(error, changedFiles) {
										if (error) {
											console.error('Error occurred:', error);
										} else {
											fs.copy('./node_modules/' + dependency +  '/es6-shim.js', './js/library/es6-shim-' + version + '.js', function (error) {
												if (error) {
													console.error('Error occurred:', error);
												} else {
													fs.copy('./node_modules/' + dependency +  '/es6-sham.min.js', './js/library/es6-sham-' + version + '.min.js', function (error) {
														if (error) {
															console.error('Error occurred:', error);
														} else {
															replace({
																files: './js/library/es6-sham-' + version + '.min.js',
																replace: '//# sourceMappingURL=es6-sham.map',
																with: '//# sourceMappingURL=es6-sham-' + version + '.map'
															}, function(error, changedFiles) {
																if (error) {
																	console.error('Error occurred:', error);
																} else {
																	fs.copy('./node_modules/' + dependency +  '/es6-sham.map', './js/library/es6-sham-' + version + '.map', function (error) {
																		if (error) {
																			console.error('Error occurred:', error);
																		} else {
																			replace({
																				files: './js/library/es6-sham-' + version + '.map',
																				replace: '"sources":["es6-sham.js"]',
																				with: '"sources":["es6-sham-' + version + '.js"]'
																			}, function(error, changedFiles) {
																				if (error) {
																					console.error('Error occurred:', error);
																				} else {
																					fs.copy('./node_modules/' + dependency +  '/es6-sham.js', './js/library/es6-sham-' + version + '.js', function (error) {
																						if (error) {
																							console.error('Error occurred:', error);
																						} else {
																							console.log(dependency + ' version ' + version + ' installed!');
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
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'es6-module-loader':
			fs.copy('./node_modules/' + dependency +  '/dist/' + dependency + '-dev.src.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'alameda':
			fs.copy('./node_modules/' + dependency +  '/' + dependency + '.js', './js/library/' + dependency + '-' + version + '.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs':
			fs.copy('./node_modules/' + dependency +  '/require.js', './js/library/' + dependency + '-' + version + '.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs-babel':
			fs.copy('./node_modules/' + dependency +  '/es6.js', './js/library/' + dependency + '-' + version + '.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'systemjs':
			fs.copy('./node_modules/' + dependency +  '/dist/system-csp-production.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					console.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'systemjs-plugin-babel':
			fs.copy('./node_modules/' + dependency +  '/plugin-babel.js', './js/library/systemjs-plugin-babel-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					fs.copy('./node_modules/' + dependency +  '/systemjs-babel-browser.js', './js/library/systemjs-babel-browser-' + version + '.min.js', function (error) {
						if (error) {
							console.error('Error occurred:', error);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'babel-core':
			fs.copy('./node_modules/' + dependency +  '/browser.min.js', './js/library/babel-browser-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					fs.copy('./node_modules/' + dependency +  '/browser-polyfill.min.js', './js/library/babel-browser-polyfill-' + version + '.min.js', function (error) {
						if (error) {
							console.error('Error occurred:', error);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jquery':
			fs.copy('./node_modules/' + dependency + '/dist/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					fs.copy('./node_modules/' + dependency + '/dist/' + dependency + '.min.map', './js/library/' + dependency + '-' + version + '.min.map', function (error) {
						if (error) {
							console.error('Error occurred:', error);
						} else {
							console.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'mithril':
			fs.copy('./node_modules/' + dependency + '/' + dependency + '.min.js', './js/library/' + dependency + '-' + version + '.min.js', function (error) {
				if (error) {
					console.error('Error occurred:', error);
				} else {
					fs.copy('./node_modules/' + dependency + '/' + dependency + '.min.js.map', './js/library/' + dependency + '.min.js.map', function (error) {
						if (error) {
							console.error('Error occurred:', error);
						} else {
							fs.copy('./node_modules/' + dependency + '/' + dependency + '.js', './js/library/' + dependency + '.js', function (error) {
								if (error) {
									console.error('Error occurred:', error);
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