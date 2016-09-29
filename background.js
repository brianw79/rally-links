var STORAGE_INPUT_ID = 'storage';
chrome.runtime.onMessage.addListener(function(message) {
	if (message && message.type == 'copy') {
		var input;
		if(!document.getElementById(STORAGE_INPUT_ID))
		{
			input = document.createElement('textarea');
			input.setAttribute("id", STORAGE_INPUT_ID)
		} else {
			input = document.getElementById(STORAGE_INPUT_ID);
		}

		document.body.appendChild(input);
		input.value = message.text;
    }
});

function getLink(typeLinkToGet) {
	if(document.getElementById(STORAGE_INPUT_ID))
	{
		var input = document.getElementById(STORAGE_INPUT_ID);
		var savedObject = JSON.parse(input.value);
		var text = "";
		if(typeLinkToGet === "flowdock"){
			text = "[" + savedObject.linkText + "](" + savedObject.url + " \"" + savedObject.description + "\")";
		} else if (typeLinkToGet === "html"){
			text = "<a href='" + savedObject.url + "'>" + savedObject.linkText + "</a>";
		} else if (typeLinkToGet === "sourceControl"){
			text = "[ " + savedObject.linkText + " : " + savedObject.description + " ]"
		}
		
		input.value = text;
		input.focus();
		input.select();
		document.execCommand('Copy');
		input.remove();
	} 
}




