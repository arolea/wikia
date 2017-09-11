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
var users_component_1 = require('./users.component');
var navigator_module_1 = require('../navigator/navigator.module');
var model_module_1 = require('../model/model.module');
var userseditor_component_1 = require('./userseditor.component');
var Subject_1 = require('rxjs/Subject');
var UsersModule = (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, navigator_module_1.NavigatorModule, model_module_1.ModelModule],
            declarations: [users_component_1.UsersComponent, userseditor_component_1.UserEditorComponent],
            providers: [
                {
                    provide: "userObserver",
                    useFactory: function () {
                        var subject = new Subject_1.Subject();
                        return subject;
                    }
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
