(function() {
	function increaseCount(host) {
		host.count += 1;
	}

	const SimpleCounter = {
		count: 0,
		render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
	};

	define('simple-counter', SimpleCounter);

	const Taskbar = {
		render: () => html`<div class="taskbar">TASKBAR</div>`
	};

	define('emuos-taskbar', Taskbar);

	const Desktop = {
		render: () => html`<div class="desktop">DESKTOP<emuos-taskbar></emuos-taskbar></div>`
	};

	define('emuos-desktop', Desktop);
})();