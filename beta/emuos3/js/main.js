const define = window.hybrids.define;
const html = window.hybrids.html;

function increaseCount(host) {
	host.count += 1;
}

const SimpleCounter = {
	count: 0,
	render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
};

define('simple-counter', SimpleCounter);