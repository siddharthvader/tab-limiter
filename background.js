
let max_tabs = 20;

chrome.runtime.onInstalled.addListener(
	function(details){
		chrome.storage.local.set({"max_tabs": max_tabs}, function() {
        	console.log('max_tabs is set to ' + max_tabs);
    	});
	}
);

chrome.tabs.onCreated.addListener(
	function(tab) {

		chrome.storage.local.get('max_tabs', function(result) {
			console.log(result);
        	console.log('(create) Value currently is ' + Number(result.max_tabs));
        	max_tabs = Number(result.max_tabs);
        });

		chrome.tabs.query({}, function (tabs) {
	        if(tabs.length > max_tabs){
	        	chrome.tabs.update({url:"tab_page.html"});
	        }
    	});

		return {cancel: true};
	}
);

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		chrome.tabs.query({}, function (tabs) {
			// console.log(tab);
			// console.log(tab.url.includes("tab_page.html"));

			chrome.storage.local.get('max_tabs', function(result) {
	        	console.log('(update) Value currently is ' + Number(result.max_tabs));
	        	max_tabs = Number(result.max_tabs);
	        });

	        if(tabs.length > max_tabs && !tab.url.includes("tab_page.html")){
	        	chrome.tabs.update(tabId, {url:"tab_page.html"});
	        }
    	});
		return {cancel: true };
	}
);

