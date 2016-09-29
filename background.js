chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type == 'copy') {
		if(!document.getElementById('storage'))
		{
			var input = document.createElement('textarea');
			input.setAttribute("id", "storage")
			document.body.appendChild(input);
			input.value = message.text;
		} else {
			var input = document.getElementById('storage');
			input.value = message.text;
			document.body.appendChild(input);
		}
    }
});

function getLink(typeLinkToGet) {
	if(document.getElementById('storage'))
	{
		var input = document.getElementById('storage');
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




