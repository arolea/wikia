import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { DataService } from "../model/data.service";

@Injectable()
export class AdminGuard {

    constructor(private router: Router, private auth: DataService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isUserAdmin()) {
            this.router.navigateByUrl("/posts");
            return false;
        }
        return true;
    }

}