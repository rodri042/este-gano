let isOn = false;

const changeStatus = (it, tabId) => {
	isOn = it;
	chrome.browserAction.setIcon({ path: isOn ? "icon_on.png" : "icon_off.png" });
	if (tabId) chrome.tabs.sendMessage(tabId, isOn);
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	changeStatus(false, activeInfo.tabId);
});

chrome.browserAction.onClicked.addListener((tab) => {
	changeStatus(!isOn, tab.id);
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "request-status") {
		changeStatus(false);
		sendResponse(false);
	}
});
