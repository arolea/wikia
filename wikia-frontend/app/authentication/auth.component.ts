import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "../model/data.service";

@Component({
    moduleId: module.id,
    templateUrl: "auth.component.html",
    styleUrls: ["auth.component.css"]
})
export class AuthComponent {
    public username: string;
    public password: string;
    public errorMessage: string;

    constructor(private router: Router, private auth: DataService) { }

    authenticate(form: NgForm) {
        if (form.valid) {
            this.auth.login(this.username, this.password)
                .subscribe(response => {
                    if (response) {
                        this.router.navigateByUrl("/posts");
                    }
                    this.errorMessage = "Authentication Failed";
                }, error => {
                    this.errorMessage = "Authentication Error";
                });
        } else {
            this.errorMessage = "Form Data Invalid";
        }
    }
}
