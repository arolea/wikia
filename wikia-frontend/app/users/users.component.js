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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var data_service_1 = require('../model/data.service');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var UsersComponent = (function () {
    function UsersComponent(dataService, router, userSubject) {
        var _this = this;
        this.dataService = dataService;
        this.router = router;
        this.userSubject = userSubject;
        this.users = [];
        this.fetchUsersFromDatabase();
        this.userSubject.subscribe(function (newUser) { _this.fetchUsersFromDatabase(); });
    }
    UsersComponent.prototype.getUsers = function () {
        return this.users;
    };
    UsersComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.dataService
            .deleteUser(user._links["delete_self"]["href"])
            .subscribe(function (res) { return _this.fetchUsersFromDatabase(); });
    };
    UsersComponent.prototype.canUpdate = function (user) {
        return user._links["update_self"] != null;
    };
    UsersComponent.prototype.canDelete = function (user) {
        return user._links["delete_self"] != null;
    };
    UsersComponent.prototype.getUpdateLink = function (user) {
        return user._links["update_self"]["href"];
    };
    UsersComponent.prototype.fetchUsersFromDatabase = function () {
        var _this = this;
        this.dataService.getUsers().subscribe(function (data) {
            _this.users = data;
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: "users-component",
            moduleId: module.id,
            templateUrl: "users.component.html"
        }),
        __param(2, core_1.Inject("userObserver")), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, Observable_1.Observable])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
