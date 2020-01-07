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
				send_cmd: this.send_cmd
			};

			window.addEventListener('message', function(e) {
				if (this.events[e.data.cmd]) {
					for (var func in this.events[e.data.cmd]) {
						// noinspection JSUnfilteredForInLoop
						this.events[e.data.cmd][func](e.data.data);
					}
				}
			});

			window.parent.postMessage({cmd: 'iframe_rdy'}, '*');

			return client;
		},
		init_server: function(client, iframe_id) {
			if (document.getElementById(iframe_id)) {
				this.iframe = document.getElementById(iframe_id).contentWindow;
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
					this.cmd(command, data);
				});
			}

			window.addEventListener('message', function(e) {
				if (e.data.cmd === 'iframe_rdy') {
					this.iframe_rdy = true;

					for (var data in this.buffer) {
						// noinspection JSUnfilteredForInLoop
						console.log(this.buffer[data]);
						// noinspection JSUnfilteredForInLoop
						//this.cmd(this.buffer[data]);
					}

					this.buffer = [];
				} else {
					this.net.send_cmd(e.data.cmd, e.data.data);

					if (client.auth_info) {
						this.cmd('auth.info',client.auth_info);
					}

					if (client.room_info){
						this.cmd('room.info',client.room_info);
					}
				}
			});
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