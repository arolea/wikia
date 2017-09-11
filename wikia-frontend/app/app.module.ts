import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WikiaRouting } from "./app.routing";
import { AppComponent } from "./app.component";
import {AuthModule} from './authentication/auth.module';
import {PostsModule} from './posts/posts.module';
import {NavigatorModule} from './navigator/navigator.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersModule} from "./users/users.module";

@NgModule({
    imports: [BrowserModule, WikiaRouting, AuthModule, PostsModule, UsersModule, NavigatorModule, ReactiveFormsModule],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }