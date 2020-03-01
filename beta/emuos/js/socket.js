// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	}
} (function() {
	function Socket() {
		this.events = {};
		this.server = 'wss://' + location.hostname + ':3000';
		this.connected = false;
		this.keep_alive();
	}

	Socket.prototype = {
		keep_alive: function() {
			var self = this;

			if (self.keep_alive_interval) {
				clearInterval(self.keep_alive_interval);
			}

			self.keep_alive_interval = setInterval(function() {
				self.send('ping');
			}, 30000);

			return self;
		},
		emit_event: function (e, data) {
			if (!e) {
				return false;
			}

			if (typeof this.events[e] !== 'object') {
				return false;
			}

			this.events[e].forEach(function (cb) {
				if (typeof cb === 'function') {
					cb(data);
				}
			});
		},
		connect: function() {
			var self = this;

			if (this.connect_timeout) {
				clearTimeout(self.connect_timeout);
			}

			var server = arguments[0] || false;

			if (server) {
				self.server = server;
			}

			setTimeout(function() {
				self.init_socket();
			},500);

			return self;
		},
		disconnect: function() {
			if (this.connected) {
				this.socket.close(4666);
			}

			return this;
		},
		on: function (cmd, cb) {
			if (!cmd) {
				return this;
			}

			if (typeof cb !== 'function') {
				return this;
			}

			if (!this.events[cmd]) {
				this.events[cmd] = [];
			}

			this.events[cmd].push(cb);

			return this;
		},
		init_socket: function() {
			var self = this;

			self.socket = new WebSocket(self.server);

			self.socket.on = function() {
				self.on(arguments);
			}

			self.socket.onopen = function() {
				self.connected = true;
				self.emit_event('connect',{
					server: self.server
				});
			};

			self.socket.onclose = function (e) {
				self.connected = false;

				if (e.code !== 4666) {
					if (self.connect_timeout) {
						clearTimeout(self.connect_timeout);
					}

					self.connect_timeout = setTimeout(function() {
						self.connect();
					},10000);
				}
				self.emit_event('disconnect', e);
			};

			self.socket.onmessage = function (message) {
				var data;

				try {
					data = JSON.parse(message.data);
				} catch (error) {
					data = message.data
				}

				self.emit_event(data.cmd, data.data)
			};

			self.socket.send_cmd = function (cmd, data) {
				return self.socket.send({
					cmd: cmd,
					data: data
				});
			}

			return self;
		},
		send: function (data) {
			if (data.cmd === 'connect') {
				return this.connect(data.data);
			}

			if (data.cmd === 'disconnect') {
				return this.disconnect();
			}

			if (!this.connected) {
				return this;
			}

			if (typeof this.socket !== 'undefined') {
				if (typeof this.socket.send === 'function') {
					try {
						this.socket.send(JSON.stringify(data));
					} catch (e) {
						console.log(e);
					}
				}
			}

			return this;
		}
	};

	return new Socket();
}));