var STORAGE_INPUT_ID = 'storage';
var LINK_TYPE  = {
    FLOWDOCK  : 'flowdock',
    SOURCE_CONTROL     : 'sourceControl',
    HTML : 'html'
};

chrome.contextMenus.create({"title": "Create Flowdock Link", "contexts": ["link"], "onclick": genericOnClick, "id": LINK_TYPE.FLOWDOCK});
chrome.contextMenus.create({"title": "Create Source Control Prefix", "contexts":["link"], "onclick": genericOnClick, "id": LINK_TYPE.SOURCE_CONTROL});
chrome.contextMenus.create({"title": "Create HTML Link", "contexts":["link"], "onclick": genericOnClick, "id": LINK_TYPE.HTML});

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
		if(typeLinkToGet === LINK_TYPE.FLOWDOCK){
			text = "[" + savedObject.linkText + "](" + savedObject.url + " \"" + savedObject.description.replace(/"/g, '\\"') + "\")";
		} else if (typeLinkToGet === LINK_TYPE.HTML){
			text = "<a href='" + savedObject.url + "'>" + savedObject.linkText + "</a>";
		} else if (typeLinkToGet === LINK_TYPE.SOURCE_CONTROL){
			text = "[ " + savedObject.linkText + " : " + savedObject.description + " ]"
		}
		
		input.value = text;
		input.focus();
		input.select();
		document.execCommand('Copy');
		input.remove();
	} 
}


