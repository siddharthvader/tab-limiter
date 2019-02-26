
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");

chrome.tabs.query({}, function (tabs) {
    p1.innerHTML = "# of Tabs: " + String(tabs.length);
});

chrome.storage.local.get('max_tabs', function(result) {
	console.log(result);
	p2.innerHTML = "Tab Limit: " + result.max_tabs;
});

let userinput = document.getElementById("userinput");
console.log(userinput);
let button = document.getElementById("b1");

button.addEventListener("click", function(){
	console.log(userinput);
	console.log(userinput.value);
	let message = userinput.value;
	console.log(message);
	chrome.storage.local.set({"max_tabs": message}, function() {
        console.log('max_tabs is set to ' + message);
    });

	userinput.value = "";
	p2.innerHTML = "Tab Limit: " + message;
});
