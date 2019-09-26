(function() {
	function increaseCount(host) {
		host.count += 1;
	}

	const SimpleCounter = {
		count: 0,
		render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
	};

	define('simple-counter', SimpleCounter);

	$sys.fetch('css/components/panel.css', function (e, style) {
		const Panel = {
			render: () => html`<slot name="content">Content</slot>`.style(style)
		};

		define('emuos-panel', Panel);
	});

	$sys.fetch('css/components/button.css', function (e, style) {
		const Button = {
			render: () => html`<emuos-panel><span slot="content">x</span></emuos-panel>`.style(style)
		};

		define('emuos-button', Button);
	});

	$sys.fetch('css/components/titlebar.css', function (e, style) {
		const TitleBar = {
			render: () => html`<slot id="title" name="title"><span>Title</span></slot><slot name="content">Content</slot>`.style(style)
		};

		define('emuos-titlebar', TitleBar);
	});

	$sys.fetch('css/components/window.css', function (e, style) {
		const Window = {
			render: () => html`<emuos-panel><div slot="content"><emuos-titlebar><span slot="title">New clock settings</span><emuos-button id="close" class="disabled" slot="content"></emuos-button></emuos-titlebar></div></emuos-panel>`.style(style)
		};

		define('emuos-window', Window);
	});

	$sys.fetch('css/components/taskbar.css', function (e, style) {
		const Taskbar = {
			render: () => html`TASKBAR`.style(style)
		};

		define('emuos-taskbar', Taskbar);
	});

	$sys.fetch('css/components/desktop.css', function (e, style) {
		const Desktop = {
			render: () => html`<simple-counter></simple-counter><emuos-window></emuos-window><emuos-taskbar></emuos-taskbar>`.style(style)
		};

		define('emuos-desktop', Desktop);
	});
})();