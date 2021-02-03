// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	global['DROPBOX_TOKEN'] = atob('OXdheVAzQmJnb29BQUFBQUFBQUFBVWRFeFN5S01HYkZ0OEoxNTBIT254N01KUXNadW0xQ1NoSXJTV3U4V0ZRWQ==');

	var externallyFramed;

	try {
		externallyFramed = global.top.location.host !== global.location.host;
	} catch (e) {
		externallyFramed = true;
	}

	if (externallyFramed) {
		try {
			global.top.location = global.location;
		} catch (e) {}
	}
}(this));