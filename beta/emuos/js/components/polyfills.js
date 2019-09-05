// noinspection ES6ConvertVarToLetConst
var $noop = function() {};

if (typeof console === 'undefined') {
	// noinspection JSValidateTypes
	console = {
		log: $noop
	}
} else if (typeof console.log !== 'function') {
	console.log = $noop;
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(search, pos) {
		return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
	};
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}

		return this.substring(this_len - search.length, this_len) === search;
	};
}