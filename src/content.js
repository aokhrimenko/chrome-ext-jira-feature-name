/**
 * Content script is run in the context of web pages
 */
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'jira_issue_name_request') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        var data = [],
        	keyVal = document.getElementById('key-val'), 
        	parentIssue = document.getElementById('parent_issue_summary'), 
        	summaryVal = document.getElementById('summary-val');

        if (parentIssue) {
        	var parts = /^([A-Z]+-\d+)\s+(.*)$/.exec(parentIssue.innerText);
        	if (parts && parts.length == 3) {
        		data.push(
        			issueToFeature(parts[1], parts[2])
    			);
    		}
        }

        if (keyVal && summaryVal) {
        	data.push(
        		issueToFeature(keyVal.innerText, summaryVal.innerText)
    		);
        }

        sendResponse(data);
    }
});

function issueToFeature(key, summary) {
    // ' "   =  remove
    // [^\w] = _

    summary = summary.replace(/['"]/g, '');
    summary = summary.replace(/\W/g, '_');
    summary = summary.replace(/_{2,}/g, '_');

    return key + '_' + summary;
}
