import { EasyRouter } from './EasyRouter.js';

var _app = new EasyRouter();

_app.setConfig({
    catalogName: '/EasyRouter',
    onError: function(url){
        _app.load('/samples/error.html?url=' + url);
    },
    onPreload: function(){
        $('.pageType').html('<div class="starter-template">' +
                            '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>' +
                            '<span style="font-size: 3em;font-family: roboto;font-weight: 300;">' +
                            'Trwa wczytywanie...</span></div>');
    },
    onLoad: function(){
        console.log('loaded')
    },
    contentSelector: '.pageType'
});

_app.setRoute('/samples/news.html', 'front', function(){
    alert('news loaded');
}, function(){
    alert('news unloaded');
});

_app.setRoute('/samples/article.html', 'front', function(){
    alert('article loaded');
}, function(){
    alert('article unloaded');
});

_app.setRoute('/samples/login.html', 'another', function(){
    alert('login loaded');
}, function(){
    alert('login unloaded');
});

_app.setRoute('/samples/register.html', 'another', function(){
    alert('register loaded');
}, function(){
    alert('register unloaded');
});

_app.setRoute('/samples/error.html', 'error', function(){
    alert('news loaded');
}, function(){
    alert('news unloaded');
});

// osobno do każdej grupy powinna być możliwośc ustawienia preloadera
//_app.load('/greeter.html');

const loaded = true;