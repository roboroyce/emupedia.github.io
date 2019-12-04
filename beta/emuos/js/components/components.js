(function() {
	function increaseCount(host) {
		host.count += 1;
	}

	const SimpleCounter = {
		count: 0,
		render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
	};

	define('simple-counter', SimpleCounter);

	$sys.api.fetch('css/components/panel.css', function (e, style) {
		const Panel = {
			render: () => html`
				<slot name="content">Content</slot>
			`.style(style)
		};

		define('emuos-panel', Panel);
	});

	$sys.api.fetch('css/components/button.css', function (e, style) {
		const Button = {
			render: () => html`
				<emuos-panel slot="content">x</emuos-panel>
			`.style(style)
		};

		define('emuos-button', Button);
	});

	$sys.api.fetch('css/components/titlebar.css', function (e, style) {
		const TitleBar = {
			render: () => html`
				<slot name="title">Title</slot>
				<slot name="content">Content</slot>
			`.style(style)
		};

		define('emuos-titlebar', TitleBar);
	});

	$sys.api.fetch('css/components/window.css', function (e, style) {
		const Window = {
			render: () => html`
				<emuos-panel>
					<div slot="content">
						<emuos-titlebar>
							<span slot="title">New clock settings</span>
							<emuos-button id="close" class="disabled">x</emuos-button>
						</emuos-titlebar>
					</div>
				</emuos-panel>
			`.style(style)
		};

		define('emuos-window', Window);
	});

	$sys.api.fetch('css/components/taskbar.css', function (e, style) {
		const Taskbar = {
			render: () => html`
				<emuos-button id="start">Start</emuos-button>
			`.style(style)
		};

		define('emuos-taskbar', Taskbar);
	});

	$sys.api.fetch('css/components/desktop.css', function (e, style) {
		const Desktop = {
			render: () => html`
				<simple-counter></simple-counter>
				<emuos-window></emuos-window>
				<emuos-taskbar></emuos-taskbar>
			`.style(style)
		};

		define('emuos-desktop', Desktop);
	});
})();