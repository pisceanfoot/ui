(function($){
    $.bootstrap = $.bootstrap || {};

    $.bootstrap.button = $.bootstrap.button || {};
    $.bootstrap.button.dropDownText = function (id, text, value) {
        var btn = $("#" + id);
        btn.html(text + ' <span class="caret"></span>')
        btn.val(value || text);
    }

})($);