/*
* Description:后台管理 Qeury 插件
* 
*
*/
(function ($) {
    function debug_console(m) {
        console.log(m);
    }

    var resource = {
        error: {
            grid_can_not_find: '不能识别的模板',
            grid_can_not_find_template: '模板为空',
            saveAction_input: '没法发现任何可提交的元素'
        }
    };

    $.framework = {};

    $.framework.dynamicCall = function (func) {
        var _thisFunc = this[func];
        if (_thisFunc) {
            this[func].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };

    $.framework.format = function (format) {
        var args = $.makeArray(arguments).slice(1);
        if (format === undefined) { format = ""; }
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    };

    $.framework.urlEncode = function (str) {
        if (str) {
            return encodeURIComponent(str);
        } else {
            return str;
        }
    };

    $.framework.urlDecode = function (str) {
        if (str) {
            return decodeURIComponent(str.replace(/\+/g, "%20"));
        } else {
            return str;
        }
    };

    /*
    * @description 扩展 Array，添加remove方法
    */
    $.framework.arrayRemove = function (array, removeIndex) {
        return jQuery.grep(array, function (elem, index) {
            return removeIndex !== index;
        });
    };

    this.ajaxLock = [];
    /*
    * @private
    * @description 查找 Lock 位置
    */
    function findAjaxLock(name) {
        for (var i = 0; i < this.ajaxLock.length; i++) {
            if (this.ajaxLock[i] == name) {
                return i;
            }
        }

        return -1;
    }
    /*
    * @private
    * @description 添加 Lock 位置
    */
    function addAjaxLock(name) {
        ajaxLock.push(name);
    }
    /*
    * @private
    * @description 删除 Lock
    */
    function remvoeAjaxLock(name) {
        var index = findAjaxLock(name);
        if (index != -1) {
            ajaxLock = $.framework.arrayRemove(ajaxLock, index);
        }
    }

    /*
    * @param {string} AJAX 名称
    * @description AJAX GET，同时只能发起一个请求
    */
    $.framework.ajaxGet = function (name, url, data, callback, dataType) {
        var config = { url: url, data: data, callBack: callback };
        if (dataType) {
            config.dataType = dataType
        }

        return $.framework.ajax(name, config);
    };
    $.framework.ajaxPost = function (name, url, data, callback, dataType) {
        var config = { url: url, data: data, callBack: callback, method: 'post' };
        if (dataType) {
            config.dataType = dataType
        }

        return $.framework.ajax(name, config);
    };
    /*
    * @param {string} AJAX 名称
    * @description AJAX GET，同时只能发起一个请求
    */
    $.framework.ajax = function (name, option) {
        option = option || {};
        option = $.extend({
            method: "get",
            dataType: 'html'
        }, option);

        var index = findAjaxLock(name);
        if (index != -1) {
            return false;
        }
        addAjaxLock(name);

        function callback(result) {
            debug_console(result);

            // filter，检查 AJAX 是否报错
            var error = false;
            if (result && typeof (result) == 'string' && result.indexOf("hiddenIsErrorPage") != -1) {
                error = true;
            }

            try {
                if (!error && option.callBack) {
                    option.callBack(result);
                }
            } catch (error) {
                debug_console(error);
            }
        }

        if (option.method == "get") {
            var jqxhr = $.get(option.url, option.data, callback, option.dataType);
        } else {
            var jqxhr = $.post(option.url, option.data, callback, option.dataType);
        }

        jqxhr.always(function () {
            debug_console('jqxhr.always:' + name);
            remvoeAjaxLock(name);
        });
        return jqxhr;
    };

    /*
    * @description serialize any html container like div table
    * @param {element} element html container
    * @param {object} option option.bindTag
    * @example
    * <div id="a">
    *    <input type="text" name="name" value="1"/>
    * </div>
    * <div id="b">
    *    <input type="text" bind="name" value="1"/>
    * </div>
    * <script>
    *	 var form1 = $.serializeControl('#a'); 
    *	 var form2 = $.serializeControl('#b', {bindTag : 'bind'}); 
    * </script>
    */
    $.serializeControl = function (element, option) {
        if (!element && $(element).length == 0) {
            return;
        }
        option = option || {};
        // option.bindTag = ''

        function getControls(element) {
            var element = $(element);
            var controlValues = [];

            element.children().each(function (i, e) {
                var value = getControlValue(e);
                if (value) {
                    controlValues.push(value);
                }

                var tmp = getControls(e);
                if (tmp && tmp.length) {
                    $.each(tmp, function (tmpIndex, tmpElement) {
                        controlValues.push(tmpElement);
                    });
                }
            });

            return controlValues;
        }

        function getControlValue(element) {
            element = $(element);

            var tag = element[0].tagName;
            if (!tag || (tag != "INPUT" && tag != "SELECT" && tag != "TEXTAREA")) {
                return null;
            }

            var name = option.bindTag ? element.attr(option.bindTag) : null;
            if (!name) {
                name = element.attr("name");
                if (!name) {
                    return null;
                }
            } else {
                name = jQuery.parseJSON(name).bind;
            }

            var value = element.val();
            if (tag == "INPUT") {
                var type = element.attr("type");
                if (type == "radio" || type == "checkbox") {
                    if (!value) {
                        return null;
                    }

                    var checked = element.attr("checked");
                    if (!checked) {
                        return null;
                    }
                }

                value = value.replace("on", "true");
            }

            if (value) {
                value = { name: name, value: value };
            }

            return value;
        }

        var controls = getControls(element);
        if (controls && controls.length) {
            var controlform = [];
            $.each(controls, function (i, e) {
                controlform.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
            });

            return controlform.join('&');
        }

        return null;
    };

    /*
    * http://www.jsviews.com/
    * @description use jquery template for table
    * @param {object} option
    * @example
    *   <table id="grid">
    *      <thead>
    *       <tr>
    *           <td>ID</td>
    *           <td>Name</td>
    *       </tr>
    *      </thead>
    *      <tbody>
    *       <tr>
    *           <td>${ID}</td>
    *           <td>${Name}</td>
    *       </tr>
    *      </tobdy>
    *   </table>
    * <script>
    *    $("#grid").grid().load({ID:1, Name:'name'});
    * </script>
    */
    $.fn.grid = function (option) {

        function getLastTR(element) {
            element = $(element);
            if (!element.length) {
                return;
            }

            var childitems = element.children();
            if (!childitems.length) {
                return;
            }

            var lastItem = childitems.get(childitems.length - 1);
            if (lastItem.tagName != "TR") {
                lastItem = getLastTR(lastItem);
            }

            return lastItem;
        }

        var _this = $(this);

        var template = getLastTR(_this);
        if (!template) {
            alert(resource.error.grid_can_not_find);
            return;
        }

        template = $(template);
        var tbody = template.parent();
        
        var templateContent = $('<div/>').append(template).html();
        if (!templateContent) {
            alert(resource.error.grid_can_not_find_template);
            return;
        }
        template.remove();

        templateID = 'Template_' + new Date().getTime();
        $(this).attr("Template_ID", templateID);

        var compiledTemplate = $.templates(templateID, templateContent);

        function load(data, option) {
            if (option) {
                var t = compiledTemplate.render(data, option);
            } else {
                var t = compiledTemplate.render(data);
            }

            tbody.empty();
            tbody.append(t);
        }

        function link(data) {
            compiledTemplate.link(tbody, data);
        }

        function get(element) {
            // TODO: NO TEST
            var item = $.view(element);
            if (item) {
                return item.data;
            } else {
                return null;
            }
        }

        return {
            load: load,
            link: link,
            get: get
        }
    };

    /*
    * @description auto serialize any html container, and send ajax request, and bind grid
    * @param {object} option option.bindTag
    * @example
    *      var initOption = {
    *      bindTag: 'bind',         // for serialze input
    *      search: '#search',       // seach button id
    *      autostart: true,         // auto send ajax request
    *      //action: null,          // ajax url
    *      //callback: null,        // call back when ajax done
    *      ajax: {                  // ajax option
    *          method: 'get',
    *          datatype: 'html'
    *      }
    *  }
    * <a href="#" id="search">Search</a>
    * <div id="a">
    *    <input type="text" name="name" value="1"/>
    * </div>
    *   <table id="grid">
    *       <tr>
    *           <td>ID</td>
    *           <td>Name</td>
    *       </tr>
    *       <tr>
    *           <td>${ID}</td>
    *           <td>${Name}</td>
    *       </tr>
    *   </table>
    * <script>
    *	 var form1 = $("#grid").control({ action: '/test/test.aspx', callback : function(result){alert(reslut)} }); 
    * </script>
    */
    $.fn.control = function (option) {
        option = option || {};

        var initOption = {
            bindTag: 'bind',
            search: '#search',
            autostart: true,
            //action: null,
            //callback: null,
            //complete:function(){};
            ajax: {
                method: 'get',
                datatype: 'json'
            }
        }

        option = $.extend(true, initOption, option);
        grid = $(this).grid();

        function loadData() {
            if (!option.action) {
                return;
            }

            var data = $.serializeControl(option.search);

            function callBack(result) {
                // 处理异常
                // 处理分页

                if (option.callback) {
                    result = option.callback(result);
                }

                // bind gride
                grid.load(result);

                if (option.complete) {
                    option.complete();
                }
            }

            // AJAX
            // 加载背景
            if (option.ajax.method == 'get') {
                $.get(option.action, data, callBack, option.ajax.datatype);
            } else {
                $.post(option.action, data, callBack, option.ajax.datatype);
            }
        }

        // search
        if (option.autostart) {
            loadData();
        }

        if (option.search) {
            $(option.search).click(function () {
                loadData();
            });
        }

        return {
            loadAction: loadData,
            get: grid.get,
            load: grid.load
        }
    };

    /*
    * @description relActionHandle
    */
    $.relActionHandle = {};

    /*
    * @description relAction
    * ajaxAction：rel="ajaxAction_{search control}" control="search"
    */
    $.relAction = function (option) {

        /*
        * @description 发送 ajax 请求
        * rel="ajaxAction_{search control}" control="search"
        */
        function ajaxAction(option) {
            debug_console(option);

            var _this = $(this);
            var control = _this.attr('control');
            if (!control) {
                var rel = _this.attr('rel');
                control = rel.replace('ajaxAction_', "");
            }

            var data = $.serializeControl(control);
            var name = _this.attr("name");
            var url = _this.attr("href");

            function ajaxActionCallback(result) {
                debug_console(result);

                if (!result && typeof (result) != 'object') {
                    ShowMsgPane('Error', "操作失败", result);
                    return;
                }

                if (name) {
                    var result = $.framework.dynamicCall.call($.relActionHandle, "onAjaxAction_" + name, result, { name: name, element: _this });
                    if (typeof (result) != 'undefined' && !result) {
                        return false;
                    }
                }

                switch (result.Description) {
                    case "Message":
                        alert(result.Description);
                        break;
                    case "OK":
                        //ShowMsgPane('Success', result.Body.Title, result.Body.Message);
                        break;
                    case "Rediect":
                        location.href = result.Description;
                        break;
                    default:
                        //ShowMsgPane(result.Description, result.Body.Title, result.Body.Message);
                        break;
                }
            }

            $.framework.ajaxPost("relAction_ajaxAction" + url, url, data, ajaxActionCallback, 'json');
        }

        $('body').on('click', 'a[rel^=ajaxAction]', function (event) { ajaxAction.call(event.currentTarget, option); event.preventDefault(); });

        debug_console('init ok');
    };

    /*
    * @description setInput
    * $.framework.setInput({ID:1, Name: 'Hello'});
    */
    $.framework.setInput = function (data, option) {
        for (var k in data) {
            var txt = $("#Txt" + k);
            if (txt.length) {
                txt.val(data[k]);
            } else {
                var find = false;
                $("input[name=" + k + "]").each(function (i, e) {
                    var _this = $(e);
                    if (_this.val() == data[k].toString()) {
                        find = true;
                        _this.attr('checked', true);
                    }
                });

                if (!find && (data[k] == true || data[k] == "true")) {
                    $("input[name=" + k + "]").attr('checked', true);
                }
            }
        }
    };

    /*
    * @description $.fChecker
    * $.fChecker.init('.table');
    * $.fChecker.check('.table');
    */
    $.fChecker = {
        _errorObj: 'lable',
        //private for multi form check
        _form_list: {},

        // private get controls with rule
        _getControls: function (element) {
            var element = $(element);
            var controlValues = [];

            element.children().each(function (i, e) {
                var child = $(e);
                if (child.attr('rule')) {
                    controlValues.push(child);
                }

                var tmp = $.fChecker._getControls(child);
                if (tmp && tmp.length) {
                    $.each(tmp, function (tmpIndex, tmpElement) {
                        controlValues.push(tmpElement);
                    });
                }
            });

            return controlValues;
        },

        //public add form setting
        init: function (formName, settings) {
            settings = settings || {};
            $.fChecker._form_list[formName] = settings;

            settings.objs = $.fChecker._getControls(formName);

            console.log(settings.objs);

            if (settings.objs && settings.objs.length) {
                $.each(settings.objs, function (i, e) {
                    var $this = $(e);
                    $this.bind({
                        blur: function () { $.fChecker._checkRule($this); }
                    });
                });
            }
        },

        //private check rule
        _checkRule: function (e) {
            var ruleTxt = e.attr('rule') || '';
            if (ruleTxt.length <= 0) return true;
            eval('var rules={' + ruleTxt + '}');

            for (var key in rules) {
                if (!$.fChecker._checkers[key].call(e[0], rules[key])) {
                    return $.fChecker._callBack.call(e[0], false, key);
                }
            }

            return $.fChecker._callBack.call(e[0], true);
        },

        //private
        _callBack: function (result, key) {
            var $this = $(this);

            var find = function (t) {
                var tmp = t.siblings().filter($.fChecker._errorObj);
                if (typeof (tmp) == 'undefined' || tmp.length == 0) {
                    return find(t.parent());
                } else {
                    if (tmp.length > 1) {
                        tmp = tmp.filter('.' + key);
                    }

                    if (result) {
                        tmp.hide();
                    }
                    else {
                        tmp.show();
                    }
                    return true;
                }
            };

            find($this);

            return result;
        },

        //public
        check: function (name) {
            var settings = $.fChecker._form_list[name];

            var result = true;
            $.each(settings.objs, function (i, e) {
                var $this = $(e);
                var last = $.fChecker._checkRule($this);
                result = result && last;
            });

            return result;
        },

        //public
        addCheckers: function (name, fun) {
            $.fChecker._checkers[name] = fun;
        },

        //private
        _checkers: {
            maxlength: function (v) {
                var value = $(this).val() || '';
                return value.length <= v;
            },
            minlength: function (v) {
                var value = $(this).val() || '';
                return value.length >= v;
            },
            regex: function (v) {
                //v='/[\d]*/g'
                var value = $(this).val() || '';
                var reg = new RegExp(v);
                return reg.test(value);
            },
            valuetype: function (v) {
                //v='int','float','letter','l&n';
                var value = $(this).val() || '';
                v = v || '';
                if (value.length <= 0 || v.length <= 0) {
                    return false;
                }

                switch (v) {
                    case 'int': return /^[\d]+$/.test(value);
                    case 'float': return Number(value).toString() != 'NaN';
                    case 'letter': return /^[A-z]+$/.test(value);
                    case 'l&n': return /^[\w]+$/.test(value);
                }
                return false
            },
            required: function (v) {
                //v='true'or'false'
                var value = $(this).val() || '';
                if (v == true) {
                    return value.length > 0;
                }
                else if (v == false) {
                    return true;
                }
                return false;
            }
        }
    };
})(jQuery);


function framework_init() {
}

$(function () {
    $.relAction();

    framework_init();
});