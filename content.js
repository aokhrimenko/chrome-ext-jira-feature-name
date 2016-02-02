/**
 * Content script is run in the context of web pages
 */
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'jira_issue_name_request') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        console.log('sending data');
        var data = [],
        	keyVal = document.getElementById('key-val'), 
        	parentIssue = document.getElementById('parent_issue_summary'), 
        	summaryVal = document.getElementById('summary-val');

        if (parentIssue) {
        	var parts = /^([A-Z]+-\d+)\s+(.*)$/.exec(parentIssue.innerText);
        	console.log('parts', parts);
        	if (parts && parts.length == 3) {
	        	data.push({key: parts[1], summary: parts[2]});
    		}
        }

        if (keyVal && summaryVal) {
        	data.push({key: keyVal.innerText,  summary: summaryVal.innerText});
        }

        console.log('data', data);

        sendResponse(data);
    }
});