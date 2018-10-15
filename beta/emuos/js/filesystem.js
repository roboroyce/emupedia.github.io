(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function(root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		factory(jQuery);
	}
} (function ($) {
	// noinspection JSUnusedLocalSymbols
	var root					= window.location.protocol + '//' + window.location.host + '/';

	var FileSystem = function (options) {
		var self = this;

		self.options = {
			ajax: {
				timeout: 15 * 1000,
				retry_timeout: 1000,
				retry_count: 5
			},
			github: {
				organization: 'Emupedia',
				repo: 'emupedia.github.io',
				app_id: 18939,
				app_install_id: 383274,
				private_key: ''
			}
		};

		self.options = $.extend(true, self.options, options);

		// noinspection JSUnresolvedVariable
		if (self.options.github.private_key !== '') {
			// noinspection JSUnresolvedVariable
			self.promise = self.relay('https://api.github.com/app/installations/' + self.options.github.app_install_id + '/access_tokens', {}, 'POST', {
				Authorization: 'Bearer ' + self.generateJWT(self.options.github.private_key, self.options.github.app_id),
				Accept: 'application/vnd.github.machine-man-preview+json'
			}).done(function(data) {
				if (typeof data.token !== 'undefined') {
					self.options.github.token = data.token;
				}
			});

			return self;
		} else {
			throw new Error('GitHub private key is empty');
		}
	};

	FileSystem.prototype.relay = function (url, data, type, headers) {
		var self = this;

		if (typeof type === 'undefined') {
			type = 'POST';
		}

		if (typeof headers === 'undefined') {
			headers = {};
		}

		return $.ajax({
			cache: false,
			type: type,
			url: url,
			headers: headers,
			data: data,
			dataType: 'json',
			timeout: self.options.ajax.timeout
		}).retry({
			times: self.options.ajax.retry_count,
			timeout: self.options.ajax.retry_timeout,
			statusCodes: []
		});
	};

	FileSystem.prototype.generateJWT = function(github_private_key, github_app_id) {
		var iat		= Math.floor(new Date().getTime() / 1000);
		var exp		= iat + (10 * 60); // maximum 10 minutes
		var iss		= github_app_id;
		var header	= {alg: 'RS256'};
		var payload	= {iat: iat, exp: exp, iss: iss};
		// noinspection JSUnusedLocalSymbols
		var jws		= new KJUR.jws.JWS();

		return KJUR.jws.JWS.sign(header.alg, JSON.stringify(header), JSON.stringify(payload), KEYUTIL.getKey(github_private_key));
	};

	FileSystem.prototype.getRawTree = function(github_token) {

	};

	return FileSystem;
}));