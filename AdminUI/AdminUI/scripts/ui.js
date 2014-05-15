(function () {
    var navi = {
        id: '#nav',
        view: '#content',
        init: function () {
            var a = $(navi.id + " a");
            a.click(function () {
                var _this = $(this);
                var collapse = _this.parent('li');
                var ul = collapse.find('ul');
                if (ul.length) {
                    if (collapse.hasClass('open')) {
                        collapse.removeClass("open").find(">ul").slideUp();
                    } else {
                        var ulparent = collapse.parent('ul');
                        ulparent.find('>li').removeClass('open').find('ul').slideUp();
                        collapse.toggleClass('open').find("ul").slideToggle();

                        event.preventDefault();
                        return false;
                    }
                } else {
                    // fire
                    var parent = _this.parent('li');
                    if (parent.hasClass('active')) {
                        return;
                    }

                    var url = _this.attr('href');
                    url = url.substring(1);
                    url = '/views' + url + '.html';

                    var allli = parent.parent('ul').parent('li');
                    var allOther = parent.parent('ul').parent('li').parent('ul').find('li');
                    allOther.removeClass('active');
                    parent.toggleClass('active');

                    $.get(url, function (html) {
                        $(navi.view).html(html);
                    });
                }
            });
        }
    }

    $(navi.init());
})();