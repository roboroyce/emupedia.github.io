const define = hybrids.define;
const html = hybrids.html;

function increaseCount(host) {
	host.count += 1;
}

const SimpleCounter = {
	count: 0,
	render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
};

define('simple-counter', SimpleCounter);

const Icon = {
	render: () => html`<a class="icon emuos-desktop-icon ui-sortable-handle ui-selectee" href="javascript:"><img src="../../vfat/apps/discord/favicon.png" alt="Discord"><span>Discord</span></a>`
};

define('emuos-desktop-icon', Icon);

const Window = {
	render: () => html`<div class="window"></div>`
};

define('emuos-window', Window);

const Taskbar = {
	render: () => html`<div class="taskbar"></div>`
};

define('emuos-taskbar', Taskbar);

const Desktop = {
	render: () => html`<div class="desktop" ><emuos-taskbar></emuos-taskbar></div>`
};

define('emuos-desktop', Desktop);