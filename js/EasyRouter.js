/// <reference path="./libts/jquery.d.ts"/>
/// <reference path="./KeyedCollection.ts"/>
define(["require", "exports", "./KeyedCollection.js"], function (require, exports, KeyedCollection_js_1) {
    "use strict";
    exports.__esModule = true;
    var EasyRouterGroup = (function () {
        function EasyRouterGroup() {
        }
        EasyRouterGroup.prototype.add = function (route) {
        };
        return EasyRouterGroup;
    }());
    var EasyRouter = (function () {
        function EasyRouter() {
            this.routes = new KeyedCollection_js_1.KeyedCollection();
            var scope = this;
            $('a:not([href^=mailto], [href^="#"], [rel="norouter"])').on('click.redirect', function () {
                var url = this.href.replace(/https?:\/\/[^\/]+/i, "");
                scope.redirect(url);
                return false;
            });
            this.config = {
                catalogName: '',
                onError: function () { },
                contentSelector: '.router-content',
                onPreload: function () { },
                onLoad: function () { }
            };
            this.version = '0.2';
            this.currentUrl = window.location.pathname;
        }
        EasyRouter.prototype.getCurrent = function () {
            return this.find(this.currentUrl);
        };
        EasyRouter.prototype.redirect = function (url) {
            var newRoute = this.find(url);
            if (newRoute == null) {
                this.config.onError(url);
                return;
            }
            this.config.onPreload();
            if (newRoute.group != this.getCurrent().group) {
                window.location.href = url;
                return;
            }
            $.ajax(url)
                .done(function (data) {
                var tempDom = $('<output>').append($.parseHTML(data));
                var $content = $(tempDom).find(this.config.contentSelector).first();
                window.history.pushState(null, $(tempDom).find('title').text(), url);
                if ($content.length == 0) {
                    console.warn(this.config.contentSelector + 'not found');
                }
                else {
                    this.currentUrl = url;
                    $(this.config.contentSelector).html($content.html());
                }
            })
                .fail(function () {
                console.warn(url + ' ajax fail');
            });
        };
        EasyRouter.prototype.setConfig = function (config) {
            this.config = config;
        };
        EasyRouter.prototype.setRoute = function (_url, _group, _load, _unload) {
            var temp_route = {
                url: this.config.catalogName + _url,
                group: _group,
                load: _load,
                unload: _unload,
                loaded: false,
                cache: ''
            };
            if (!this.routes.Isset(_group)) {
                this.routes.Add(_group, [temp_route]);
            }
            else {
                this.routes.Item(_group).push(temp_route);
            }
        };
        EasyRouter.prototype.setGroup = function (routes) {
        };
        EasyRouter.prototype.removeGroup = function (group) {
            this.routes.Remove(group);
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
            return null;
        };
        EasyRouter.prototype.findInGroup = function (url, group) {
            for (var _i = 0, _a = this.routes[group]; _i < _a.length; _i++) {
                var route = _a[_i];
                if (route.url == url)
                    return route;
            }
            return null;
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