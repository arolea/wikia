import {Component, Inject} from "@angular/core";
import {DataService} from '../model/data.service';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: "users-component",
    moduleId: module.id,
    templateUrl: "users.component.html"
})
export class UsersComponent {

    private users: User[] = [];

    constructor(private dataService: DataService, private router: Router, @Inject("userObserver") private userSubject: Observable<User>){
        this.fetchUsersFromDatabase();
        this.userSubject.subscribe(newUser => { this.fetchUsersFromDatabase(); });
    }

    getUsers(): User[] {
        return this.users;
    }

    deleteUser(user: User){
        this.dataService
            .deleteUser(user._links["delete_self"]["href"])
            .subscribe(res => this.fetchUsersFromDatabase());
    }

    canUpdate(user: User): boolean{
        return user._links["update_self"] != null;
    }

    canDelete(user: User): boolean{
        return user._links["delete_self"] != null;
    }

    getUpdateLink(user: User): string{
        return user._links["update_self"]["href"];
    }


    private fetchUsersFromDatabase() {
        this.dataService.getUsers().subscribe(data => {
            this.users = data;
        });
    }

}