
document.addEventListener('contextmenu', function (e) {

	var srcElement = e.srcElement;

	if (srcElement.nodeName == 'SPAN') {

		attachModalElementToDom();

		createContainerAndSetFocus();

		$('#link-modal').show();

		if (document.execCommand("Paste")) {
			var copiedValue = $('#paste-container').children().html();
			$('#paste-container').remove();

			let store = {};
			store['copiedSourceControlLink'] = isSourceControlLink(copiedValue) ? copiedValue : 'PUT_GITHUB_LINK_HERE';
			chrome.storage.local.set(store, function () {
				let store = {};
				store['copiedSourceControlLink'] = '';
				chrome.storage.local.get(store, function (result) {
					var clipBoardData = result.copiedGithubLink

					var githubLink = 'PASTE_GITHUB_LINK_HERE';
					if (clipBoardData) {
						githubLink = clipBoardData
					}

					var pathParts = window.location.href.split('/');
					var protocol = pathParts[0];
					var host = pathParts[2];

					var objectToSave = {
						linkText: $(srcElement).text(),
						url: protocol + '//' + host + '/' + $(srcElement).parent('a').attr('href').replace(/(\r\n|\n|\r)/gm),
						description: $(srcElement).parents('td').siblings('th').find('span')[0].innerText.replace(/(\r\n|\n|\r)/gm, ""),
						copiedGithubLink: githubLink
					};

					chrome.runtime.sendMessage({
						type: 'copy',
						text: JSON.stringify(objectToSave)
					});
				});
			});

		}
	}
}, false);

var createContainerAndSetFocus = () => {
	var helperdiv = document.createElement('div');
	helperdiv.setAttribute("id", "paste-container");
	document.body.appendChild(helperdiv);
	helperdiv.contentEditable = true;

	var range = document.createRange();
	range.selectNode(helperdiv);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	helperdiv.focus();

	return helperdiv;
}

var isSourceControlLink = (value) => {
	if (!value) {
		return false;
	}

	return value.startsWith('https://github.com/');
}

var attachModalElementToDom = () => {
	let modalElementExists = $('#link-modal').length;
	if (!modalElementExists) {
		var modal = document.createElement('div');
		modal.setAttribute("id", "link-modal");
		document.body.appendChild(modal);
		$('#link-modal').css({ "position": "absolute", "z-index": "1", "left": "50%", "top": "50%", "width": "30%", "background-color": "blue" });
		$('#link-modal').append('<div class="modal-content"><span class="close">&times;</span><p>Some text in the Modal..</p></div>');		
	}
}
