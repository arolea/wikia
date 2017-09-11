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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/delay");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.url = "https://" + location.hostname + ":9000";
    }
    DataService.prototype.isAuthenticated = function () {
        return this.jwtToken != null;
    };
    DataService.prototype.isUserAdmin = function () {
        return this.isAdmin;
    };
    DataService.prototype.getUsername = function () {
        return this.user;
    };
    /** Authentication operations */
    DataService.prototype.login = function (user, pass) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        return this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: this.url + "/login",
            body: { username: user, password: pass },
            headers: headers
        })).map(function (response) {
            var headers = response.headers;
            _this.jwtToken = headers.get('Authorization');
            _this.isAdmin = headers.get('is-admin') == "true";
            _this.user = user;
            return _this.jwtToken != null;
        });
    };
    DataService.prototype.logout = function () {
        this.jwtToken = null;
        this.isAdmin = false;
    };
    /** Post persistence operations */
    DataService.prototype.getPosts = function (pageIndex, pageSize, content) {
        var params = new http_1.URLSearchParams();
        params.set("pageIndex", String(pageIndex));
        params.set("pageSize", String(pageSize));
        if (content != null) {
            params.set("content", content);
        }
        return this.sendRequest(http_1.RequestMethod.Get, this.url + "/posts", undefined, undefined, params);
    };
    DataService.prototype.getPost = function (getPostUrl) {
        return this.sendRequest(http_1.RequestMethod.Get, this.url + getPostUrl);
    };
    DataService.prototype.savePost = function (post) {
        return this.sendRequest(http_1.RequestMethod.Post, this.url + "/posts/create", post);
    };
    DataService.prototype.updatePost = function (updatePostUrl, post) {
        return this.sendRequest(http_1.RequestMethod.Put, this.url + updatePostUrl, post);
    };
    DataService.prototype.addComment = function (addCommentUrl, comment) {
        return this.sendRequest(http_1.RequestMethod.Patch, this.url + addCommentUrl, comment);
    };
    DataService.prototype.deletePost = function (deletePostUrl) {
        return this.sendRequest(http_1.RequestMethod.Delete, this.url + deletePostUrl);
    };
    DataService.prototype.countPosts = function (content) {
        var params = new http_1.URLSearchParams();
        if (content != null) {
            params.set("content", content);
        }
        return this.sendRequest(http_1.RequestMethod.Get, this.url + "/posts/count", undefined, undefined, params);
    };
    /** User persistence operations */
    DataService.prototype.getUsers = function () {
        return this.sendRequest(http_1.RequestMethod.Get, this.url + "/users");
    };
    DataService.prototype.getUser = function (getUserUrl) {
        return this.sendRequest(http_1.RequestMethod.Get, this.url + getUserUrl);
    };
    DataService.prototype.saveUser = function (user) {
        return this.sendRequest(http_1.RequestMethod.Post, this.url + "/users/create", user);
    };
    DataService.prototype.updateUser = function (updateUserUrl, user) {
        return this.sendRequest(http_1.RequestMethod.Put, this.url + updateUserUrl, user);
    };
    DataService.prototype.deleteUser = function (deleteUserUrl) {
        return this.sendRequest(http_1.RequestMethod.Delete, this.url + deleteUserUrl);
    };
    DataService.prototype.sendRequest = function (verb, url, body, headers, params) {
        var requestHeaders = headers == null ? new http_1.Headers() : headers;
        requestHeaders.set("Authorization", this.jwtToken);
        requestHeaders.set('Content-Type', 'application/json; charset=UTF-8');
        return this.http.request(new http_1.Request({
            method: verb,
            url: url,
            body: body,
            headers: requestHeaders,
            search: params }))
            .map(function (response) {
            if (verb != http_1.RequestMethod.Delete) {
                return response.json();
            }
        })
            .catch(function (error) { return Observable_1.Observable.throw("Network Error: " + error.statusText + " (" + error.status + ")"); });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
