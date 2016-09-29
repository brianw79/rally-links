
document.addEventListener('contextmenu', function (e) {

  var srcElement = e.srcElement;
  if (srcElement.nodeName == 'A') {
	var objectToSave = { 
		linkText : srcElement.text, 
		url: srcElement.toString(), 
		description: parentNodeOfType(srcElement, "TR").getElementsByClassName("name")[0].innerText.replace(/(\r\n|\n|\r)/gm,"")
	}; 
	chrome.runtime.sendMessage({
		type: 'copy',
		text: JSON.stringify(objectToSave)
	});
  }
}, false);

function parentNodeOfType(childNode, parentElementType) {
    var testObj = childNode.parentElement;
    var tries = 1;
	
    while(testObj.nodeName.toUpperCase() != parentElementType.toUpperCase() && tries <= 30) {
        testObj = testObj.parentElement;
        tries++;
    }

	return testObj;
}


