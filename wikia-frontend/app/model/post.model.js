"use strict";
var Post = (function () {
    function Post(title, content, visible, dateCreated, comments, _links) {
        this.title = title;
        this.content = content;
        this.visible = visible;
        this.dateCreated = dateCreated;
        this.comments = comments;
        this._links = _links;
    }
    return Post;
}());
exports.Post = Post;
