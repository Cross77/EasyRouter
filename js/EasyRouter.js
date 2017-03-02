/// <reference path="./libts/jquery.d.ts"/>
/// <reference path="./KeyedCollection.ts"/>
define(["require", "exports", "./KeyedCollection.js"], function (require, exports, KeyedCollection_js_1) {
    "use strict";
    exports.__esModule = true;
    var EasyRouter = (function () {
        function EasyRouter() {
            this.routes = new KeyedCollection_js_1.KeyedCollection();
            var scope = this;
            $('a').on('click.redirect', function () {
                scope.redirect($(this).attr('href'));
                return false;
            });
            this.prefix = '';
            this.currentUrl = window.location.pathname;
        }
        EasyRouter.prototype.setPreloader = function (cb) {
            this.preloader = cb;
        };
        EasyRouter.prototype.getCurrent = function () {
            return this.find(this.currentUrl);
        };
        EasyRouter.prototype.redirect = function (url) {
            var newRoute = this.find(url);
            this.preloader();
            if (newRoute.group != this.getCurrent().group) {
                window.location.href = url;
                return;
            }
            $.ajax(url)
                .done(function (data) {
                var tempDom = $('<output>').append($.parseHTML(data));
                var $content = $(tempDom).find('.pageType').first();
                window.history.pushState(null, $(tempDom).find('title').text(), url);
                if ($content.length == 0) {
                    console.warn('.pageType not found');
                }
                else {
                    $('.pageType').html($content.html());
                }
            })
                .fail(function () {
                console.warn(url + ' ajax fail');
            });
        };
        EasyRouter.prototype.setPrefix = function (prefix) {
            this.prefix = prefix;
        };
        EasyRouter.prototype.route = function (_url, _group, _load, _unload) {
            var temp_route = {
                url: this.prefix + _url,
                group: _group,
                load: _load,
                unload: _unload
            };
            if (!this.routes.Isset(_group)) {
                this.routes.Add(_group, [temp_route]);
            }
            else {
                this.routes.Item(_group).push(temp_route);
            }
        };
        EasyRouter.prototype.removeGroup = function (group) {
            this.routes.Remove(group);
        };
        EasyRouter.prototype.error = function () {
            var error = {
                url: '/404',
                load: function () {
                    window.location.href = this.prefix + '/error.html';
                },
                unload: function () {
                    alert(12);
                },
                group: 'error'
            };
            return error;
        };
        EasyRouter.prototype.find = function (url) {
            for (var _i = 0, _a = this.routes.Values(); _i < _a.length; _i++) {
                var group = _a[_i];
                for (var _b = 0, group_1 = group; _b < group_1.length; _b++) {
                    var route = group_1[_b];
                    if (route.url == url)
                        return route;
                }
            }
            return this.error();
        };
        EasyRouter.prototype.findInGroup = function (url, group) {
            for (var _i = 0, _a = this.routes[group]; _i < _a.length; _i++) {
                var route = _a[_i];
                if (route.url == url)
                    return route;
            }
            return this.error();
        };
        EasyRouter.prototype.load = function (url) {
            var route = this.find(url);
            route.load();
        };
        return EasyRouter;
    }());
    exports.EasyRouter = EasyRouter;
});
//# sourceMappingURL=EasyRouter.js.map