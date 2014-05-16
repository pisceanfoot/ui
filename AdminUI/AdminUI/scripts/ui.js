(function () {
    var navi = {
        id: '#nav',
        view: '#content',
        miniId: '.toggle-min',
        init: function (option) {
            navi.navigation();
            navi.mini();
        },
        navigation: function(){
            var a = $(navi.id + " a");
            a.click(function () {
                var _this = $(this);
                var collapse = _this.parent('li');
                var ul = collapse.find('ul');
                if (ul.length) {
                    if ($('body').hasClass('nav-min')) {
                        return;
                    }

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
                    url = 'views' + url + '.html';

                    $(navi.id).find('li').removeClass('active');

                    var parentli = parent.parent('ul').parent('li');
                    parentli.toggleClass('active');
                    parent.toggleClass('active');
                    
                    parent.parent('ul').find('>li').removeClass('open').find('>ul').slideUp();

                    $.get(url, function (html) {
                        $(navi.view).html(html);
                    });
                }
            });
        },
        mini: function () {

            $(navi.miniId).click(function () {
                $('body').toggleClass('nav-min');

                var _navi = $(navi.id);
                _navi.find('li[class*=open]').find('ul').hide();
                _navi.find('>li').removeClass('open');
            });
        }
    }

    $(navi.init());
})();