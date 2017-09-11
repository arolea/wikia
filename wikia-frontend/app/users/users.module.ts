import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UsersComponent} from './users.component';
import {NavigatorModule} from '../navigator/navigator.module';
import {ModelModule} from '../model/model.module';
import {UserEditorComponent} from './userseditor.component';
import {Subject} from 'rxjs/Subject';

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, NavigatorModule, ModelModule],
    declarations: [UsersComponent, UserEditorComponent],
    providers: [
        {
            provide: "userObserver",
            useFactory: () => {
                let subject = new Subject<boolean>();
                return subject;
            }
        }
    ]
})
export class UsersModule{

}