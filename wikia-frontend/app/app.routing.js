"use strict";
var router_1 = require("@angular/router");
var auth_component_1 = require('./authentication/auth.component');
var posts_component_1 = require('./posts/posts.component');
var auth_guard_1 = require('./authentication/auth.guard');
var postseditor_component_1 = require('./posts/postseditor.component');
var userseditor_component_1 = require("./users/userseditor.component");
var users_component_1 = require("./users/users.component");
var admin_guard_1 = require("./authentication/admin.guard");
var routes = [
    {
        path: "posts/:mode/:id",
        component: postseditor_component_1.PostEditorComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: "posts/:mode",
        component: postseditor_component_1.PostEditorComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: "users/:mode/:id",
        component: userseditor_component_1.UserEditorComponent,
        canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard]
    },
    {
        path: "users/:mode",
        component: userseditor_component_1.UserEditorComponent,
        canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard]
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: auth_component_1.AuthComponent
    },
    {
        path: "posts",
        component: posts_component_1.PostsComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: "users",
        component: users_component_1.UsersComponent,
        canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard]
    },
    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full"
    }];
exports.WikiaRouting = router_1.RouterModule.forRoot(routes);
