;(function ($, undefined) {
	'use strict';
	$.widget('emuos.desktop', {
		version: '@emuos-main-version',
		_cnst: {
			dataPrefix: 'emuos-',
			eventPrefix: 'desktop',
			naturalName: 'EmuOS',
			consolePrefix: 'EmuOS message',
			missingTranslation: 'undefined'
		},
		classes: {
			desktop: 'emuos-desktop',
			desktopPrefix: 'emuos-desktop-',
			desktopContainter: 'emuos-desktop-container',
			droppableContainer: 'emuos-desktop-droppable-container',
			droppable: 'emuos-desktop-droppable',
			draggableHelper: 'emuos-desktop-helper',
			draggableDragging: 'emuos-desktop-dragging',
			droppableOver: 'emuos-desktop-droppable-over',
			droppablePending: 'emuos-desktop-droppable-pending',
			desktopIcon: 'emuos-desktop-icon',
			desktopIconContent: 'emuos-icon-content',

			// jQuery UI classes
			uiMenu: 'ui-menu',
			uiWidgetContent: 'ui-widget-content',
			uiCornerPrefix: 'ui-corner-',
			uiCornerTl: 'ui-corner-tl',
			uiCornerTr: 'ui-corner-tr',
			uiCornerBl: 'ui-corner-bl',
			uiCornerBr: 'ui-corner-br',
			uiDatepickerHeader: 'ui-datepicker-header',
			uiDraggable: 'ui-draggable',
			uiDroppable: 'ui-droppable',
			uiDraggableDragging: 'ui-draggable-dragging',
			uiResizable: 'ui-resizable',
			uiResizableResizing: 'ui-resizable-resizing',
			uiResizableHandle: 'ui-resizable-handle',
			uiButton: 'ui-button',
			uiButtonText: 'ui-button-text',
			uiButtonIconPrimary: 'ui-button-icon-primary',
			uiMenuItem: 'ui-menu-item',
			uiDatepicker: 'ui-datepicker',
			uiDatepickerDaysCellOver: 'ui-datepicker-days-cell-over',
			uiStateActive: 'ui-state-active',
			uiStateFocus: 'ui-state-focus',
			uiStateHover: 'ui-state-hover',
			uiStateDisabled: 'ui-state-disabled',
			uiStateDefault: 'ui-state-default',
			uiSortable: 'ui-sortable',
			uiTooltip: 'ui-tooltip',
			uiDialogContent: 'ui-dialog-content',
			uiDialogTitlebar: 'ui-dialog-titlebar',
			uiHasDatepicker: 'hasDatepicker',
			uiIcon: 'ui-icon',
			uiIconBlank: 'ui-icon-blank'
		},
		_create: function () {
			this.$elem = this.element;

			if (!this.$elem.parents().length) {
				this.$elem.appendTo('body');
			}

			this.$elem.addClass('emuos-desktop');

			// the basic classes, widget ID, and a unique id instante storage
			this.$elem
				.addClass(this.classes.desktop + ' ' + this.classes.uiWidgetContent)
				.attr('data-desktop-uuid', this.uuid)
				.uniqueId()
				.data(this._cnst.dataPrefix + 'desktop', this);

			this.$elem.selectable({
				autoRefresh: true,
				filter: '.' + this.classes.desktopIcon,
				tolerance: 'touch',
				delay: 30,
				distance: 30
			});
		}
	});
})(jQuery);