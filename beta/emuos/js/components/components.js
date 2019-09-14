(function() {
	function increaseCount(host) {
		host.count += 1;
	}

	const SimpleCounter = {
		count: 0,
		render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
	};

	define('simple-counter', SimpleCounter);

	$sys.ajax('css/components/taskbar.css', function (e, style) {
		const Taskbar = {
			render: () => html`TASKBAR`.style(style)
		};

		define('emuos-taskbar', Taskbar);
	});

	$sys.ajax('css/components/desktop.css', function (e, style) {
		const Desktop = {
			render: () => html`<emuos-taskbar></emuos-taskbar>`.style(style)
		};

		define('emuos-desktop', Desktop);
	});
})();