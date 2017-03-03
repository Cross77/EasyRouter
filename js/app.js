define(["require", "exports", "./EasyRouter.js"], function (require, exports, EasyRouter_js_1) {
    "use strict";
    exports.__esModule = true;
    var _app = new EasyRouter_js_1.EasyRouter();
    _app.setCatalog('/EasyRouter');
    _app.route('/samples/news.html', 'front', function () {
        alert('news loaded');
    }, function () {
        alert('news unloaded');
    });
    _app.route('/samples/article.html', 'front', function () {
        alert('article loaded');
    }, function () {
        alert('article unloaded');
    });
    _app.route('/samples/login.html', 'another', function () {
        alert('login loaded');
    }, function () {
        alert('login unloaded');
    });
    _app.route('/samples/register.html', 'another', function () {
        alert('register loaded');
    }, function () {
        alert('register unloaded');
    });
    // osobno do każdej grupy powinna być możliwośc ustawienia preloadera
    _app.setPreloader(function () {
        $('.pageType').html('<div class="starter-template"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span style="font-size: 3em;font-family: roboto;font-weight: 300;">Trwa wczytywanie...</span></div>');
    });
    //_app.load('/greeter.html');
    var loaded = true;
});
//# sourceMappingURL=app.js.map