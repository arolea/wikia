"use strict";
var User = (function () {
    function User(username, roles, _links) {
        this.username = username;
        this.roles = roles;
        this._links = _links;
    }
    return User;
}());
exports.User = User;
