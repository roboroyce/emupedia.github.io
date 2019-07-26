const fs = require('fs'),
	rollup = require('rollup'),
	node = require('rollup-plugin-node-resolve'),
	uglify = require('rollup-plugin-uglify').uglify,
	buble = require('rollup-plugin-buble'),
	commonjs = require('rollup-plugin-commonjs');

rollup.rollup({
	input: 'beta/emuos2/src/js/main.js',
	plugins: [
		node(),
		buble({
			transforms: {
				dangerousTaggedTemplateString: true
			}
		}),
		commonjs(),
		uglify({compress: true}),
	]
}).then(bundle => bundle.write({
	file: 'beta/emuos2/dist/js/main.js',
	format: 'umd',
})).catch(console.error);

const index = fs.readFileSync('beta/emuos2/src/index.html', 'utf8');
fs.writeFileSync('beta/emuos2/dist/index.html', index);