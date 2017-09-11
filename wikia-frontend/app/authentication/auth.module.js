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
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var auth_component_1 = require('./auth.component');
var auth_guard_1 = require('./auth.guard');
var router_1 = require('@angular/router');
var model_module_1 = require('../model/model.module');
var admin_guard_1 = require("./admin.guard");
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule, model_module_1.ModelModule],
            providers: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard],
            declarations: [auth_component_1.AuthComponent],
            exports: [auth_component_1.AuthComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
