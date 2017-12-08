/**
 * @license Emupedia 1.0.0 Copyright Emupedia and other contributors.
 * Released under license https://emupedia.net/LICENSE
 */

import Mithril from 'mithril';
import Component from 'es6!component';

var m = Mithril;

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
			m('h1', 'This widget is set up for: ' + this.props.name),
			m('p', 'Counter: ' + ctrl.counter),
			m('button', {onclick: ctrl.increment}, 'Increment Counter')
		]);
	}
}

export default class IndexPage extends Component {
	init(ctrl) {
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