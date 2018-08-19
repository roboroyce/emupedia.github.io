(function() {

	// region Functions

	if (!window.importScripts) {
		// Poor's man requirejs :)
		window.importScripts = function (url, callback) {
			var script = document.createElement('script');
			script.src = url;
			script.onload = typeof callback === 'function' ? callback : function() {};
			document.head.appendChild(script);
		}
	}

	if (!window.$) {
		// Poor's man jQuery :)
		window.$ = function (selector) {
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
	}

	function dumpSystem() {
		console.table([{
			Feature: 'SYSTEM_FEATURE_ES5',
			Value: SYSTEM_FEATURE_ES5 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_ES6',
			Value: SYSTEM_FEATURE_ES6 ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WORKERS',
			Value: SYSTEM_FEATURE_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SHARED_WORKERS',
			Value: SYSTEM_FEATURE_SHARED_WORKERS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_TYPED_ARRAYS',
			Value: SYSTEM_FEATURE_TYPED_ARRAYS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_BIGINTS',
			Value: SYSTEM_FEATURE_BIGINTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SIMD',
			Value: SYSTEM_FEATURE_SIMD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_FULLSCREEN',
			Value: SYSTEM_FEATURE_FULLSCREEN ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_POINTER_LOCK',
			Value: SYSTEM_FEATURE_POINTER_LOCK ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_TIMERS',
			Value: SYSTEM_FEATURE_TIMERS ? 'TRUE' : 'FALSE'
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
			Feature: 'SYSTEM_FEATURE_WEBVR',
			Value: SYSTEM_FEATURE_WEBVR ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_HTML5AUDIO',
			Value: SYSTEM_FEATURE_HTML5AUDIO ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBAUDIO',
			Value: SYSTEM_FEATURE_WEBAUDIO ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_KEYBOARD',
			Value: SYSTEM_FEATURE_KEYBOARD ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_POINTER_EVENTS',
			Value: SYSTEM_FEATURE_POINTER_EVENTS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_GAMEPADS',
			Value: SYSTEM_FEATURE_GAMEPADS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBSOCKETS',
			Value: SYSTEM_FEATURE_WEBSOCKETS ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_SESSION_STORAGE',
			Value: SYSTEM_FEATURE_SESSION_STORAGE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_LOCAL_STORAGE',
			Value: SYSTEM_FEATURE_LOCAL_STORAGE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_INDEXED_DB',
			Value: SYSTEM_FEATURE_INDEXED_DB ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_WEBSQL',
			Value: SYSTEM_FEATURE_WEBSQL ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSYEM_FEATURE_GEOLOCATION',
			Value: SYSYEM_FEATURE_GEOLOCATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSYEM_FEATURE_ORIENTATION',
			Value: SYSYEM_FEATURE_ORIENTATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSYEM_FEATURE_MOTION',
			Value: SYSYEM_FEATURE_MOTION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSYEM_FEATURE_GYROSCOPE',
			Value: SYSYEM_FEATURE_GYROSCOPE ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_PROXIMITY',
			Value: SYSTEM_FEATURE_PROXIMITY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_AMBIENTLIGHT',
			Value: SYSTEM_FEATURE_AMBIENTLIGHT ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_VIBRATION',
			Value: SYSTEM_FEATURE_VIBRATION ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_FEATURE_BATTERY',
			Value: SYSTEM_FEATURE_BATTERY ? 'TRUE' : 'FALSE'
		} , {
			Feature: 'SYSTEM_INFO_CPU_ENDIANNESS',
			Value: SYSTEM_INFO_CPU_ENDIANNESS
		} , {
			Feature: 'SYSTEM_INFO_CPU_CORES',
			Value: SYSTEM_INFO_CPU_CORES
		} , {
			Feature: 'SYSTEM_INFO_GPU',
			Value: SYSTEM_INFO_GPU
		} , {
			Feature: 'SYSTEM_INFO_VIDEO_ACCELERATION',
			Value: SYSTEM_INFO_VIDEO_ACCELERATION
		}]);
	}

	// endregion

	// region System

	var audio								= document.createElement('audio');
	var canvas2D							= document.createElement('canvas');
	var context2D							= typeof canvas2D.getContext === 'function' ? canvas2D.getContext('2d') : false;
	var canvasWEBGL							= document.createElement('canvas');
	var contextWEBGL						= typeof canvasWEBGL.getContext === 'function' ? (canvasWEBGL.getContext('webgl') || canvasWEBGL.getContext('experimental-webgl')) : false;
	var canvasWEBGL2						= document.createElement('canvas');
	var contextWEBGL2						= typeof canvasWEBGL2.getContext === 'function' ? (canvasWEBGL2.getContext('webgl2') || canvasWEBGL2.getContext('experimental-webgl2')) : false;

	window.SYSTEM_FEATURE_STRICT			= (function() {'use strict'; return !this; })();
	window.SYSTEM_FEATURE_JSON				= 'JSON' in window && 'parse' in JSON;
	window.SYSTEM_FEATURE_BASE64			= 'btoa' in window && 'atob' in window;
	window.SYSTEM_FEATURE_WORKERS			= !!window.Worker;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_SHARED_WORKERS	= !!window.SharedWorker;
	window.SYSTEM_FEATURE_TYPED_ARRAYS		= typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined' ? typeof Int8Array !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int16Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined' && typeof Uint32Array !== 'undefined' && typeof Float32Array !== 'undefined' && typeof Float64Array !== 'undefined': false;
	window.SYSTEM_FEATURE_BIGINTS			= typeof BigInt !== 'undefined' ? typeof BigInt64Array !== 'undefined' && typeof BigUint64Array !== 'undefined' : false;
	// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
	window.SYSTEM_FEATURE_SIMD				= typeof SIMD !== 'undefined' ? typeof SIMD.Bool16x8 !== 'undefined' && typeof SIMD.Bool32x4 !== 'undefined' && typeof SIMD.Bool8x16 !== 'undefined' && typeof SIMD.Float32x4 !== 'undefined' && typeof SIMD.Int16x8 !== 'undefined' && typeof SIMD.Int32x4 !== 'undefined' && typeof SIMD.Int8x16 !== 'undefined' && typeof SIMD.Uint32x4 !== 'undefined' && typeof SIMD.Uint8x16 !== 'undefined' : false;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_FULLSCREEN		= !document.documentElement.requestFullscreen ? true : !!document.documentElement.webkitRequestFullScreen || !!document.documentElement.mozRequestFullScreen || !!document.documentElement.msRequestFullscreen;
	window.SYSTEM_FEATURE_POINTER_LOCK		= 'pointerLockElement' in document ? true : 'oPointerLockElement' in document || 'msPointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_TIMERS			= !!window.requestAnimationFrame ? true : !!window.webkitRequestAnimationFrame || !!window.mozRequestAnimationFrame || !!window.msRequestAnimationFrame || !!window.oRequestAnimationFrame;
	window.SYSTEM_FEATURE_CANVAS			= !!(context2D && context2D instanceof CanvasRenderingContext2D);
	window.SYSTEM_FEATURE_WEBGL				= !!(contextWEBGL && contextWEBGL instanceof WebGLRenderingContext);
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_WEBGL2			= !!(contextWEBGL2 && contextWEBGL2 instanceof WebGL2RenderingContext);
	window.SYSTEM_FEATURE_WEBVR				= 'getVRDisplays' in navigator ? true : 'mozGetVRDevices' in navigator;
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_FEATURE_HTML5AUDIO		= (function() {
		try {
			// noinspection JSUnresolvedVariable
			return !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/, ''));
		} catch(e) {
			return false;
		}
	})();
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_FEATURE_WEBAUDIO			= (function() {
		try {
			// noinspection JSUnresolvedVariable
			var context = AudioContext || webkitAudioContext || mozAudioContext || oAudioContext || msAudioContext;
			new context();

			return true;
		} catch(e) {
			return false;
		}
	})();
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_FEATURE_KEYBOARD			= true;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_POINTER_EVENTS	= !!window.PointerEvent ? true : !!window.webkitPointerEvent || !!window.mozPointerEvent || !!window.msPointerEvent || !!window.oPointerEvent;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_GAMEPADS			= !!navigator.getGamepads ? true : !!navigator.webkitGetGamepads || !!navigator.mozGetGamepads || !!navigator.msGetGamepads || !!navigator.oGetGamepads;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_WEBSOCKETS		= (function() {
		var protocol = 'https:' === location.protocol ? 'wss' : 'ws';

		if ('WebSocket' in window && window.WebSocket.CLOSING === 2) {
			if ('binaryType' in WebSocket.prototype) {
				return true;
			} else {
				try {
					return !!(new WebSocket(protocol + '://.').binaryType);
				} catch (e) {
					return false;
				}
			}
		}
	})();
	window.SYSTEM_FEATURE_SESSION_STORAGE	= 'sessionStorage' in window && window.sessionStorage !== null;
	window.SYSTEM_FEATURE_LOCAL_STORAGE		= 'localStorage' in window && window.localStorage !== null;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_INDEXED_DB		= !!window.indexedDB ? true : !!window.webkitIndexedDB || !!window.mozIndexedDB || !!window.moz_indexedDB || !!window.oIndexedDB || !!window.msIndexedDB;
	window.SYSTEM_FEATURE_WEBSQL			= !!window.openDatabase;
	window.SYSYEM_FEATURE_ORIENTATION		= !!window.DeviceOrientationEvent;
	window.SYSYEM_FEATURE_GEOLOCATION		= !!navigator.geolocation;
	window.SYSYEM_FEATURE_MOTION			= !!window.DeviceMotionEvent;
	// noinspection JSUnresolvedVariable
	window.SYSYEM_FEATURE_GYROSCOPE			= !!window.Gyroscope;
	window.SYSTEM_FEATURE_PROXIMITY			= 'ProximitySensor' in window;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_AMBIENTLIGHT		= !!window.AmbientLightSensor;
	window.SYSTEM_FEATURE_VIBRATION			= 'vibrate' in navigator;
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_BATTERY			= !!navigator.getBattery || !!navigator.battery || !!navigator.mozBattery;

	window.SYSTEM_FEATURE_ES5SYNTAX			= (function() {
		var value, obj, stringAccess, getter, setter, reservedWords, zeroWidthChars;
		try {
			stringAccess = eval('"foobar"[3] === "b"');
			getter = eval('({ get x(){ return 1 } }).x === 1');
			eval('({ set x(v){ value = v; } }).x = 1');
			// noinspection JSUnusedAssignment
			setter = value === 1;
			eval('obj = ({ if: 1 })');
			// noinspection JSUnusedAssignment
			reservedWords = obj['if'] === 1;
			zeroWidthChars = eval('_\u200c\u200d = true');

			return stringAccess && getter && setter && reservedWords && zeroWidthChars;
		} catch (e) {
			return false;
		}
	})();
	window.SYSTEM_FEATURE_ES5UNDEFINED		= (function() {
		var result, originalUndefined;
		try {
			originalUndefined = window.undefined;
			window.undefined = 12345;
			result = typeof window.undefined === 'undefined';
			window.undefined = originalUndefined;
		} catch (e) {
			return false;
		}
		return result;
	})();
	window.SYSTEM_FEATURE_ES5ARRAY			= !!(Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray);
	window.SYSTEM_FEATURE_ES5DATE			= (function() {
		var isoDate = '2013-04-12T06:06:37.307Z', canParseISODate = false;

		try {
			canParseISODate = !!Date.parse(isoDate);
		} catch (e) {}

		return !!(Date.now && Date.prototype && Date.prototype.toISOString && Date.prototype.toJSON && canParseISODate);
	})();
	window.SYSTEM_FEATURE_ES5FUNCTION		= !!(Function.prototype && Function.prototype.bind);
	window.SYSTEM_FEATURE_ES5OBJECT			= !!(Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions);
	window.SYSTEM_FEATURE_ES5STRING			= !!(String.prototype && String.prototype.trim);
	window.SYSTEM_FEATURE_ES5				= !!(SYSTEM_FEATURE_STRICT && SYSTEM_FEATURE_JSON && SYSTEM_FEATURE_BASE64 /*&& SYSTEM_FEATURE_ES5SYNTAX && SYSTEM_FEATURE_ES5UNDEFINED*/ && SYSTEM_FEATURE_ES5ARRAY && SYSTEM_FEATURE_ES5DATE && SYSTEM_FEATURE_ES5FUNCTION && SYSTEM_FEATURE_ES5OBJECT && SYSTEM_FEATURE_ES5STRING);

	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_ES6NUMBER			= !!(Number.isFinite && Number.isInteger && Number.isSafeInteger && Number.isNaN && Number.parseInt && Number.parseFloat && Number.isInteger(Number.MAX_SAFE_INTEGER) && Number.isInteger(Number.MIN_SAFE_INTEGER) && Number.isFinite(Number.EPSILON));
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_ES6MATH			= !!(Math && Math.clz32 && Math.cbrt && Math.imul && Math.sign && Math.log10 && Math.log2 && Math.log1p && Math.expm1 && Math.cosh && Math.sinh && Math.tanh && Math.acosh && Math.asinh && Math.atanh && Math.hypot && Math.trunc && Math.fround);
	window.SYSTEM_FEATURE_ES6ARRAY			= !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of);
	window.SYSTEM_FEATURE_ES6FUNCTION		= (function() {
		try {
			eval('()=>{}');
		} catch (e) {
			return false;
		}
		return true;
	})();
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_ES6OBJECT			= !!(Object.assign && Object.is && Object.setPrototypeOf);
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_ES6STRING			= !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && (String.prototype.includes || String.prototype.contains));
	// noinspection JSUnresolvedVariable
	window.SYSTEM_FEATURE_ES6COLLECTIONS	= !!(window.Map && window.Set && window.WeakMap && window.WeakSet);
	window.SYSTEM_FEATURE_ES6GENERATORS		= (function() {
		try {
			new Function('function* test() {}')();
		} catch (e) {
			return false;
		}
		return true;
	})();
	window.SYSTEM_FEATURE_ES6PROMISES		= (function() {
		return 'Promise' in window && 'resolve' in window.Promise && 'reject' in window.Promise && 'all' in window.Promise && 'race' in window.Promise && (function() {
			var resolve;
			// noinspection JSIgnoredPromiseFromCall
			new window.Promise(function(r) { resolve = r; });
			return typeof resolve === 'function';
		}());
	})();
	window.SYSTEM_FEATURE_ES6				= !!(SYSTEM_FEATURE_ES5 && SYSTEM_FEATURE_ES6NUMBER && SYSTEM_FEATURE_ES6MATH && SYSTEM_FEATURE_ES6ARRAY && SYSTEM_FEATURE_ES6FUNCTION && SYSTEM_FEATURE_ES6OBJECT && SYSTEM_FEATURE_ES6STRING && SYSTEM_FEATURE_ES6COLLECTIONS && SYSTEM_FEATURE_ES6GENERATORS && SYSTEM_FEATURE_ES6PROMISES);

	window.SYSTEM_INFO_CPU_LITTLE_ENDIAN	= (SYSTEM_FEATURE_TYPED_ARRAYS ? (function() {
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setUint16(0, 256, true);

		return new Uint16Array(buffer)[0] === 256;
	})() : undefined);
	// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
	window.SYSTEM_INFO_CPU_BIG_ENDIAN		= typeof SYSTEM_INFO_CPU_LITTLE_ENDIAN !== 'undefined' ? !SYSTEM_INFO_CPU_LITTLE_ENDIAN : undefined;
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_INFO_CPU_ENDIANNESS		= typeof SYSTEM_INFO_CPU_LITTLE_ENDIAN !== 'undefined' ? (SYSTEM_INFO_CPU_LITTLE_ENDIAN ? 'LE' : 'BE') : undefined;
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_INFO_CPU_CORES			= !navigator.hardwareConcurrency ? 1 : navigator.hardwareConcurrency;
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_INFO_VIDEO_ACCELERATION	= SYSTEM_FEATURE_WEBGL || SYSTEM_FEATURE_WEBGL2 ? '3D' : (SYSTEM_FEATURE_CANVAS ? '2D' : undefined);
	// noinspection JSUnusedGlobalSymbols
	window.SYSTEM_INFO_GPU					= (function() {
		if (contextWEBGL) {
			if (typeof contextWEBGL.getSupportedExtensions === 'function') {
				if (contextWEBGL.getSupportedExtensions().indexOf('WEBGL_debug_renderer_info') !== -1) {
					var dbgRenderInfo = contextWEBGL.getExtension('WEBGL_debug_renderer_info');

					if (typeof dbgRenderInfo.UNMASKED_RENDERER_WEBGL !== 'undefined') {
						return contextWEBGL.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
					}
				}
			}
		}

		return undefined;
	})();

	// endregion

	dumpSystem();

	var $SCRIPTS = $('script');

	importScripts($SCRIPTS.getAttribute('data-main').lastIndexOf('.js') === -1 ? $SCRIPTS.getAttribute('data-main') + '.js' : $SCRIPTS.getAttribute('data-main'));

}());