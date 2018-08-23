// region Polyfills

// IE 11.228.17134.0
if (typeof console !== 'undefined') {
	if (!console.table) {
		console.table = function(arr) {
			var i, obj, keys, arr_len = arr.length;

			for (i = 0; i < arr_len; i++) {
				obj = arr[i];
				keys = Object.keys(obj);
				console.log(obj[keys[0]] + ': ' + obj[keys[1]]);
			}
		};
	}
} else {
	// Safari 5.1.7 (7534.57.2)
	// noinspection JSValidateTypes
	console = {
		log: function() {},
		table: function () {}
	};
}

// endregion

// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {

	'use strict';

	var cpu = null;

	function init() {
		cpu = new CPU();
		cpu.start();
		cpu.dumpState();

		if (typeof global.update === 'function') {
			global.update(cpu);
		}
	}

	if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document) {
		global.console.log('Running in page!');
		// asynchronous load
		importScripts('i8086/cpu.js', init);
	} else {
		global.console.log('Running in worker!');
		// synchronous load
		importScripts('polyfills.js', 'i8086/cpu.js');
		init();
	}

	onmessage = function(e) {
		global.console.log('browser => cpu');
		// global.console.log(JSON.parse(JSON.stringify(e)));
		global.console.log(e.data);

		switch (e.data) {
			case 'test':
				//noinspection JSCheckFunctionSignatures
				return self.postMessage({test: 'ok'});
			case 'state':
				//noinspection JSCheckFunctionSignatures
				return self.postMessage({state: cpu});
			default:
				//noinspection JSCheckFunctionSignatures
				return self.postMessage('default');
		}
	};

}(this));