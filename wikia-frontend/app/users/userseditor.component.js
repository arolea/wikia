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
var router_1 = require("@angular/router");
var user_model_1 = require('../model/user.model');
var data_service_1 = require('../model/data.service');
var UserEditorComponent = (function () {
    function UserEditorComponent(model, activeRoute, router, userObserver) {
        var _this = this;
        this.model = model;
        this.activeRoute = activeRoute;
        this.router = router;
        this.userObserver = userObserver;
        this.user = new user_model_1.User();
        this.editing = false;
        this.creating = false;
        this.isAdmin = false;
        this.isUser = false;
        this.id = null;
        activeRoute.params.subscribe(function (params) {
            _this.editing = _this.activeRoute.snapshot.params["mode"] == "update";
            _this.creating = _this.activeRoute.snapshot.params["mode"] == "create";
            if (_this.editing) {
                var id = _this.activeRoute.snapshot.params["id"];
                model.getUser('/users/view/' + id).subscribe(function (user) {
                    _this.user = user;
                    if (_this.user.roles != undefined) {
                        _this.isAdmin = (_this.user.roles.indexOf("ROLE_ADMIN") > -1);
                        _this.isUser = (_this.user.roles.indexOf("ROLE_USER") > -1);
                    }
                });
            }
        });
    }
    UserEditorComponent.prototype.submitForm = function (form) {
        var _this = this;
        if (form.valid) {
            var roles = [];
            if (this.isAdmin) {
                roles.push("ROLE_ADMIN");
            }
            if (this.isUser) {
                roles.push("ROLE_USER");
            }
            this.user.roles = roles;
            if (this.editing) {
                this.model.updateUser(this.user._links["update_self"]["href"], this.user).subscribe(function (newUser) { return _this.userObserver.next(newUser); });
            }
            else if (this.creating) {
                this.model.saveUser(this.user).subscribe(function (newUser) { return _this.userObserver.next(newUser); });
            }
            this.router.navigateByUrl("/users");
        }
    };
    UserEditorComponent = __decorate([
        core_1.Component({
            selector: "user-edit-form",
            moduleId: module.id,
            templateUrl: "userseditor.component.html",
            styleUrls: ["userseditor.component.css"]
        }),
        __param(3, core_1.Inject("userObserver")), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute, router_1.Router, Object])
    ], UserEditorComponent);
    return UserEditorComponent;
}());
exports.UserEditorComponent = UserEditorComponent;
