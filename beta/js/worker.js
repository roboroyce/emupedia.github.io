self.importScripts('i8086/cpu.js');

let cpu = new CPU();

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

cpu.dumpState();

self.onmessage = function(e) {
	console.log('browser => cpu');
	// console.log(e);
	console.log(e.data);

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