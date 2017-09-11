import { Component } from "@angular/core";
import {DataService} from '../model/data.service';
import {Router} from '@angular/router';

@Component({
    selector: "navigator-component",
    moduleId: module.id,
    templateUrl: "navigator.component.html",
    styleUrls: ["navigator.component.css"]
})
export class NavigatorComponent {

    constructor(private dataService: DataService, private router: Router){
    }

    logout() {
        this.dataService.logout();
        this.router.navigateByUrl("/");
    }

    isAdmin(): boolean{
        return this.dataService.isUserAdmin();
    }

}