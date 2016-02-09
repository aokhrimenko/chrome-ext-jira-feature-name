var Options = function() {
    var sourceText = 'DEMO-1234 Issue "name" with some TEXT',
        preview = document.getElementById('preview');

    Feature.loadOptions(function(){
        var modelElements = document.querySelectorAll('.value'),
            i,
            el;

        for (i = 0; i < modelElements.length; i++) {
            el = modelElements[i];

            if (Feature.options.hasOwnProperty(el.id)) {
                el.value = Feature.options[el.id];
                el.onchange = onModelChange;
            }
        }

        updatePreview();
    });

    function onModelChange(e) {
        var value = e.target.type == "checkbox" ? e.target.checked : e.target.value;

        Feature.updateOptions(e.target.id, value, updatePreview);
    }

    function updatePreview() {
        preview.innerText = Feature.format(sourceText);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    new Options();
});
