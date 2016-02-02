// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /jira/,
	issueNames = [];

// A function to use as callback
function setNames(names) {
    issueNames = names;
    console.log(issueNames);
}

function getNames() {
    return issueNames;
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    console.log(tab.url);
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'jira_issue_name_request'}, setNames);
    }
});