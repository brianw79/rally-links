var STORAGE_INPUT_ID = 'storage';
var LINK_TYPE  = {
    MD  : 'markDown',
    SOURCE_CONTROL     : 'sourceControl',
    HTML : 'html',
	TEXT : 'text',
	PULL_REQUEST : 'pullRequest'
};

chrome.contextMenus.create({"title": "Create Markdown Link", "contexts": ["link"], "onclick": genericOnClick, "id": LINK_TYPE.MD});
chrome.contextMenus.create({"title": "Create Source Control Prefix", "contexts":["link"], "onclick": genericOnClick, "id": LINK_TYPE.SOURCE_CONTROL});
chrome.contextMenus.create({"title": "Create HTML Link", "contexts":["link"], "onclick": genericOnClick, "id": LINK_TYPE.HTML});
chrome.contextMenus.create({"title": "Create Text Reference", "contexts":["link"], "onclick": genericOnClick, "id": LINK_TYPE.TEXT});
chrome.contextMenus.create({"title": "Request Review", "contexts":["link"], "onclick": genericOnClick, "id": LINK_TYPE.PULL_REQUEST});

chrome.runtime.onMessage.addListener(function(message) {
	if (message && message.type == 'copy') {
		var input = document.getElementById(STORAGE_INPUT_ID);

		if(!input)
		{
			input = document.createElement('textarea');
			input.setAttribute("id", STORAGE_INPUT_ID)
		}

		document.body.appendChild(input);
		input.value = message.text;
    }
});

function genericOnClick(info, tab) {
	getLink(info.menuItemId);
}

function getLink(typeLinkToGet) {
	if(document.getElementById(STORAGE_INPUT_ID))
	{
		var input = document.getElementById(STORAGE_INPUT_ID);
		var savedObject = JSON.parse(input.value);
		var text = "";
		if(typeLinkToGet === LINK_TYPE.MD){
			text = "[" + savedObject.linkText + "](" + savedObject.url + " \"" + savedObject.description.replace(/"/g, '\\"') + "\")";
		} else if (typeLinkToGet === LINK_TYPE.HTML){
			text = "<a href='" + savedObject.url + "'>" + savedObject.linkText + "</a>";
		} else if (typeLinkToGet === LINK_TYPE.SOURCE_CONTROL){
			text = "[ " + savedObject.linkText + " : " + savedObject.description + " ]";
		} else if (typeLinkToGet === LINK_TYPE.TEXT){
			text = savedObject.linkText + ": " + savedObject.description + ", link to story - " + savedObject.url + ", Github link: " + savedObject.copiedGithubLink;
		} else if (typeLinkToGet === LINK_TYPE.PULL_REQUEST) {
			text = "can I get a review for the following PR? Thanks! Github link: " + savedObject.copiedGithubLink + ". This is for " + 
			savedObject.linkText + ": " + savedObject.description + ", link to story: " + savedObject.url;
		}
		
		input.value = text;
		input.focus();
		input.select();
		document.execCommand('Copy');
		input.remove();
	} 
}


