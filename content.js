
document.addEventListener('contextmenu', function (e) {

  var srcElement = e.srcElement;
  var pathParts = window.location.href.split('/');
  var protocol = pathParts[0];
  var host = pathParts[2];

  if (srcElement.nodeName == 'SPAN') {

	  //pastClipboardData(getClipBoardData);
	  var helperdiv = document.createElement('div');
	  helperdiv.setAttribute("id", "paste-container");
	  document.body.appendChild(helperdiv);
	  helperdiv.contentEditable = true;

	  // focus the helper div's content
	  var range = document.createRange();
	  range.selectNode(helperdiv);
	  window.getSelection().removeAllRanges();
	  window.getSelection().addRange(range);
	  helperdiv.focus();

	  if (document.execCommand("Paste")) {
		  var copiedValue = $('#paste-container').children().html();
		  $('#paste-container').remove();
		  
		  if (copiedValue && copiedValue.includes('github.com')) {
			  let store = {};
			  store['copiedGithubLink'] = copiedValue;
			  chrome.storage.local.set(store, function () {
				  var clipBoardData;
				  let store = {};
				  store['copiedGithubLink'] = '';
				  chrome.storage.local.get(store, function (result) {
					  clipBoardData = result.copiedGithubLink
					  console.log('Value from chrome.storage.local.get currently is ' + result.copiedGithubLink);

					  var githubLink = 'PASTE_GITHUB_LINK_HERE';
					  if (clipBoardData) {
						  githubLink = clipBoardData
					  }

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
  }
}, false);

var pastClipboardData = (pastClipboardDataSuccess) => {
	var helperdiv = document.createElement('div');
	helperdiv.setAttribute("id", "paste-container");
	document.body.appendChild(helperdiv);
	helperdiv.contentEditable = true;

	// focus the helper div's content
	var range = document.createRange();
	range.selectNode(helperdiv);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	helperdiv.focus();

	if (document.execCommand("Paste")) {
		var copiedValue = $('#paste-container').children().html()
		if (copiedValue && copiedValue.includes('github.com')) {
			let store = {};
			store['copiedGithubLink'] = copiedValue;
			chrome.storage.local.set(store, function () {				
				console.log('copiedGithubLink set to ' + copiedValue);
				console.log('calling pastClipboardDataSuccess');

				pastClipboardDataSuccess(storeResult);
			});					
		}
	}

	$('#paste-container').remove();
}

var getClipBoardData = (getClipBoardDataSuccess) => {
	console.log('inside getClipBoardData');
	console.log("getClipBoardDataSuccess is " + getClipBoardDataSuccess)
	var clipBoardData;

	let store = {};
	store['copiedGithubLink'] = ''; 
	chrome.storage.local.get(store, function (result) {
		clipBoardData = result.copiedGithubLink
		console.log('Value from chrome.storage.local.get currently is ' + result.copiedGithubLink);

		var githubLink = 'PASTE_GITHUB_LINK_HERE';
		if (clipBoardData) {
			githubLink = clipBoardData
		}

		getClipBoardDataSuccess(githubLink);
	});
}

var storeResult = (githubLink) => {
	console.log('value from getClipBoardData(): ' + githubLink);

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
}


