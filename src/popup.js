var JiraToFeature = function() {
    var REQUEST_TEXT = 'jira_issue_name_request',
        OK = 0,
        WRONG_VERSION = 1,
        EMPTY = 2,
        self = this,
        container = document.getElementById('container');

    queryContentPage();
    bindEvents();

    function bindEvents() {
        $('body').on('click', '.copy', function() {
            var $btn = $(this);

            $('#copy-box')
                .val($btn.siblings('.name').text())
                .select();
            document.execCommand('copy');

            $btn.addClass('copied').text('ok');
            setTimeout(function(){
                $btn.removeClass('copied').text('copy');
            }, 750);
        });
    }

    /**
     *
     */
    function queryContentPage() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];

            chrome.tabs.sendMessage(tab.id, {text: REQUEST_TEXT}, function(response) {
                console.log(response);
                if (OK === validateResponse(response)) {
                    renderNames(response);
                } else {
                    errorNoData();
                }
            });

        });

    }

    function renderNames(list) {
        Feature.loadOptions(function(){
            var formatted,
                itemHtml,
                i,
                template = '<div class="entry">'
                    + '<div class="name">%</div>'
                    + '<div class="copy">Copy</div>'
                    + '</div>';

            console.log(list);
            for (i = 0; i < list.length; i++) {
                formatted = Feature.format(list[i]);

                var $item = $('<div class="entry">'
                    + '<div class="name"></div>'
                    + '<div class="copy">Copy</div>'
                    + '</div>');
                $item.find('.name').text(formatted);
                $('.container').append($item);
            }
        });
    }

    /**
     * @param {object} response
     * @returns {Number}
     */
    function validateResponse(response) {
        if (response && response.length) {
            return OK;
        }

        return EMPTY;
    }

    function errorWrongVersion() {

    }

    function errorNoData() {

    }

};

document.addEventListener("DOMContentLoaded", function() {
    new JiraToFeature();
});