
function genericOnClick(info, tab) {
	getLink(info.menuItemId);
}

chrome.contextMenus.create({"title": "Create Flowdock Link", "contexts": ["link"], "onclick": genericOnClick, "id": "flowdock"});
chrome.contextMenus.create({"title": "Create Source Control Prefix", "contexts":["link"], "onclick": genericOnClick, "id": "sourceControl"});
chrome.contextMenus.create({"title": "Create HTML Link", "contexts":["link"], "onclick": genericOnClick, "id": "html"});




