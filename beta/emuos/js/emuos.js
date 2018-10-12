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
	var EmuOS = function (options) {
		var self = this;

		// noinspection JSUnusedGlobalSymbols
		this.$document	= $(document);
		this.$window	= $(window);
		this.$html		= $('html');
		this.$body		= $('body');

		this.options = {
			theme: 'theme-win3x',
			themes: {
				basic: 'theme-basic',
				win3x: 'theme-win3x',
				win9x: 'theme-win9x'
			},
			icons: [{
				name: 'Visual Studio Code',
				icon: 'apps/monaco-editor/favicon.ico',
				link: ''
			} , {
				name: 'Wing 2.0',
				icon: 'apps/wing/favicon.ico',
				link: ''
			}],
			start: [{
				name: 'Item'
			}]
		};

		$.extend(this.options, options);

		// noinspection FallThroughInSwitchStatementJS
		switch (this.options.theme) {
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
				if (!(isIE || isEdge)) {
					// TODO: Performance problem on window drag and resize caused by custom cursors
					importStyles('css/themes/win3x/cursors.css');
					importStyles('css/themes/win9x/cursors.css');
				}
				break;
		}

		this.$html.addClass('emuos').addClass(this.options.theme);

		if (isIE) {
			this.$html.addClass('browser-ie');
		} else if (isEdge) {
			this.$html.addClass('browser-edge');
		} else if (isChrome || isOperaBlink) {
			this.$html.addClass('browser-chrome');
		} else if (isSafari || isOperaPresto) {
			this.$html.addClass('browser-webkit');
		} else if (isFirefox || isPaleMoon || isKMeleon || isNetscape) {
			this.$html.addClass('browser-firefox');
		} else {
			this.$html.addClass('browser-other');
		}

		var start = '';

		if (typeof this.options.start !== 'undefined') {
			start = '<ul data-menu-lang="*" data-menu-type="start">';

			for (var i in this.options.start) {
				// noinspection JSUnfilteredForInLoop
				start += '<li>' + this.options.start[i]['name'] + '</li>';
			}

			start += '</ul>';
		}

		this.$body.append('<div class="desktop"></div><div class="taskbar">' + start + '</div>');

		this.$desktop = $('.desktop').first();
		this.$taskbar = $('.taskbar').first();

		for (var j in this.options.icons) {
			// noinspection JSUnfilteredForInLoop
			this.$desktop.append(
				'<a class="icon" href="' + (this.options.icons[j]['link'] !== '' ? this.options.icons[j]['link'] : 'javascript:') + '">' +
					'<img src="' + this.options.icons[j]['icon'] + '" alt="' + this.options.icons[j]['name'] + '" />' +
					'<span>' + this.options.icons[j]['name'] + '</span>' +
				'</a>')
		}

		// noinspection JSUnresolvedFunction
		this.$taskbar.taskbar({
			draggable: true,
			resizable: true,
			resizableHandleOffset: 1,
			minimizeAll: false,
			languageSelect: false,
			toggleFullscreen: true,
			clock: true
		});

		// noinspection JSUnresolvedFunction
		this.$desktop.desktop({
			iconClass: '.icon',
			parent: '.emuos-taskbar-windows-containment'
		});

		this.$html.contextmenu({
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
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 0).taskbar('instance')._refresh();
						break;
					case 'win3x':
						self.$html.removeClass('theme-basic theme-win9x').addClass('theme-win3x');
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
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
						$('.emuos-window .window.emuos-window-content').mCustomScrollbar('destroy');
						self.$taskbar.taskbar('option', 'resizableHandleOffset', 1).taskbar('instance')._refresh();
						break;
				}

				return true;
			}
		});
	};

	EmuOS.prototype.window = function (options) {
		var title	= typeof options.title		!== 'undefined'	? options.title		: '';
		var icon	= typeof options.icon		!== 'undefined'	? options.icon		: '';
		var content	= typeof options.content	!== 'undefined'	? options.content	: '';

		this.$body.append('<div class="window" title="'+ title +'">' + content + '</div>');

		// noinspection JSUnresolvedFunction
		var window = $('.window').window({
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
				switch (ui.cmd) {
					case 'close':
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
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return window.window('instance');
	};

	EmuOS.prototype.iframe = function (options) {
		var title	= typeof options.title	!== 'undefined'	? options.title	: '';
		var icon	= typeof options.icon	!== 'undefined'	? options.icon	: '';
		var src		= typeof options.src	!== 'undefined'	? options.src	: '';

		this.$body.append('<div class="iframe" title="'+ title +'"><iframe src="' + src + '" allowfullscreen></iframe></div>');

		// noinspection JSUnresolvedFunction
		var window = $('.iframe').window({
			embeddedContent: true,
			width: 640,
			height: 480,
			position: {
				my: 'center',
				at: 'center center-20%',
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
				switch (ui.cmd) {
					case 'close':
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
			$(this).parents('.emuos-window').first().contextmenu('open', $(this));
			e.preventDefault();
		});

		// noinspection JSValidateTypes
		return window.window('instance');
	};

	return EmuOS;
}));