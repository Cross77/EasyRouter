import { EasyRouter } from './EasyRouter.js';

var _app = new EasyRouter("Working!");

_app.route('/samples/news.html', 'front', function(){
    alert('news loaded');
    document.getElementsByClassName("test")[0].innerHTML = _app.greet();
}, function(){
    alert('news unloaded');
});

_app.route('/samples/article.html', 'front', function(){
    alert('article loaded');
    document.getElementsByClassName("test")[0].innerHTML = _app.greet();
}, function(){
    alert('article unloaded');
});

_app.route('/samples/login.html', 'another', function(){
    alert('login loaded');
    document.getElementsByClassName("test")[0].innerHTML = _app.greet();
}, function(){
    alert('login unloaded');
});

_app.route('/samples/register.html', 'another', function(){
    alert('register loaded');
    document.getElementsByClassName("test")[0].innerHTML = _app.greet();
}, function(){
    alert('register unloaded');
});

// osobno do każdej grupy powinna być możliwośc ustawienia preloadera
_app.setPreloader(function(){
    $('.pageType').html('<div class="starter-template"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span style="font-size: 3em;font-family: roboto;font-weight: 300;">Trwa wczytywanie...</span></div>');
});
//_app.load('/greeter.html');

const loaded = true;