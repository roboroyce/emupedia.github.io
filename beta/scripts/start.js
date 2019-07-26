const fs = require('fs'),
	wright = require('wright'),
	rollup = require('rollup'),
	stylus = require('stylus'),
	node = require('rollup-plugin-node-resolve'),
	buble = require('rollup-plugin-buble'),
	commonjs = require('rollup-plugin-commonjs');

wright({
	debug: true,
	main: 'beta/emuos2/src/index.html',
	serve: 'dist',
	js: {
		watch: 'beta/emuos2/src/**/*.js',
		path: 'js/main.js',
		compile: roll
	},
	css: {
		watch: 'beta/emuos2/src/css/**/*.styl',
		path: 'css/main.css',
		compile: style
	}
});

let cache = null;

function roll() {
	return rollup.rollup({
		input: 'beta/emuos2/src/js/main.js',
		cache: cache,
		plugins: [
			node(),
			buble({
				transforms: {
					dangerousTaggedTemplateString: true
				}
			}),
			commonjs()
		]
	}).then(bundle => {
		cache = bundle;

		return bundle.generate({
			format: 'umd'
		})
	}).then(result => result.output[0].code)
}

function style() {
	return new Promise((resolve, reject) => {
		fs.readFile('beta/emuos2/src/css/main.styl', 'utf8', (err, str) => {
			if (err) {
				return reject(err)
			}

			stylus(str, {
				paths: ['beta/emuos2/src/css']
			}).render((err, css) => err ? reject(err) : resolve(css))
		})
	})
}