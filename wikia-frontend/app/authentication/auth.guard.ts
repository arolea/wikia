import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { DataService } from "../model/data.service";

@Injectable()
export class AuthGuard {

    constructor(private router: Router, private auth: DataService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl("/login");
            return false;
        }
        return true;
    }

}
