// noinspection DuplicatedCode
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'json!config/emoticons.json', 'twemoji', 'simplestorage', 'network', 'fingerprint'], factory);
	}
} (function ($, emoticons, twemoji, simplestorage, network, Fingerprint) {
	// noinspection DuplicatedCode
	$(function() {
		window['NETWORK_CONNECTION'] = network.start({
			servers: ['https://ws.emupedia.net/'],
			server: 0,
			mode: 0
		});

		var $body = $('body');
		var net = window['NETWORK_CONNECTION'];
		var fingerprint = new Fingerprint().get();
		var search = Object.keys(emoticons.mapping);
		var replace = Object.values(emoticons.mapping);

		net.badge = 0;
		net.colors = ['rgba(180, 173, 173, 0.973)', '#395fa4', '#159904', 'rgba(128, 128, 128, 0.35)'];

		net.str_replace = function(search, replace, subject, countObj) {
			var i = 0;
			var j = 0;
			var temp = '';
			var repl = '';
			var sl = 0;
			var fl = 0;
			var f = [].concat(search);
			var r = [].concat(replace);
			var s = subject;
			var ra = Object.prototype.toString.call(r) === '[object Array]';
			var sa = Object.prototype.toString.call(s) === '[object Array]';
			s = [].concat(s);

			var $global = (typeof window !== 'undefined' ? window : global);
			$global.$locutus = $global.$locutus || {};
			var $locutus = $global.$locutus;
			$locutus.php = $locutus.php || {};

			if (typeof (search) === 'object' && typeof (replace) === 'string') {
				temp = replace;
				replace = [];

				for (i = 0; i < search.length; i += 1) {
					replace[i] = temp;
				}

				temp = '';
				r = [].concat(replace);
				ra = Object.prototype.toString.call(r) === '[object Array]';
			}

			if (typeof countObj !== 'undefined') {
				countObj.value = 0;
			}

			for (i = 0, sl = s.length; i < sl; i++) {
				if (s[i] === '') {
					continue;
				}

				for (j = 0, fl = f.length; j < fl; j++) {
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);

					if (typeof countObj !== 'undefined') {
						countObj.value += ((temp.split(f[j])).length - 1);
					}
				}
			}

			return sa ? s : s[0];
		};

		net.normalize = function(str) {
			return twemoji.parse(net.str_replace(search, replace, $('<div />').text(str.replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\u0483-\u0486\u05C7\u0610-\u061A\u0656-\u065F\u0670\u06D6-\u06ED\u0711\u0730-\u073F\u0743-\u074A\u0F18-\u0F19\u0F35\u0F37\u0F72-\u0F73\u0F7A-\u0F81\u0F84\u0e00-\u0eff\uFC5E-\uFC62]{2,}/gi, '')).html()));
		};

		// noinspection DuplicatedCode
		net.log = function (txt, color) {
			if (typeof color === 'undefined') {
				color = 0;
			}

			if (!net.output_div.length) {
				if (net.config.mode === 1) {
					console.log(txt);
				}

				return false;
			}

			var colors = net.colors;

			color = typeof colors[color] !== 'undefined' ? 'style="color:' + colors[color] + '"' : '';

			if (typeof txt === 'object') {
				// noinspection HtmlDeprecatedTag
				txt = '<br><xmp>' + JSON.stringify(txt, null, 2) + '</xmp>';
			}

			var d = new Date();

			var time_stamp = [
				'<span style="color:' + colors[1] + ';">[',
				('0' + d.getHours()).slice(-2),
				':',
				('0' + d.getMinutes()).slice(-2),
				':',
				('0' + d.getSeconds()).slice(-2),
				']&nbsp;</span>'
			].join('');

			net.output_div.append('<div ' + color + '>' + time_stamp + txt + '</div>');
			net.output_div.get(0).scrollTop = net.output_div.get(0).scrollHeight;
		};

		net.show = function() {
			net.console.slideDown(300);
			net.text_input.focus();
			net.badge = 0;
			var $icon = $body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
			$icon.attr('class', 'icon badge');
		};

		net.hide = function() {
			net.console.slideUp(300);
		};

		net.toggle = function() {
			if (net.console.is(':hidden')) {
				net.badge = 0;
				var $icon = $body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
				$icon.attr('class', 'icon badge');
			}

			net.console.slideToggle(300);
			net.text_input.focus();
		};

		// noinspection DuplicatedCode
		net.send_input = function() {
			var timestamp = Math.floor(Date.now() / 1000);

			if (!net.last_send) {
				net.last_send = 0;
			}

			if (!net.spam_cap) {
				net.spam_cap = 0;
			}

			if (timestamp - net.last_send < 2) {
				net.spam_cap++;
			} else {
				if (net.spam_cap > 10) {
					if (timestamp - net.last_send < 10) {
						return false;
					}
				}

				net.spam_cap = 0;
			}

			if (net.spam_cap > 10) {
				return false;
			}

			net.last_send = timestamp;

			var msg = net.text_input.val();

			if (msg.trim() === '') {
				return false;
			}

			if (msg.charAt(0) === '/') {
				var data = {
					cmd: '',
					data: ''
				};

				msg = msg.substr(1).split(' ');
				data.cmd = msg.shift();
				data.data = msg.join(' ');

				while (data.data.charAt(0) === ' ') {
					data.data = data.data.substr(1);
				}

				if ((data.data.charAt(0) === '[') || (data.data.charAt(0) === '{')) {
					try {
						eval('var json_data=' + data.data);
					} catch (e) {
						var json_data = data.data;
					}

					data.data = json_data;
				}

				net.send_cmd(data.cmd, data.data);
			} else {
				net.send_cmd('room_msg', msg);
			}

			net.text_input.val('');
		};

		// noinspection DuplicatedCode
		net.socket.on('connect', function(data) {
			var nickname = typeof simplestorage.get('nickname') !== 'undefined' ? simplestorage.get('nickname') : 'EMU-' + fingerprint;
			var server = typeof data !== 'undefined' ? data.server : net.server;
			// noinspection JSUnresolvedVariable
			var socket_id = typeof data !== 'undefined' ? data.socket_id : net.socket.id;

			net.send_cmd('auth', {user: nickname, room: 'Emupedia'});
			net.chat_id = '<span style="color: #2c487e;">[' + socket_id + '] </span>';
			net.log('[connected][' + server + '] [id][' + socket_id + ']', 0);

			if (~nickname.indexOf('EMU-')) {
				net.log('Type /nick <nickname> to set your name', 0);
			}
		});

		net.socket.on('disconnect', function() {
			net.log('[disconnected][' + net.server + ']', 0);
		});

		net.socket.on('auth.info', function (data) {
			simplestorage.set('nickname', data.info.user);
		});

		// noinspection DuplicatedCode
		net.socket.on('room.info', function (data) {
			var r_users = '';

			for (var n in data.users) {
				var color = (n !== data.me) ? net.colors[3] : net.colors[1];
				// noinspection JSUnfilteredForInLoop
				var name = net.normalize(n);
				// noinspection JSUnfilteredForInLoop
				r_users += '<div id="room_user_' + n + '" style="color: ' + color + '; overflow: hidden;">' + name + '</div>';
			}

			net.text_input.attr('placeholder', 'Press "`" (tilda) to Show / Hide chat. You are Typing as "' + data.me + '" on "' + data.name + '"');
			net.client_room_users.html(r_users);
			net.client_room.html(data.name);
		});

		net.socket.on('room.user_join', function (data) {
			var name = net.normalize(data.user);
			net.client_room_users.append('<div id="room_user_' + data.user + '" style="color: ' + net.colors[3] + ';">' + name + '</div>');
		});

		net.socket.on('room.user_leave', function (data) {
			$('#room_user_' + data.user).remove();
		});

		net.socket.on('room.msg', function (data) {
			var $icon = $body.find('.emuos-desktop-icon span:contains("EmuChat")').siblings('i.icon').first();
			var badge = '';

			if (net.console.is(':hidden') && $body.find('[data-title="EmuChat"]').length === 0) {
				net.badge++;

				if (net.badge >= 10) {
					badge = '-9-plus';
				} else {
					badge = '-' + net.badge;
				}

				$icon.attr('class', 'icon badge badge' + badge);
			} else {
				net.badge = 0;
				$icon.attr('class', 'icon badge');
			}

			net.log('<span style="color: ' + net.colors[3] + '; overflow: hidden;">[' + net.normalize(data.user) + '] </span>' + net.normalize(data.msg));
		});

		net.socket.on('server.msg', function (data) {
			net.log(data, 2);
		});

		net.socket.on('silent.msg', function (data) {
			net.log(data, 1);
		});

		// noinspection DuplicatedCode
		net.socket.on('server.help', function (data) {
			var msg = '';

			for (var n in data) {
				// noinspection JSUnfilteredForInLoop
				msg += '<a class="do_cmd" style="cursor: pointer; color: ' + net.colors[2] + ';">/' + data[n] + ' </a> ';
			}

			net.log(msg);

			$('.do_cmd').off('click').on('click', function() {
				net.text_input.val($(this).html());
				net.text_input.focus();
			});
		});

		var network_ui = '<div id="client_console" class="client_decoration">' +
							'<div id="client_output" class="client_decoration client_left"></div>' +
							'<div class="client_decoration client_right">' +
								'<div id="client_room" class="client_decoration"></div>' +
								'<div id="client_room_users" class="client_decoration"></div>' +
							'</div>' +
							'<div id="client_input" class="client_decoration">' +
								'<button id="client_emoticons">😀</button><input id="client_command" type="text" spellcheck="false" autocomplete="off" /><button id="client_command_send">Send</button>' +
							'</div>' +
						'</div>';

		$body.append(network_ui);
		$body.keydown(function (e) {
			// noinspection JSRedundantSwitchStatement
			switch (e.keyCode) {
				case 192:
					net.toggle();
					return false;
			}
		});
		net.console = $('#client_console');
		net.text_input = $('#client_command');
		net.text_input_button = $('#client_command_send');
		net.output_div = $('#client_output');
		net.client_room_users = $('#client_room_users');
		net.client_room = $('#client_room');
		net.text_input.off('keypress').on('keypress', function (e) {
			if (e.which === 13) {
				net.send_input();
			}
		});
		net.text_input_button.off('click').on('click', function() {
			net.send_input();
		});
	});
}));