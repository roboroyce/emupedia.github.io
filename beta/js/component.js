/**
 * @license Emupedia 1.0.0 Copyright Emupedia and other contributors.
 * Released under license https://emupedia.net/LICENSE
 */

export default class Component {
	constructor(props) {
		this.props = props || {};

		var component = this;
		this.controller = function() {
			var ctrl = {};
			component.init(ctrl);
			return ctrl;
		};
		this.controller.$original = this.init;
	}

	init(ctrl) {
	}

	instance() {
		var component = this;
		var controller = new this.controller();
		controller.render = function() {
			return component.view(controller);
		};
		return controller;
	}
}