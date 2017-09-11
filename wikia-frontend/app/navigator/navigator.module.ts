import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {PostsComponent} from './posts.component';
import {NavigatorComponent} from './navigator.component';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [NavigatorComponent],
    exports: [NavigatorComponent]
})
export class NavigatorModule{

}