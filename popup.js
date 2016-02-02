
$(document).ready(function () {
    var backgroundPage = chrome.extension.getBackgroundPage(),
        names = backgroundPage.getNames();

    if (!names.length) {
        return;
    }

    for (var i = 0; i < names.length; i++) {
        var feature = issueToFeature(names[i].key, names[i].summary);
        console.log(feature);
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
