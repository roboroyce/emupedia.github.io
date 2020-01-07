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
		this.iframe_rdy = false;

		console.log(iframe_id);

		if (!net) {
			return this.init_client();
		} else {
			return this.init_server(net, iframe_id);
		}
	}

	// noinspection JSPotentiallyInvalidConstructorUsage
	iframe_network.prototype = {
		on: function(event, func) {
			if (!this.events[event]) {
				this.events[event] = [];
			}

			this.events[event].push(func);
		},
		cmd: function(cmd, data) {
			if (this.iframe_rdy) {
				this.iframe.postMessage({cmd: cmd, data: data}, '*');
			} else {
				this.buffer.push([cmd, data]);
			}
		},
		send_cmd: function(cmd, data) {
			window.parent.postMessage({cmd: cmd, data: data}, '*');
		},
		init_client: function() {
			console.log('init_client()');

			var self = this;

			var client = {
				socket: {
					on: function(cmd, func) {
						self.on(cmd, func)
					},
					id: 'iframe'
				},
				config: {
					mode: 0
				},
				server: 'iframe',
				send_cmd: self.send_cmd
			};

			window.addEventListener('message', function(e) {
				console.log('message client');

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

			if (document.getElementById(iframe_id)) {
				self.iframe = document.getElementById(iframe_id).contentWindow;
			} else {
				return;
			}

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

			window.addEventListener('message', function(e) {
				console.log('message server');
				console.log(e.data);

				if (e.data.cmd === 'iframe_rdy') {
					self.iframe_rdy = true;

					for (var data in self.buffer) {
						// noinspection JSUnfilteredForInLoop
						console.log(self.buffer[data]);
						// noinspection JSUnfilteredForInLoop
						//this.cmd(this.buffer[data]);
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
		}
	};

	client_loader.init_client = function (config) {
		if (window.top !== window) {
			console.log('i am an iframe');
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
			console.log(iframe_id);
			// noinspection JSPotentiallyInvalidConstructorUsage
			return new iframe_network(client, iframe_id);
		};

		return client;
	};

	return {
		start: client_loader.init_client
	}
}));