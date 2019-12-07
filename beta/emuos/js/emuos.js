// noinspection DuplicatedCode,JSUnusedLocalSymbols
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'optional!moment-timezone', 'optional!octokat', 'optional!esheep', 'optional!clippy'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function(root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					// noinspection NpmUsedModulesInstalled
					jQuery = require('jquery');
				} else {
					// noinspection NpmUsedModulesInstalled
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		factory(jQuery);
	}
} (function ($, moment, Octokat, eSheep, clippy) {
	var EmuOS = function (options) {
		var self = this;

		// noinspection JSUnusedGlobalSymbols
		self.$document	= $(document);
		self.$window	= $(window);
		self.$html		= $('html');
		self.$body		= $('body');

		self.options = {
			theme: 'theme-win3x',
			themes: {
				basic: 'theme-basic',
				win3x: 'theme-win3x',
				win9x: 'theme-win9x'
			},
			icons: [{
				name: 'EmuOS v2.0',
				title: 'Under Development',
				icon: 'favicon.ico',
				link: 'boot.html',
				width: 824,
				height: 624
			} , {
				name: 'ÐeKaÐeNcE',
				title: 'Under Development',
				icon: 'https://launcher.dekadence.ro/favicon.ico',
				link: 'https://launcher.dekadence.ro',
				width: 900,
				height: 480
			} , {
				name: 'Windows 93',
				icon: 'vfat/apps/windows93/favicon.ico',
				link: 'https://v1.windows93.net/',
				width: 960,
				height: 713
			} , {
				name: '98.js',
				icon: 'vfat/apps/98.js/favicon.ico',
				link: 'https://98.js.org/',
				width: 960,
				height: 713
			} , {
				name: 'Visual Studio Code',
				title: 'Under Development',
				icon: 'vfat/apps/vscode/favicon.ico',
				link: 'vfat/apps/vscode/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Sandbox',
				title: 'Under Development',
				icon: 'vfat/apps/sandbox/favicon.ico',
				link: 'vfat/apps/sandbox/index.html?repo=Emupedia/emupedia.github.io/contents/beta/emuos/vfat/apps/sandbox/examples?ref=master&baseurl=https://emupedia.net/beta/emuos/vfat/apps/romcenter/&capsule=%3Cbody%3E&capsule=%3C/body%3E',
				width: 900,
				height: 480
			} , {
				name: 'Microsoft Solitaire Collection',
				icon: 'https://zone.msn.com/images/v9/en-us/game/msso/Solitaire_GameLogo_350x210_v1.png',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftsolitairecollection/2019/20190729T121300_1.5.4.1_release_v0001_9af64392_msn/solitaire/index.html?hostingEnvironment=zone',
				width: 960,
				height: 540
			} , {
				name: 'Microsoft Mahjong',
				icon: 'https://zone.msn.com/images/v9/en-us/game/msmj/Mahjong_GameLogo_250_150.png',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftmahjong/2019/20190805T180800_1.0.2_release_2019_002_e5886ede_msn/game.html?hostingEnvironment=zone',
				width: 960,
				height: 540
			} , {
				name: 'Microsoft Ultimate Word Games',
				icon: 'https://zone.msn.com/images/v9/en-us/game/mscw/350x210_mscw.png',
				link: 'https://cdn.zone.msn.com/assets/games/microsoftultimatewordgames/2019/20190821T095404_1.0.5_features_2019_NameChangeToWordTwister_f7862a8_msn/word-games/game.html?game=crossword&hostingEnvironment=zone',
				width: 960,
				height: 552
			} , {
				name: 'Geometry Dash',
				icon: 'vfat/games/geometry-dash/favicon.png',
				link: 'https://scratch.mit.edu/projects/105500895/embed',
				width: 900,
				height: 600
			} , {
				name: 'slither.io',
				icon: 'vfat/games/slither.io/favicon.png',
				link: 'https://slither.io/',
				width: 900,
				height: 600
			} , {
				name: 'flappybird.io',
				icon: 'vfat/games/flappybird.io/favicon.png',
				link: 'https://flappybird.io/',
				width: 547,
				height: 800
			} , {
				name: 'Wing 2.0',
				title: 'Under Development',
				icon: 'vfat/games/wing2/favicon.ico',
				link: 'vfat/games/wing2/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Worms 2',
				title: 'Under Development',
				icon: 'vfat/games/worms2/favicon.ico',
				link: 'vfat/games/worms2/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Biolab Disaster',
				icon: 'vfat/games/biolab-disaster/favicon.png',
				link: 'vfat/games/biolab-disaster/index.html',
				width: 720,
				height: 480
			} , {
				name: 'Super Blob Blaster',
				icon: 'vfat/games/super-blob-blaster/favicon.png',
				link: 'vfat/games/super-blob-blaster/index.html',
				width: 720,
				height: 480
			} , {
				name: 'Clippy',
				icon: 'vfat/apps/clippy/favicon.png'
			} , {
				name: 'eSheep',
				icon: 'vfat/apps/esheep/favicon.png'
			} , {
				name: 'ASCIICKER',
				title: 'Under Development',
				icon: 'vfat/games/asciicker/favicon.ico',
				link: 'vfat/games/asciicker/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Spatial Audio (Demo)',
				icon: 'vfat/games/spatial-audio/favicon.ico',
				link: 'vfat/games/spatial-audio/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Voxel Space (Demo)',
				icon: 'vfat/games/voxel-space/favicon.ico',
				link: 'vfat/games/voxel-space/index.html',
				width: 900,
				height: 480
			} , {
				name: '8-bit Palette Color Cycling (Demo)',
				icon: 'vfat/apps/palette/favicon.ico',
				link: 'vfat/apps/palette/index.html',
				width: 900,
				height: 550
			} , {
				name: 'RomCenter',
				title: 'Under Development',
				icon: 'vfat/apps/romcenter/favicon.ico',
				link: 'vfat/apps/romcenter/index.html',
				width: 900,
				height: 480
			} , {
				name: 'DOSBox',
				title: 'Under Development',
				icon: 'vfat/apps/dosbox/favicon.ico',
				link: 'vfat/apps/dosbox/index.html',
				width: 640,
				height: 422
			} , {
				// name: 'Street Fighter Alpha: Warriors\' Dreams',
				name: 'Street Fighter Alpha',
				title: 'Under Development',
				icon: 'vfat/games/sfa/images/icons/' + function() {
					var icons = [
						'akuma',
						'balrog',
						'blanka',
						'chunli',
						'dhalsim',
						'evilryu',
						'ken',
						'makoto',
						'ryu',
						'sagat',
						'sakura',
						'zangief'
					];

					return icons[Math.floor(Math.random() * icons.length)];
				}() + '.ico',
				link: 'vfat/games/sfa/index.html',
				width: 1068,
				height: 576
			} , {
				name: 'Wolfenstein 3D',
				icon: 'vfat/games/wolf3d-' + (SYSTEM_FEATURE_CANVAS ? 'canvas' : '') + '/favicon.gif',
				link: 'vfat/games/wolf3d-' + (SYSTEM_FEATURE_CANVAS ? 'canvas' : '') + '/index.html',
				width: SYSTEM_FEATURE_CANVAS ? 960 : 640,
				height: SYSTEM_FEATURE_CANVAS ? 600 : 400
			} , {
				name: 'Doom 1',
				icon: 'vfat/games/doom1/favicon.gif',
				link: 'vfat/games/doom1/' + (SYSTEM_FEATURE_WEBASSEMBLY ? '/' : 'asmjs/') + 'index.html',
				width: 640,
				height: 400
			} , {
				name: 'Doom 2: Hell on Earth',
				icon: 'vfat/games/doom2/favicon.gif',
				link: 'vfat/games/doom2/' + (SYSTEM_FEATURE_WEBASSEMBLY ? '/' : 'asmjs/') + 'index.html',
				width: 640,
				height: 400
			} , {
				name: 'Doom 3',
				icon: 'vfat/games/doom3/favicon.ico',
				link: 'vfat/games/doom3/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Quake 1',
				icon: 'vfat/games/quake1/favicon.ico',
				link: 'vfat/games/quake1/' + (SYSTEM_FEATURE_ES6 && SYSTEM_FEATURE_ES7_ASYNC_AWAIT ? 'async.html' : 'index.html'),
				width: 640,
				height: 480
			} , {
				name: 'Quake 2',
				icon: 'vfat/games/quake2/favicon.ico',
				link: 'vfat/games/quake2/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Diablo 1',
				title: 'Under Development',
				icon: 'vfat/games/diablo1/favicon.ico',
				link: 'vfat/games/diablo1/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Dark Reign: The Future of War',
				title: 'Under Development',
				icon: 'vfat/games/darkreign/favicon.ico',
				link: 'vfat/games/darkreign/index.html',
				width: 640,
				height: 480
			} , {
				name: 'Command and Conquer',
				icon: 'vfat/games/command-and-conquer/favicon.ico',
				link: 'vfat/games/command-and-conquer/index.html',
				width: 640,
				height: 535
			} , {
				name: 'Minecraft',
				title: 'Under Development',
				icon: 'vfat/games/minecraft/favicon.ico',
				link: 'vfat/games/minecraft/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Webamp',
				icon: 'vfat/apps/webamp/favicon.ico',
				link: 'vfat/apps/webamp/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Notepad',
				icon: 'vfat/apps/notepad/favicon.ico',
				link: 'vfat/apps/notepad/index.html',
				width: 900,
				height: 480,
				autostart: true
			} , {
				name: 'Paint',
				icon: 'vfat/apps/paint/favicon.ico',
				link: 'vfat/apps/paint/index.html',
				width: 900,
				height: 480
			} , {
				name: 'SVG Editor',
				icon: 'vfat/apps/svg-editor/favicon.ico',
				link: 'vfat/apps/svg-editor/index.html',
				width: 900,
				height: 480
			} , {
				name: 'Discord',
				icon: 'vfat/apps/discord/favicon.ico',
				link: 'https://disweb.dashflo.net/channels/510149138491506688/604419869345185884/',
				width: 900,
				height: 480
			}]
		};

		self.options = $.extend(true, self.options, options);

		// noinspection FallThroughInSwitchStatementJS
		switch (self.options.theme) {
			case 'theme-basic':
				break;
			case 'theme-win3x':
				$('.emuos-window .window.emuos-window-content').mCustomScrollbar({
					axis: 'y',
					scrollbarPosition: 'inside',
					scrollInertia: 0,
					alwaysShowScrollbar: 0,
					keyboard: {
						enable: true
					},
					scrollButtons: {
						enable: true
					},
					mouseWheel: {
						enable: true
					},
					advanced: {
						updateOnContentResize: true,
						updateOnImageLoad: true,
						updateOnSelectorChange: true
					},
					live: true
				});
			case 'theme-win9x':
				self.options.start = [{
					name: 'Windows Update'
				} , {
					name: 'Programs'
				} , {
					name: 'Documents'
				} , {
					name: 'Settings'
				} , {
					name: 'Search'
				} , {
					name: 'Help'
				} , {
					name: 'Run...'
				} , {
					name: 'Log Off...'
				} , {
					name: 'Shut Down...'
				}];
				break;
		}

		self.$html.addClass('emuos').addClass(self.options.theme);

		if (isIE) {
			self.$html.addClass('browser-ie');
		} else if (isEdge) {
			self.$html.addClass('browser-edge');
		} else if (isChrome || isOperaBlink) {
			self.$html.addClass('browser-chrome');
		} else if (isSafari || isOperaPresto) {
			self.$html.addClass('browser-webkit');
		} else if (isFirefox || isPaleMoon || isKMeleon || isNetscape) {
			self.$html.addClass('browser-firefox');
		} else {
			self.$html.addClass('browser-other');
		}

		var start = '';

		if (typeof self.options.start !== 'undefined') {
			start = '<ul data-menu-lang="*" data-menu-type="start">';

			for (var i in self.options.start) {
				// noinspection JSUnfilteredForInLoop
				start += '<li>' + self.options.start[i]['name'] + '</li>';
			}

			start += '</ul>';
		}

		self.$body.append('<div class="desktop"></div><div class="taskbar">' + start + '</div>');

		self.$desktop = $('.desktop').first();
		self.$taskbar = $('.taskbar').first();

		for (var j in self.options.icons) {
			// noinspection JSUnfilteredForInLoop,JSDuplicatedDeclaration
			var icon_options = self.options.icons[j];

			// noinspection JSUnfilteredForInLoop
			var $icon = 	$('<a class="icon" href="javascript:"' + (icon_options['title'] ? 'data-title="' + icon_options['title'] + '"' : '') + '>' +
								'<img src="' + icon_options['icon'] + '" alt="' + icon_options['name'] + '" />' +
								'<span>' + icon_options['name'] + '</span>' +
							'</a>');

			// noinspection JSUnfilteredForInLoop
			$icon.data('name', icon_options['name']);

			// noinspection JSUnfilteredForInLoop
			$icon.data('icon', icon_options['icon']);

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['link'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('link', icon_options['link']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['width'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('width', icon_options['width']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['height'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.data('height', icon_options['height']);
			}

			// noinspection JSUnfilteredForInLoop
			if (typeof icon_options['autostart'] !== 'undefined') {
				// noinspection JSUnfilteredForInLoop
				$icon.attr('data-autostart', icon_options['autostart'] ? 'true' : 'false').data('autostart', icon_options['autostart']);
			}

			// noinspection JSUnfilteredForInLoop
			self.$desktop.append($icon);

			$icon.off('click').on('click', function(e) {
				e.preventDefault();
			}).off('dblclick').on('dblclick', function() {
				// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
				if (typeof $(this).data('link') !== 'undefined') {
					// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
					self.iframe({
						title: $(this).data('name'),
						icon :$(this).data('icon'),
						src: $(this).data('link'),
						width: $(this).data('width'),
						height: $(this).data('height')
					});
				} else {
					switch ($(this).data('name')) {
						case 'eSheep':
							if (typeof eSheep !== 'undefined') {
								if (typeof eSheep.prototype.Start === 'function') {
									var pets = ['esheep64', 'gsheep-green', 'neko', 'pingus', 'ssj-goku'];
									var pet = pets[~~(Math.random() * pets.length)];
									var path = 'vfat/apps/esheep/assets/' + pet + '/animations.xml';

									if (!path) break;

									new eSheep({
										allowPets: 'all',
										allowPopup: 'no'
									}).Start(path);
								}
							}
							break;
						case 'Clippy':
							var agents = ['Bonzi', 'Clippy', 'F1', 'Genie', 'Genius', 'Links', 'Merlin', 'Peedy', 'Rocky', 'Rover'];

							var phrases = [
								'How can i help you?',
								'Nice day!',
								'Glad to meet you.',
								'At your service',
								'Hello'
							];

							var agentName = agents[~~(Math.random() * agents.length)];

							if (!agentName) break;

							if (typeof clippy !== 'undefined') {
								if (typeof  clippy.load === 'function') {
									clippy.load(agentName, function(agent) {
										window[agentName] = agent;

										var randPos = function () {
											return .2 + Math.random() * .6;
										};

										var move = function() {
											agent.moveTo($(document).width() * randPos(), $(document).height() * randPos());
										};

										move();

										agent.show();

										// Speak on click and start
										var speak = function() {
											agent.speak('I am ' + agentName + ', ' + phrases[~~(Math.random() * phrases.length)]);
											agent.animate();
										};

										$(agent._el).click(function() {
											speak();
										});

										speak();

										// Animate randomly
										setInterval(function() {
											agent.animate();
										}, 3000 + (Math.random() * 4000));

										// Move randomly
										/*setInterval(function() {
											move();
										}, 3000 + (Math.random() * 4000));*/
									}, undefined, 'vfat/apps/clippy/assets/');
								}
							}
							break;
						case 'Webamp Classic':
							// noinspection JSUnresolvedFunction
							var webamp_content = self.options.apps.webamp.render();

							// noinspection JSUnfilteredForInLoop,JSReferencingMutableVariableFromClosure
							self.widget({
								title: $(this).data('name'),
								icon :$(this).data('icon'),
								content: webamp_content
							});

							// noinspection JSUnresolvedFunction
							self.options.apps.webamp.events('.emuos-taskbar-windows-containment');
							break;
						default:
					}
				}
			});
		}

		// noinspection JSUnresolvedFunction
		self.$taskbar.taskbar({
			//windowsContainment: 'viewport',
			windowsContainment: 'visible',
			horizontalStick: 'bottom left',
			horizontalWidth: '100%',
			draggable: true,
			resizable: true,
			resizableHandleOffset: 1,
			minimizeAll: true,
			languageSelect: false,
			toggleFullscreen: true,
			clock: true
		});

		// noinspection JSUnresolvedFunction
		self.$desktop.desktop({
			iconClass: '.icon',
			parent: '.emuos-taskbar-windows-containment'
		});

		if (typeof moment === 'function') {
			if (moment().month() === 11) {
				var xmas =	'<div class="snow" aria-hidden="true">' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">❆</div></div>';
				if (moment().day() >= 23 && moment().day() <= 25) {
					xmas +=		'<div class="snowflakes"><div class="snowflake">🎄</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎄</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎁</div></div>' +
								'<div class="snowflakes"><div class="snowflake">⛄</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎁</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎅</div></div>' +
								'<div class="snowflakes"><div class="snowflake">🎁</div></div>' +
								'<div class="snowflakes"><div class="snowflake">⛄</div></div>';
				}
				xmas +=		'</div>';

				self.$desktop.prepend(xmas);
			}
		}

		self.$desktop.find('[data-autostart="true"]').first().trigger('dblclick');

		self.$html.contextmenu({
			delegate: 'body, .emuos-taskbar',
			menu: [{
				title: 'Refresh',
				cmd: 'refresh',
				uiIcon: 'ui-icon-copy'
			} , {
				title: '----'
			} , {
				title: 'Themes',
				children: [{
					title: 'Basic',
					cmd: 'basic',
					uiIcon: 'ui-icon-clipboard'
				} , {
					title: 'Windows 3.x',
					cmd: 'win3x',
					uiIcon: 'ui-icon-scissors'
				} , {
					title: 'Windows 9x',
					cmd: 'win9x',
					uiIcon: 'ui-icon-clipboard'
				}]
			}],
			select: function(e, ui) {
				switch (ui.cmd) {
					case 'refresh':
						window.location = window.location;
						break;
					case 'basic':
						self.$html.removeClass('theme-win3x theme-win9x').addClass('theme-basic');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win3x':
						self.$html.removeClass('theme-basic theme-win9x').addClass('theme-win3x');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar({
							axis: 'y',
							scrollbarPosition: 'inside',
							scrollInertia: 0,
							alwaysShowScrollbar: 0,
							keyboard: {
								enable: true
							},
							scrollButtons: {
								enable: true
							},
							mouseWheel: {
								enable: true
							},
							advanced: {
								updateOnContentResize: true,
								updateOnImageLoad: true,
								updateOnSelectorChange: true
							},
							live: true
						});
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win9x':
						self.$html.removeClass('theme-basic theme-win3x').addClass('theme-win9x');
						// noinspection JSJQueryEfficiency
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
				}

				return true;
			}
		});

		self.$html.on('mousemove', function (e) {
			var parentOffset = $(e.target).offset();
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;
			self.$html.get(0).style.setProperty('--mouse-x', relX + 'px');
			self.$html.get(0).style.setProperty('--mouse-y', relY + 'px');
		});
	};

	EmuOS.prototype.widget = function (options) {
		var self = this;

		var title	= typeof options.title		!== 'undefined'	? options.title		: '';
		// var icon	= typeof options.icon		!== 'undefined'	? options.icon		: '';
		var content	= typeof options.content	!== 'undefined'	? options.content	: '';

		var widget	= $('<div class="widget" data-title="'+ title +'">' + content + '</div>');

		self.$body.append(widget);

		return widget;
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.window = function (options) {
		var self = this;

		var title	= typeof options.title		!== 'undefined'	? options.title		: '';
		var icon	= typeof options.icon		!== 'undefined'	? options.icon		: '';
		var content	= typeof options.content	!== 'undefined'	? options.content	: '';

		var window	= $('<div class="window" data-title="'+ title +'">' + content + '</div>');

		self.$body.append(window);

		// noinspection JSValidateTypes
		window.window({
			icons: {
				main: self.$html.hasClass('theme-basic') || self.$html.hasClass('theme-win9x') ? (icon !== '' ? icon : null) : ''
			}
		});

		$('.emuos-window').contextmenu({
			autoTrigger: false,
			delegate: '.emuos-window-icon',
			menu: [{
				title: 'Restore',
				cmd: 'restore',
				disabled: true
			} , {
				title: 'Move',
				cmd: 'move'
			} , {
				title: 'Size',
				cmd: 'size'
			} , {
				title: 'Minimize',
				cmd: 'minimize'
			} , {
				title: 'Maximize',
				cmd: 'maximize'
			} , {
				title: '----'
			} , {
				title: 'Close',
				cmd: 'close'
			} , {
				title: '----'
			} , {
				title: 'Next',
				cmd: 'next'
			}],
			select: function(e, ui) {
				// noinspection JSRedundantSwitchStatement
				switch (ui.cmd) {
					case 'close':
						// noinspection JSValidateTypes,JSUnresolvedFunction
						$(e.target).children('.window, .iframe').first().window('close');
						break;
				}

				return true;
			},
			close: function (e) {
				console.log(e);
			}
		});

		$('.emuos-window-icon').on('click', function(e) {
			// noinspection JSUnresolvedFunction
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return window.window('instance');
	};

	// noinspection DuplicatedCode
	EmuOS.prototype.iframe = function (options) {
		var self = this;

		var title		= typeof options.title		!== 'undefined' ? options.title		: '';
		var icon		= typeof options.icon		!== 'undefined' ? options.icon		: '';
		var src			= typeof options.src		!== 'undefined' ? options.src		: '';
		var width		= typeof options.width		!== 'undefined' ? options.width		: 0;
		var height		= typeof options.height		!== 'undefined' ? options.height	: 0;

		// noinspection HtmlDeprecatedAttribute
		var window	= $('<div class="iframe" data-title="'+ title +'"><iframe src="' + src + '" onload="this.focus();this.contentWindow.focus();" frameborder="0" allowFullscreen="true" allowTransparency="true" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>');

		self.$body.append(window);
		self.$body.find('iframe').first().focus();

		// noinspection JSValidateTypes
		window.window({
			embeddedContent: true,
			width: width !== 0 ? width : 640,
			height: height !== 0 ? height : 400,
			position: {
				my: 'center',
				at: 'center center-' + (height/2 + 14),
				of: this.$window.get(0),
				collision: 'fit'
			},
			icons: {
				main: this.$html.hasClass('theme-basic') || this.$html.hasClass('theme-win9x') ? (icon !== '' ? icon : null) : ''
			}
		});

		$('.emuos-window').contextmenu({
			autoTrigger: false,
			delegate: '.emuos-window-icon',
			menu: [{
				title: 'Restore',
				cmd: 'restore',
				disabled: true
			} , {
				title: 'Move',
				cmd: 'move'
			} , {
				title: 'Size',
				cmd: 'size'
			} , {
				title: 'Minimize',
				cmd: 'minimize'
			} , {
				title: 'Maximize',
				cmd: 'maximize'
			} , {
				title: '----'
			} , {
				title: 'Close',
				cmd: 'close'
			} , {
				title: '----'
			} , {
				title: 'Next',
				cmd: 'next'
			}],
			select: function(e, ui) {
				// noinspection JSRedundantSwitchStatement
				switch (ui.cmd) {
					case 'close':
						// noinspection JSUnresolvedFunction
						$(e.target).children('.window, .iframe').first().window('close');
						break;
				}

				return true;
			},
			close: function (e) {
				console.log(e);
			}
		});

		$('.emuos-window-icon').on('click', function(e) {
			// noinspection JSUnresolvedFunction
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return window.window('instance');
	};

	return EmuOS;
}));