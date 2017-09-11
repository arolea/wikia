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
var PostsComponent = (function () {
    function PostsComponent(dataService, router, postSubject) {
        var _this = this;
        this.dataService = dataService;
        this.router = router;
        this.postSubject = postSubject;
        this.posts = [];
        this.pageIndex = 0;
        this.pageSize = 10;
        this.getPostsPage();
        this.postSubject.subscribe(function (newPost) { _this.getPostsPage(); });
    }
    PostsComponent.prototype.getPosts = function () {
        return this.posts;
    };
    PostsComponent.prototype.update = function () {
        this.pageIndex = 0;
        this.getPostsPage();
    };
    PostsComponent.prototype.deletePost = function (post) {
        var _this = this;
        this.dataService
            .deletePost(post._links["delete_self"]["href"])
            .subscribe(function (res) { return _this.getPostsPage(); });
    };
    PostsComponent.prototype.viewPost = function (post) {
        this.router.navigateByUrl(post._links["get_self"]["href"]);
    };
    PostsComponent.prototype.canUpdate = function (post) {
        return post._links["update_self"] != null;
    };
    PostsComponent.prototype.canDelete = function (post) {
        return post._links["delete_self"] != null;
    };
    PostsComponent.prototype.getUpdateLink = function (post) {
        return post._links["update_self"]["href"];
    };
    PostsComponent.prototype.getViewLink = function (post) {
        return post._links["get_self"]["href"];
    };
    PostsComponent.prototype.getPageRange = function () {
        var numberOfPages = this.postCount % this.pageSize == 0 ? this.postCount / this.pageSize : this.postCount / this.pageSize + 1;
        return Array.apply(null, { length: numberOfPages }).map(Function.call, Number);
    };
    PostsComponent.prototype.updatePageIndex = function (index) {
        this.pageIndex = index;
        this.getPostsPage();
    };
    PostsComponent.prototype.getPostsPage = function () {
        var _this = this;
        this.dataService.countPosts(this.content).subscribe(function (counter) { return _this.postCount = counter; });
        this.dataService.getPosts(this.pageIndex, this.pageSize, this.content).subscribe(function (data) {
            _this.posts = data;
        });
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: "posts-component",
            moduleId: module.id,
            templateUrl: "posts.component.html"
        }),
        __param(2, core_1.Inject("postObserver")), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, Observable_1.Observable])
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
