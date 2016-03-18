import Component from './component';

class Widget extends Component {
	init(ctrl) {
		var props = this.props;

		ctrl.counter = props.initialValue;

		ctrl.increment = function() {
			ctrl.counter++;
		};
		ctrl.reset = function() {
			ctrl.counter = props.initialValue;
		};
	}
	view(ctrl) {
		return m('div', [
			m('h1', 'This widget is set up for: '+this.props.name),
			m('p', 'Counter: '+ctrl.counter),
			m('button', {onclick: ctrl.increment}, 'Increment Counter')
		]);
	}
}

class IndexPage extends Component {
	init(ctrl) {
		console.log('we got here');
		ctrl.widget = new Widget({name: 'foo', initialValue: 2}).instance()
	}
	view(ctrl) {
		return m('div', [
			ctrl.widget.render(),
			m('button', {onclick: ctrl.widget.reset}, 'Reset Counter')
		]);
	}
}

m.mount(document.body, new IndexPage());