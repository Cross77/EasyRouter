/// <reference path="./libts/jquery.d.ts"/>
/// <reference path="./KeyedCollection.ts"/>

//import * as $ from "jquery";
import { KeyedCollection } from './KeyedCollection.js';

interface IRoute{
    url: string,
    group: string,
    cache: string,
    loaded: Boolean,
    load: () => void,
    unload: () => void
    //preload: () => void
}

interface IGroupConfig{
    name: string,
    load: () => void,
    unload: () => void,
    preload: () => void
}

interface IGroup{
    name: string,
    routes: KeyedCollection< Array< IRoute > >,
    load: () => void,
    unload: () => void,
    preload: () => void
}

class EasyRouterGroup implements IGroup{

    public name: string;
    public routes:KeyedCollection< Array< IRoute > >;
    public load: () => void;
    public unload: () => void;
    public preload: () => void;

    public add( route: IRoute ): void{

    }

    constructor() {

    }

}

interface IConfig {
    catalogName: string,
    onError: (string) => void,
    contentSelector: string,
    onPreload: () => void,
    onLoad: () => void
}

export interface IEasyRouter {
    setRoute(_url: string, _group : string, _load: () => void, _unload: () => void): void;
    setGroup( Array<IRoute> );
    removeGroup(group : string): void;
    load(url: string): void;
}


export class EasyRouter implements IEasyRouter {

    public version: string;

    private config: IConfig;

    private routes: KeyedCollection< Array< IRoute > >;

    private currentUrl: string;

    private getCurrent(): IRoute{
        return this.find(this.currentUrl);
    }

    private redirect(url: string): void{
        var newRoute = this.find(url);
        if(newRoute == null){
            this.config.onError(url);
            return;
        }
        this.config.onPreload();
        if(newRoute.group != this.getCurrent().group){
            window.location.href = url;
            return;
        }
        $.ajax( url )
            .done(function(data) {
                var tempDom = $('<output>').append($.parseHTML(data));
                var $content = $(tempDom).find(this.config.contentSelector).first();
                window.history.pushState(
                    null,
                    $(tempDom).find('title').text(),
                    url
                );
                if($content.length == 0){
                    console.warn(this.config.contentSelector + 'not found');
                }else{
                    this.currentUrl = url;
                    $(this.config.contentSelector).html($content.html());
                }
            })
            .fail(function() {
                console.warn(url + ' ajax fail');
            });
    }
    constructor() {

        this.routes = new KeyedCollection< Array <IRoute> >();
        var scope = this;

        $('a:not([href^=mailto], [href^="#"], [rel="norouter"])').on('click.redirect', function(){
            var url = this.href.replace(/https?:\/\/[^\/]+/i, "");
            scope.redirect(url);
            return false;
        });

        this.config = {
            catalogName: '',
            onError: function(){} ,
            contentSelector: '.router-content',
            onPreload: function(){},
            onLoad: function(){}
        };

        this.version = '0.2';

        this.currentUrl = window.location.pathname;
    }
    public setConfig(config: IConfig): void{
        this.config = config;
    }
    public setRoute(_url: string, _group : string, _load: () => void, _unload: () => void): void{
        var temp_route : IRoute = {
            url: this.config.catalogName + _url,
            group: _group,
            load: _load,
            unload: _unload,
            loaded: false,
            cache: ''
        };

        if( ! this.routes.Isset(_group) ){
            this.routes.Add(_group,[temp_route])
        }else{
            this.routes.Item(_group).push(temp_route);
        }
    }

    public setGroup(routes: Array<IRoute>): void{

    }
    
    public removeGroup(group : string): void{
        this.routes.Remove(group);
    }
    private find(url: string): IRoute{
        for (let group of this.routes.Values()) {
            for (let route of group) {
                if(route.url == url)
                    return route;
            }
        }
        return null;
    }
    private findInGroup(url: string, group: string): IRoute{
        for (let route of this.routes[group]) {
            if(route.url == url)
                return route;
        }
        return null;
    }
    public load(url: string): void{
        var route: IRoute = this.find(url);
        route.load();
    }
}