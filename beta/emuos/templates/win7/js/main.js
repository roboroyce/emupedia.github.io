$(function() {
	var $body = $('body');


	$body.html(
		'\t\t<div class="emuos-desktop">DESKTOP</div>\n' +
		'\t\t<div class="emuos-window blur">\n' +
		'\t\t\t<div class="emuos-window-container"></div>\n' +
		'\t\t</div>\n' +
		'\t\t<div class="emuos-taskbar-bg blur"></div>\n' +
		'\t\t<div class="emuos-taskbar">\n' +
		'\t\t\t<div class="emuos-taskbar-container">\n' +
		'\t\t\t\t<div class="emuos-start"><button class="emuos-start-button"></button></div>\n' +
		'\t\t\t\t<div class="emuos-apps">APPS</div>\n' +
		'\t\t\t\t<div class="emuos-tray">TRAY</div>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n'
	);

	$body.find('.emuos-window').first().draggable({
		iframeFix: true,
		scroll: false
		// handle: '.chat-window-title',
		// cancel: 'a',
		// containment: 'document, body'
		// stack: {
		// 	group: '#window',
		// 	min: 1
		// }
	}).resizable({
		// containment: 'document, body',
		// maxWidth: 640,
		// maxHeight: 480,
		minWidth: 200,
		minHeight: 120,
		handles: 'n,e,s,w,se,sw,ne,nw'
	});

});