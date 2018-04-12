Feature = {
    options: {
        keyCase: "upper",
        keyDelimiter: "-",
        delimiter: "-",
        summaryCase: "lower",
        summaryDelimiter: "-",
        maxLength: 100
    },

    /**
     * Formats source key-summary string using passed options.
     *
     * @param {object} options
     * @param {string} source
     *
     * @returns {string}
     */
    format: function (source) {
        var result = '',
            index,
            key,
            summary;

        index = source.indexOf(' ');
        key = clean(source.slice(0, index));
        key = fixCase(key, Feature.options.keyCase, Feature.options.keyDelimiter);

        summary = clean(source.slice(index + 1));
        summary = fixCase(summary, Feature.options.summaryCase, Feature.options.summaryDelimiter);

        if (key && summary) {
            result = key + Feature.options.delimiter + summary;
        } else if (key) {
            result = key;
        } else if (summary) {
            result = summary;
        } else {
            return "";
        }

        return result.slice(0, Feature.options.maxLength);

        function fixCase(value, caseType, delimiter) {
            switch (caseType) {
                case 'lower':
                    value = value.toLowerCase();
                    break;

                case 'upper':
                    value = value.toUpperCase();
                    break;

                case 'capitalize':
                    value = value.toLowerCase().replace(/(?:^|\W)\w/g, function(a) {return a.toUpperCase();});
                    break;

                case 'hide':
                    value = '';
                    break;
            }

            return value.replace(/\s+/g, delimiter);
        }

        function clean(value) {
            value = value.replace(/['"]/g, '');
            value = value.replace(/\W/g, ' ');
            value = value.replace(/^\s|\s$/g, ''); 

            return value;
        }
    },

    updateOptions: function (key, value, callback) {
        Feature.options[key] = value;

        chrome.storage.sync.set(Feature.options, function () {
            if (typeof callback == 'function') {
                callback(Feature.options);
            }
        });
    },

    loadOptions: function (callback) {
        chrome.storage.sync.get(function (items) {

            for (var key in Feature.options) {
                if (items.hasOwnProperty(key)) {
                    Feature.options[key] = items[key];
                }
            }

            callback();
        });

    }

};
