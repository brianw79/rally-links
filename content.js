
document.addEventListener('contextmenu', function (e) {

  var srcElement = e.srcElement;
  var pathParts = window.location.href.split('/');
  var protocol = pathParts[0];
  var host = pathParts[2];

  if (srcElement.nodeName == 'SPAN') {

	pastClipboardData();
	var githubLink = getClipBoardData();

	$('#paste-container').remove();

	var objectToSave = { 
		linkText: $(srcElement).text(), 
		url: protocol + '//' + host + '/' + $(srcElement).parent('a').attr('href').replace(/(\r\n|\n|\r)/gm), 
		description: $(srcElement).parents('td').siblings('th').find('span')[0].innerText.replace(/(\r\n|\n|\r)/gm,""),
		copiedGithubLink: githubLink
	}; 

	chrome.runtime.sendMessage({
		type: 'copy',
		text: JSON.stringify(objectToSave)
	});
  }
}, false);

var pastClipboardData  = () => {
	// add a DIV, contentEditable=true, to accept the paste action
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

	// trigger the paste action
	document.execCommand("Paste");
}

var getClipBoardData = () => {
	var clipBoardData = $('#paste-container').children().html()
	var githubLink = 'PASTE_GITHUB_LINK_HERE';
	if (clipBoardData && clipBoardData.includes('github.com')) {
		githubLink = clipBoardData
	}

	return githubLink;
}


