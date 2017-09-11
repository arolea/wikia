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
var post_model_1 = require('../model/post.model');
var data_service_1 = require('../model/data.service');
var PostEditorComponent = (function () {
    function PostEditorComponent(model, activeRoute, router, postObserver) {
        var _this = this;
        this.model = model;
        this.activeRoute = activeRoute;
        this.router = router;
        this.postObserver = postObserver;
        this.post = new post_model_1.Post("", "", false);
        this.editing = false;
        this.viewing = false;
        this.creating = false;
        this.id = null;
        activeRoute.params.subscribe(function (params) {
            _this.editing = _this.activeRoute.snapshot.params["mode"] == "update";
            _this.viewing = _this.activeRoute.snapshot.params["mode"] == "view";
            _this.creating = _this.activeRoute.snapshot.params["mode"] == "create";
            if (_this.editing || _this.viewing) {
                var id = _this.activeRoute.snapshot.params["id"];
                model.getPost('/posts/view/' + id).subscribe(function (post) { return _this.post = post; });
            }
        });
    }
    PostEditorComponent.prototype.addCommentToPost = function () {
        var _this = this;
        var comment = { authorName: this.model.getUsername(), content: this.newComment };
        if (this.post.comments == undefined) {
            this.post.comments = [];
        }
        this.post.comments.push(comment);
        this.model.addComment(this.post._links["comment_self"]["href"], comment)
            .subscribe(function (newPost) { return _this.post = newPost; });
    };
    PostEditorComponent.prototype.submitForm = function (form) {
        var _this = this;
        if (form.valid) {
            if (this.editing) {
                this.model.updatePost(this.post._links["update_self"]["href"], this.post).subscribe(function (newPost) { return _this.postObserver.next(newPost); });
                this.router.navigateByUrl("/posts");
            }
            else if (this.creating) {
                this.model.savePost(this.post).subscribe(function (newPost) { return _this.postObserver.next(newPost); });
                this.router.navigateByUrl("/posts");
            }
        }
    };
    PostEditorComponent = __decorate([
        core_1.Component({
            selector: "post-edit-form",
            moduleId: module.id,
            templateUrl: "postseditor.component.html",
            styleUrls: ["postseditor.component.css"]
        }),
        __param(3, core_1.Inject("postObserver")), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute, router_1.Router, Object])
    ], PostEditorComponent);
    return PostEditorComponent;
}());
exports.PostEditorComponent = PostEditorComponent;
