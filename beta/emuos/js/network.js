// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['socketio'], factory);
	}
} (function (io) {
	var client_loader = {};
	var client = {};

	client_loader.init_client = function (config) {
		if (typeof config !== 'object') {
			return false;
		}

		var server = config.servers[config.server];

		client = {
			socket: io(server),
			config: config,
			server: server
		};

		client.send_cmd = function (cmd, data) {
			client.socket.send({cmd: cmd, data: data});
		};

		return client;
	};

	return {
		start: client_loader.init_client
	}
}));