import { Routes, RouterModule } from "@angular/router";
import {AuthComponent} from './authentication/auth.component';
import {PostsComponent} from './posts/posts.component';
import {AuthGuard} from './authentication/auth.guard';
import {PostEditorComponent} from './posts/postseditor.component';
import {UserEditorComponent} from "./users/userseditor.component";
import {UsersComponent} from "./users/users.component";
import {AdminGuard} from "./authentication/admin.guard";

const routes: Routes = [
    {
        path: "posts/:mode/:id",
        component: PostEditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "posts/:mode",
        component: PostEditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "users/:mode/:id",
        component: UserEditorComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: "users/:mode",
        component: UserEditorComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: AuthComponent
    },
    {
        path: "posts",
        component: PostsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "users",
        component: UsersComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full"
    }];

export const WikiaRouting = RouterModule.forRoot(routes);