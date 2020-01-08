// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['socketio'], factory);
	}
} (function (io) {
	var client_loader = {};
	var client = {};

	function iframe_network(net, iframe_id) {
		this.events = {};
		this.net = net;
		this.buffer = [];
		this.iframe_id = null;
		this.iframe_rdy = false;

		if (!net) {
			return this.init_client();
		} else {
			return this.init_server(net, iframe_id);
		}
	}

	// noinspection JSPotentiallyInvalidConstructorUsage
	iframe_network.prototype = {
		on: function(event, func) {
			console.log('on()');
			if (!this.events[event]) {
				this.events[event] = [];
			}

			this.events[event].push(func);
		},
		cmd: function(cmd, data) {
			console.log('cmd()');

			if (this.iframe_rdy) {
				console.log({cmd: cmd, data: data});
				document.getElementById(this.iframe_id).contentWindow.postMessage({cmd: cmd, data: data}, '*');
			} else {
				console.log('buffer_push');
				this.buffer.push([cmd, data]);
			}
		},
		send_cmd: function(cmd, data) {
			console.log('send_cmd()');
			window.parent.postMessage({cmd: cmd, data: data}, '*');
		},
		init_client: function() {
			console.log('init_client()');

			var self = this;

			var client = {
				socket: {
					on: function(cmd, func) {
						self.on(cmd, func);
					},
					id: 'iframe'
				},
				config: {
					mode: 0
				},
				server: 'iframe',
				send_cmd: self.send_cmd
			};

			console.log(window);
			window.addEventListener('message', function(e) {
				console.log('message client');
				console.log(e.data);

				if (self.events[e.data.cmd]) {
					for (var func in self.events[e.data.cmd]) {
						// noinspection JSUnfilteredForInLoop
						self.events[e.data.cmd][func](e.data.data);
					}
				}
			});

			window.parent.postMessage({cmd: 'iframe_rdy'}, '*');

			return client;
		},
		init_server: function(client, iframe_id) {
			console.log('init_server()');

			var self = this;

			self.iframe_id = iframe_id;

			var cmds = [
				'auth.info',
				'room.msg',
				'room.info',
				'room.host',
				'room_users',
				'room.user_join',
				'room.user_leave',
				'room.data',
				'room.user_data',
				'room.user_reconnect',
				'room.user_disconnect',
				'my.info',
				'server.help',
				'server.msg',
				'silent.msg',
				'connect',
				'disconnect'
			];

			for (var cmd in cmds) {
				var command = cmds[cmd];

				client.socket.on(command, function(data) {
					// noinspection JSReferencingMutableVariableFromClosure
					self.cmd(command, data);
				});
			}

			console.log(window);
			window.addEventListener('message', function(e) {
				console.log('message server');

				if (e.data.cmd === 'iframe_rdy') {
					self.iframe_rdy = true;

					for (var data in self.buffer) {
						// noinspection JSUnfilteredForInLoop
						self.cmd.apply(self, self.buffer[data]);
					}

					self.buffer = [];
				} else {
					self.net.send_cmd(e.data.cmd, e.data.data);

					if (client.auth_info) {
						self.cmd('auth.info', client.auth_info);
					}

					if (client.room_info) {
						self.cmd('room.info', client.room_info);
					}
				}
			});

			if (client.auth_info) {
				self.cmd('auth.info', client.auth_info);
			}

			if (client.room_info) {
				self.cmd('room.info', client.room_info);
			}
		}
	};

	client_loader.init_client = function (config) {
		if (window.top !== window) {
			// noinspection JSPotentiallyInvalidConstructorUsage
			client = new iframe_network();
		} else {
			if (typeof config !== 'object') {
				return false;
			}

			var server = config.servers[config.server];

			client = {
				socket: io(server),
				config: config,
				server: server
			};

			client.socket.on('room.info', function(data) {
				client.room_info = data;
			});

			client.socket.on('auth.info', function (data) {
				client.auth_info = data;
			});

			client.send_cmd = function (cmd, data) {
				client.socket.send({cmd: cmd, data: data});
			};
		}

		client.register_iframe = function (iframe_id) {
			// noinspection JSPotentiallyInvalidConstructorUsage
			return new iframe_network(client, iframe_id);
		};

		return client;
	};

	return {
		start: client_loader.init_client
	}
}));