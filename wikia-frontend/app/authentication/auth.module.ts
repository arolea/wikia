import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {AuthGuard} from './auth.guard';
import {RouterModule} from '@angular/router';
import {ModelModule} from '../model/model.module';
import {AdminGuard} from './admin.guard';

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, RouterModule, ModelModule],
    providers: [AuthGuard, AdminGuard],
    declarations: [AuthComponent],
    exports: [AuthComponent]
})
export class AuthModule {

}