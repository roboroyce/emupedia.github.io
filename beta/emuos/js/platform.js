// region Browsers

var platform								= typeof navigator.platform !== 'undefined' ? navigator.platform : '';
var browser									= typeof navigator.userAgent !== 'undefined' ? navigator.userAgent : '';
var version									= typeof navigator.appVersion !== 'undefined' ? navigator.appVersion : '';
var vendor									= typeof navigator.vendor !== 'undefined' ? navigator.vendor : '';
// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
var oscpu									= typeof navigator.oscpu !== 'undefined' ? navigator.oscpu : '';

window.isWindows							= version.indexOf('Win') !== -1;
window.isMacOS								= version.indexOf('Mac') !== -1;
window.isUNIX								= version.indexOf('X11') !== -1;
window.isLinux								= version.indexOf('Linux') !== -1;

window.isBrowser							= !!(typeof window === 'object' && typeof navigator === 'object' && document);
window.isWorker								= typeof importScripts === 'function' && typeof postMessage === 'function' && !window.isBrowser;
window.isNode								= typeof process === 'object' && typeof require === 'function' && !window.isBrowser && !window.isWorker;
window.isShell								= !(window.isBrowser && window.isWorker && window.isNode);

window.isMobile								= browser.indexOf('Mobi') !== -1;
window.isDesktop							= !window.isMobile;

window.is64									= browser.indexOf('WOW64') !== -1 || browser.indexOf('Win64') !== -1 || browser.indexOf('amd64') !== -1 || browser.indexOf('x86_64') !== -1;
window.is32									= !window.is64 ? (browser.indexOf('WOW32') !== -1 || browser.indexOf('Win32') !== -1 || browser.indexOf('i386') !== -1 || browser.indexOf('i686') !== -1) : true;

window.isIE									= !window.isEdge && (browser.indexOf('MSIE') !== -1 || browser.indexOf('Trident') !== -1);
window.isNetscape							= browser.indexOf('Navigator') !== -1;
window.isKMeleon							= browser.indexOf('K-Meleon') !== -1;
window.isPaleMoon							= browser.indexOf('PaleMoon') !== -1;
window.isFirefox							= !window.isNetscape && !window.isPaleMoon && browser.indexOf('Firefox') !== -1;
window.isChrome								= browser.indexOf('Chrome') !== -1 || vendor === 'Google Inc.' || !!window.chrome;
window.isEdgeHTML							= browser.indexOf('Edge') !== -1;
window.isEdgeBlink							= window.isChrome && browser.indexOf('Edg/') !== -1;
window.isEdge								= window.isEdgeHTML || window.isEdgeBlink;
window.isChromium							= window.isChrome && !window.chrome;
window.isVivaldi							= window.isChrome && browser.indexOf('Vivaldi') !== -1;
window.isElectron							= window.isChrome && browser.indexOf('Electron') !== -1;
window.isOperaPresto						= browser.indexOf('Opera') !== -1;
window.isOperaBlink							= window.isChrome && browser.indexOf('OPR') !== -1;
window.isOpera								= window.isOperaPresto || window.isOperaBlink;
window.isSafari								= browser.indexOf('Safari') !== -1 || vendor === 'Apple Computer, Inc.';
window.isOther								= !(window.isIE && window.isEdge && window.isFirefox && window.isChrome && window.isOpera && window.isSafari);

// endregion