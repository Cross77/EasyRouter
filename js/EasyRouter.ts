/// <reference path="./libts/jquery.d.ts"/>
/// <reference path="./KeyedCollection.ts"/>

import * as $ from "jquery";
import { KeyedCollection } from './KeyedCollection.js';

interface IRoute{
    url: string,
    group: string,
    load: () => void,
    unload: () => void
}

export class EasyRouter {

    private routes: KeyedCollection< Array< IRoute > >;

    private prefix: string;

    private preloader: () => void;

    private currentUrl: string;

    public setPreloader(cb: () => void):void{
        this.preloader = cb;
    }

    private getCurrent(): IRoute{
        return this.find(this.currentUrl);
    }

    private redirect(url: string): void{
        var newRoute = this.find(url);
        this.preloader();
        if(newRoute.group != this.getCurrent().group){
            window.location.href = url;
            return;
        }
        $.ajax( url )
            .done(function(data) {
                var tempDom = $('<output>').append($.parseHTML(data));
                var $content = $(tempDom).find('.pageType').first();
                window.history.pushState(
                    null,
                    $(tempDom).find('title').text(),
                    url
                );
                if($content.length == 0){
                    console.warn('.pageType not found');
                }else{
                    $('.pageType').html($content.html());
                }
            })
            .fail(function() {
                console.warn(url + ' ajax fail');
            });
    }
    constructor(public greeting: string) {
        this.routes = new KeyedCollection< Array <IRoute> >();
        var scope = this;
        $('a').on('click.redirect', function(){
            scope.redirect($(this).attr('href'));
            return false;
        });
        this.prefix = '';
        this.currentUrl = window.location.pathname;
    }
    public setPrefix(prefix: string): void{
        this.prefix = prefix;
    }
    public route(_url: string, _group : string, _load: () => void, _unload: () => void): void{
        var temp_route : IRoute = {
            url: this.prefix + _url,
            group: _group,
            load: _load,
            unload: _unload
        };

        if( ! this.routes.Isset(_group) ){
            this.routes.Add(_group,[temp_route])
        }else{
            this.routes.Item(_group).push(temp_route);
        }
    }
    public removeGroup(group : string): void{
        this.routes.Remove(group);
    }
    private error(): IRoute{
        var error : IRoute = {
            url: '/404',
            load: function(){
                window.location.href = this.prefix + '/error.html';
            },
            unload: function(){
                alert(12);
            },
            group: 'error'
        };
        return error;
    }
    private find(url: string): IRoute{
        for (let group of this.routes.Values()) {
            for (let route of group) {
                if(route.url == url)
                    return route;
            }
        }
        return this.error();
    }
    private findInGroup(url: string, group: string): IRoute{
        for (let route of this.routes[group]) {
            if(route.url == url)
                return route;
        }
        return this.error();
    }
    public load(url: string): void{
        var route: IRoute = this.find(url);
        route.load();
    }
}