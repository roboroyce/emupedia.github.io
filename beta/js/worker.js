// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {

	'use strict';

	var cpu = null;

	function init() {
		cpu = new CPU();

		cpu.R.AX = 0x1111;
		cpu.R.BX = 0x2222;
		cpu.R.CX = 0x3333;
		cpu.R.DX = 0x4444;

		cpu.R.CS = 0x5555;
		cpu.R.DS = 0x6666;
		cpu.R.ES = 0x7777;
		cpu.R.SS = 0x8888;

		cpu.R.SI = 0x9999;
		cpu.R.DI = 0xAAAA;
		cpu.R.BP = 0xBBBB;
		cpu.R.SP = 0xCCCC;

		cpu.R.IP = 0xDDDD;

		cpu.R.F = 0xEEEE;

		// cpu.R.AX = 0x1234;
		// cpu.U16[cpu.INDEX16.AX] = 0x1234;
		cpu.R16.AX = 0x1234;

		cpu.dumpState();

		if (typeof global.update === 'function') {
			global.update(cpu);
		}
	}

	if (typeof WorkerGlobalScope !== 'undefined') {
		if (global instanceof WorkerGlobalScope) {
			global.console.log('Running in worker!');
			// synchronous load
			importScripts('i8086/cpu.js');
			init();
		}
	} else {
		global.console.log('Running in page!');
		// asynchronous load
		importScripts('i8086/cpu.js', init);
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