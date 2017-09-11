import {Component, Inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {User} from '../model/user.model';
import {DataService} from '../model/data.service';
import {Observer} from 'rxjs/Observer';

@Component({
    selector: "user-edit-form",
    moduleId: module.id,
    templateUrl: "userseditor.component.html",
    styleUrls: ["userseditor.component.css"]
})
export class UserEditorComponent {

    user: User = new User();

    editing: boolean = false;
    creating: boolean = false;

    isAdmin: boolean = false;
    isUser: boolean = false;

    id: string = null;

    constructor(private model: DataService, private activeRoute: ActivatedRoute, private router: Router, @Inject("userObserver") private userObserver: Observer<User>) {
        activeRoute.params.subscribe(params => {
            this.editing = this.activeRoute.snapshot.params["mode"] == "update";
            this.creating = this.activeRoute.snapshot.params["mode"] == "create";
            if (this.editing) {
                let id = this.activeRoute.snapshot.params["id"];
                model.getUser('/users/view/'+id).subscribe(user => {
                    this.user=user;
                    if(this.user.roles != undefined) {
                        this.isAdmin = ( this.user.roles.indexOf("ROLE_ADMIN") > -1 );
                        this.isUser = ( this.user.roles.indexOf("ROLE_USER") > -1 );
                    }
                });
            }
        });
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            let roles = [];
            if(this.isAdmin){
                roles.push("ROLE_ADMIN");
            } if (this.isUser) {
                roles.push("ROLE_USER");
            }
            this.user.roles=roles;
            if ( this.editing ) {
                this.model.updateUser(this.user._links["update_self"]["href"],this.user).subscribe(newUser => this.userObserver.next(newUser));
            } else if ( this.creating ) {
                this.model.saveUser(this.user).subscribe(newUser => this.userObserver.next(newUser));
            }
            this.router.navigateByUrl("/users");
        }
    }

}