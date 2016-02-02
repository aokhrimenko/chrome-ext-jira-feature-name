
$(document).ready(function () {
    // var backgroundPage = chrome.extension.getBackgroundPage();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0],
            url = tab.url;


        chrome.tabs.sendMessage(tab.id, {text: 'jira_issue_name_request'}, function(response) {
            if (length in response && response.length) {
                renderNames(response);
            }
        });

    });


    var $input = $('#copy-box'), $body = $('body');

    $('body').on('click', '.copy', function() {
        var $btn = $(this);

        $input
            .val($btn.siblings('.name').text())
            .select();
        document.execCommand('copy');

        $btn.addClass('copied').text('ok');
        setTimeout(function(){
            $btn.removeClass('copied').text('copy');
        }, 750);
    });

    function renderNames(data) {
        for (var i = 0; i < data.length; i++) {
            var $item = $('<div class="container">'
                + '<div class="name"></div>'
                + '<div class="copy">Copy</div>'
                + '</div>');
            $item.find('.name').text(data[i]);
            $body.append($item);
        }
    }

});
