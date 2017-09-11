"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var posts_component_1 = require('./posts.component');
var navigator_module_1 = require('../navigator/navigator.module');
var model_module_1 = require('../model/model.module');
var postseditor_component_1 = require('./postseditor.component');
var Subject_1 = require('rxjs/Subject');
var PostsModule = (function () {
    function PostsModule() {
    }
    PostsModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, navigator_module_1.NavigatorModule, model_module_1.ModelModule],
            declarations: [posts_component_1.PostsComponent, postseditor_component_1.PostEditorComponent],
            providers: [
                {
                    provide: "postObserver",
                    useFactory: function () {
                        var subject = new Subject_1.Subject();
                        return subject;
                    }
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PostsModule);
    return PostsModule;
}());
exports.PostsModule = PostsModule;
