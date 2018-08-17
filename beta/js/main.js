// region Functions

// Poor's man jQuery :)
function $(selector) {
	if (document.querySelector) {
		return document.querySelector(selector);
	} else {
		switch (selector.charAt(0)) {
			case '.':
				return document.getElementsByClassName(selector.substr(1))[0];
			case '#':
				return document.getElementById(selector.substr(1));
			default:
				return document.getElementsByTagName(selector)[0];
		}
	}
}

function dumpBuffer(buffer, radix) {
	return Array.from(new Uint16Array(buffer)).map(b => b.toString(radix).padStart(4, '0')).join(' ').toUpperCase();
}

function dumpState(state) {
	$STATE.innerHTML = dumpBuffer(state.B, 16).replace(' ', '&nbsp;');

	//noinspection JSCheckFunctionSignatures
	$AX.innerHTML = state.R.AX.toString(16).padStart(4, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$BX.innerHTML = state.R.BX.toString(16).padStart(4, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$CX.innerHTML = state.R.CX.toString(16).padStart(4, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$DX.innerHTML = state.R.DX.toString(16).padStart(4, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$AH.innerHTML = state.R.AH.toString(16).padStart(2, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$AL.innerHTML = state.R.AL.toString(16).padStart(2, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$BH.innerHTML = state.R.BH.toString(16).padStart(2, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$BL.innerHTML = state.R.BL.toString(16).padStart(2, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$CH.innerHTML = state.R.CH.toString(16).padStart(2, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$CL.innerHTML = state.R.CL.toString(16).padStart(2, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$DH.innerHTML = state.R.DH.toString(16).padStart(2, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$DL.innerHTML = state.R.DL.toString(16).padStart(2, '0').toUpperCase();

	$CS.innerHTML = state.R.CS.toString(16).padStart(4, '0').toUpperCase();
	$DS.innerHTML = state.R.DS.toString(16).padStart(4, '0').toUpperCase();
	$ES.innerHTML = state.R.ES.toString(16).padStart(4, '0').toUpperCase();
	$SS.innerHTML = state.R.SS.toString(16).padStart(4, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$SI.innerHTML = state.R.SI.toString(16).padStart(4, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$DI.innerHTML = state.R.DI.toString(16).padStart(4, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$BP.innerHTML = state.R.BP.toString(16).padStart(4, '0').toUpperCase();
	//noinspection JSCheckFunctionSignatures
	$SP.innerHTML = state.R.SP.toString(16).padStart(4, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$IP.innerHTML = state.R.IP.toString(16).padStart(4, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$F.innerHTML = state.R.F.toString(16).padStart(4, '0').toUpperCase();

	//noinspection JSCheckFunctionSignatures
	$FLAGS.innerHTML = state.R.F.toString(2).padStart(16, '0').toUpperCase().split('').join('&nbsp;');

	$CF.innerHTML = state.F.CF;
	$PF.innerHTML = state.F.PF;
	$AF.innerHTML = state.F.AF;
	$ZF.innerHTML = state.F.ZF;
	$SF.innerHTML = state.F.SF;
	$TF.innerHTML = state.F.TF;
	$IF.innerHTML = state.F.IF;
	$DF.innerHTML = state.F.DF;
	$OF.innerHTML = state.F.OF;
}

function dumpSystem() {
	console.table([{
		Feature: 'SYSTEM_FEATURE_WORKERS',
		Value: SYSTEM_FEATURE_WORKERS ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_TYPED_ARRAYS',
		Value: SYSTEM_FEATURE_TYPED_ARRAYS ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_SIMD',
		Value: SYSTEM_FEATURE_SIMD ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_CANVAS',
		Value: SYSTEM_FEATURE_CANVAS ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_WEBGL',
		Value: SYSTEM_FEATURE_WEBGL ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_WEBGL2',
		Value: SYSTEM_FEATURE_WEBGL2 ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_HTML5AUDIO',
		Value: SYSTEM_FEATURE_HTML5AUDIO ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_FEATURE_WEBAUDIO',
		Value: SYSTEM_FEATURE_WEBAUDIO ? 'TRUE' : 'FALSE'
	} , {
		Feature: 'SYSTEM_ENDIANNESS',
		Value: SYSTEM_ENDIANNESS
	} , {
		Feature: 'SYSTEM_CPU_CORES',
		Value: SYSTEM_CPU_CORES
	} , {
		Feature: 'SYSTEM_GPU',
		Value: SYSTEM_GPU
	} , {
		Feature: 'SYSTEM_VIDEO',
		Value: SYSTEM_VIDEO
	}]);
}

// endregion

// region Variables
let $STATE	= $('.STATE');

let $AX		= $('.AX');
let $BX		= $('.BX');
let $CX		= $('.CX');
let $DX		= $('.DX');

let $AH		= $('.AH');
let $AL		= $('.AL');
let $BH		= $('.BH');
let $BL		= $('.BL');
let $CH		= $('.CH');
let $CL		= $('.CL');
let $DH		= $('.DH');
let $DL		= $('.DL');

let $CS		= $('.CS');
let $DS		= $('.DS');
let $ES		= $('.ES');
let $SS		= $('.SS');

let $SI		= $('.SI');
let $DI		= $('.DI');
let $BP		= $('.BP');
let $SP		= $('.SP');

let $IP		= $('.IP');

let $F		= $('.F');

let $FLAGS	= $('.FLAGS');

let $CF		= $('.CF');
let $PF		= $('.PF');
let $AF		= $('.AF');
let $ZF		= $('.ZF');
let $SF		= $('.SF');
let $TF		= $('.TF');
let $IF		= $('.IF');
let $DF		= $('.DF');
let $OF		= $('.OF');

// endregion

// region System
let audio			= document.createElement('audio');
let canvas2D		= document.createElement('canvas');
let context2D		= typeof canvas2D.getContext === 'function' ? canvas2D.getContext('2d') : false;
let canvasWEBGL		= document.createElement('canvas');
let contextWEBGL	= typeof canvasWEBGL.getContext === 'function' ? (canvasWEBGL.getContext('webgl') || canvasWEBGL.getContext('experimental-webgl')) : false;
let canvasWEBGL2	= document.createElement('canvas');
let contextWEBGL2	= typeof canvasWEBGL2.getContext === 'function' ? (canvasWEBGL2.getContext('webgl2') || canvasWEBGL2.getContext('experimental-webgl2')) : false;

const SYSTEM_FEATURE_WORKERS		= (function() {
	return !!window.Worker;
})();
const SYSTEM_FEATURE_TYPED_ARRAYS	= typeof ArrayBuffer !== 'undefined' && typeof Int8Array !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int16Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined' && typeof Uint32Array !== 'undefined' && typeof Float32Array !== 'undefined' && typeof Float64Array !== 'undefined' && typeof DataView !== 'undefined';
// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
const SYSTEM_FEATURE_SIMD			= typeof SIMD !== 'undefined' ? typeof SIMD.Bool16x8 !== 'undefined' && typeof SIMD.Bool32x4 !== 'undefined' && typeof SIMD.Bool8x16 !== 'undefined' && typeof SIMD.Float32x4 !== 'undefined' && typeof SIMD.Int16x8 !== 'undefined' && typeof SIMD.Int32x4 !== 'undefined' && typeof SIMD.Int8x16 !== 'undefined' && typeof SIMD.Uint32x4 !== 'undefined' && typeof SIMD.Uint8x16 !== 'undefined' : false;
const SYSTEM_FEATURE_CANVAS			= (function() {
	return !!(context2D && context2D instanceof CanvasRenderingContext2D);
})();
const SYSTEM_FEATURE_WEBGL			= (function() {
	return !!(contextWEBGL && contextWEBGL instanceof WebGLRenderingContext);
})();
const SYSTEM_FEATURE_WEBGL2			= (function() {
	// noinspection JSUnresolvedVariable
	return !!(contextWEBGL2 && contextWEBGL2 instanceof WebGL2RenderingContext);
})();
// noinspection JSUnusedGlobalSymbols
const SYSTEM_FEATURE_HTML5AUDIO		= (function() {
	try {
		// noinspection JSUnresolvedVariable
		return !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/, ''));
	} catch(e) {
		return false;
	}
})();
// noinspection JSUnusedGlobalSymbols
const SYSTEM_FEATURE_WEBAUDIO		= (function() {
	try {
		// noinspection JSUnresolvedVariable
		let context = AudioContext || webkitAudioContext || mozAudioContext || oAudioContext || msAudioContext;
		new context();

		return true;
	} catch(e) {
		return false;
	}
})();
const SYSTEM_LITTLE_ENDIAN			= (SYSTEM_FEATURE_TYPED_ARRAYS ? (function() {
	let buffer = new ArrayBuffer(2);
	new DataView(buffer).setUint16(0, 256, true);

	return new Uint16Array(buffer)[0] === 256;
})() : undefined);
// noinspection JSUnusedGlobalSymbols
const SYSTEM_BIG_ENDIAN				= typeof SYSTEM_LITTLE_ENDIAN !== 'undefined' ? !SYSTEM_LITTLE_ENDIAN : undefined;
// noinspection JSUnusedGlobalSymbols
const SYSTEM_ENDIANNESS				= typeof SYSTEM_LITTLE_ENDIAN !== 'undefined' ? (SYSTEM_LITTLE_ENDIAN ? 'LE' : 'BE') : undefined;
// noinspection JSUnusedGlobalSymbols
const SYSTEM_CPU_CORES				= !navigator.hardwareConcurrency ? 1 : navigator.hardwareConcurrency;
// noinspection JSUnusedGlobalSymbols
const SYSTEM_KEYBOARD				= undefined;
// noinspection JSUnusedGlobalSymbols
const SYSTEM_VIDEO					= (SYSTEM_FEATURE_WEBGL || SYSTEM_FEATURE_WEBGL2) ? '3D' : (SYSTEM_FEATURE_CANVAS ? '2D' : undefined);
// noinspection JSUnusedGlobalSymbols
const SYSTEM_GPU					= (function() {
	if (contextWEBGL) {
		if (typeof contextWEBGL.getSupportedExtensions === 'function') {
			if (contextWEBGL.getSupportedExtensions().indexOf('WEBGL_debug_renderer_info') > - 1) {
				let dbgRenderInfo = contextWEBGL.getExtension('WEBGL_debug_renderer_info');

				if (typeof dbgRenderInfo.UNMASKED_RENDERER_WEBGL !== 'undefined') {
					let gpu = contextWEBGL.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);

					if (gpu.indexOf('(') !== -1) {
						gpu = gpu.split('(');
						gpu = gpu[1];
						gpu = gpu.split(' Direct');
						gpu = gpu[0];
					}

					return gpu;
				}
			}
		}
	}

	return undefined;
})();

dumpSystem();

// endregion

if (SYSTEM_FEATURE_WORKERS) {
	let cpu = new Worker('js/worker.js');

	cpu.onmessage = function(e) {
		console.log('cpu => browser');

		switch (typeof e.data) {
			case 'object':
				if (typeof e.data.state !== 'undefined') {
					dumpState(e.data.state);
				} else {
					console.log(e.data);
				}
				break;
			default:
				console.log(e.data);
				break;
		}
	};
	// noinspection JSUndefinedPropertyAssignment
	cpu.onmessageerror = function() {
		console.log('cpu.onmessageerror()');
	};
	cpu.onerror = function() {
		console.log('cpu.onerror()');
	};
	// noinspection JSDeprecatedSymbols
	cpu.postMessage('test');
	// noinspection JSDeprecatedSymbols
	cpu.postMessage('state');

	onerror = function(message, url, lineNumber) {
		console.log('Error: ' + message + ' in ' + url + ' at line ' + lineNumber);
	};
}