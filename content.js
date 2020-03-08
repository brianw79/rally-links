
document.addEventListener('contextmenu', function (e) {

  var srcElement = e.srcElement;

	var pathParts = window.location.href.split('/');
	var protocol = pathParts[0];
	var host = pathParts[2];


  if (srcElement.nodeName == 'SPAN') {
	var objectToSave = { 
		linkText: $(srcElement).text(), 
		url: protocol + '//' + host + '/' + $(srcElement).parent('a').attr('href').replace(/(\r\n|\n|\r)/gm), 
		description: $(srcElement).parents('td').siblings('th').find('span')[0].innerText.replace(/(\r\n|\n|\r)/gm,"")
	}; 
	chrome.runtime.sendMessage({
		type: 'copy',
		text: JSON.stringify(objectToSave)
	});
  }
}, false);

function parentNodeOfType(childNode, parentElementType) {
    var testObj = childNode.parentElement;
	
    while(testObj.nodeName.toUpperCase() != parentElementType.toUpperCase()) {
        testObj = testObj.parentElement;
    }

	return testObj;
}


