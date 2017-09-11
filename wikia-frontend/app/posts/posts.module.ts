import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PostsComponent} from './posts.component';
import {NavigatorModule} from '../navigator/navigator.module';
import {ModelModule} from '../model/model.module';
import {PostEditorComponent} from './postseditor.component';
import {Subject} from 'rxjs/Subject';

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, NavigatorModule, ModelModule],
    declarations: [PostsComponent, PostEditorComponent],
    providers: [
        {
            provide: "postObserver",
            useFactory: () => {
                let subject = new Subject<boolean>();
                return subject;
            }
        }
    ]
})
export class PostsModule{

}