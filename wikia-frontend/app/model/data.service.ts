import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/delay";
import {Post} from './post.model';

@Injectable()
export class DataService {

    private url: string = `https://${location.hostname}:9000`;
    private jwtToken: string;
    private isAdmin: boolean;
    private user: string;

    constructor(private http: Http) { }

    public isAuthenticated(): boolean{
        return this.jwtToken != null;
    }

    public isUserAdmin(): boolean {
        return this.isAdmin;
    }

    public getUsername(): string {
        return this.user;
    }

    /** Authentication operations */

    login(user: string, pass: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: this.url + "/login",
            body: { username: user, password: pass },
            headers: headers
        })).map(response => {
            var headers = response.headers;
            this.jwtToken = headers.get('Authorization');
            this.isAdmin = headers.get('is-admin') == "true";
            this.user=user;
            return this.jwtToken!=null;
        });
    }

    logout() {
        this.jwtToken = null;
        this.isAdmin = false;
    }

    /** Post persistence operations */

    getPosts(pageIndex: number, pageSize: number, content?: string): Observable<Post[]>{
        var params = new URLSearchParams();
        params.set("pageIndex", String(pageIndex));
        params.set("pageSize", String(pageSize));
        if( content != null ){
            params.set("content",content);
        }
        return this.sendRequest(RequestMethod.Get, this.url+"/posts",undefined, undefined, params);
    }

    getPost(getPostUrl: string): Observable<Post> {
        return this.sendRequest(RequestMethod.Get, this.url+getPostUrl);
    }

    savePost(post: Post): Observable<Post> {
        return this.sendRequest(RequestMethod.Post, this.url+"/posts/create", post);
    }

    updatePost(updatePostUrl: string, post : Post): Observable<Post> {
        return this.sendRequest(RequestMethod.Put, this.url + updatePostUrl, post);
    }

    addComment(addCommentUrl: string, comment : any): Observable<Post> {
        return this.sendRequest(RequestMethod.Patch, this.url + addCommentUrl, comment);
    }

    deletePost(deletePostUrl: string): Observable<any> {
        return this.sendRequest(RequestMethod.Delete, this.url+deletePostUrl);
    }

    countPosts(content: string): Observable<number> {
        var params = new URLSearchParams();
        if( content != null ){
            params.set("content",content);
        }
        return this.sendRequest(RequestMethod.Get, this.url+"/posts/count",undefined, undefined, params);
    }

    /** User persistence operations */

    getUsers(): Observable<User[]> {
        return this.sendRequest(RequestMethod.Get, this.url+"/users");
    }

    getUser(getUserUrl: string): Observable<User> {
        return this.sendRequest(RequestMethod.Get, this.url+getUserUrl);
    }

    saveUser(user : User): Observable<User> {
        return this.sendRequest(RequestMethod.Post, this.url+"/users/create", user);
    }

    updateUser(updateUserUrl: string, user : User): Observable<User> {
        return this.sendRequest(RequestMethod.Put, this.url + updateUserUrl, user);
    }

    deleteUser(deleteUserUrl: string): Observable<any> {
        return this.sendRequest(RequestMethod.Delete, this.url+deleteUserUrl);
    }

    private sendRequest(verb: RequestMethod, url: string, body?: any, headers?: Headers, params?: URLSearchParams): Observable<any> {
        let requestHeaders = headers==null? new Headers() : headers;
        requestHeaders.set("Authorization", this.jwtToken);
        requestHeaders.set('Content-Type','application/json; charset=UTF-8');
        return this.http.request(new Request({
                method: verb,
                url: url,
                body: body,
                headers: requestHeaders,
                search: params}))
            .map(response => {
                if ( verb != RequestMethod.Delete ) {
                    return response.json();
                }
            })
            .catch((error: Response) => Observable.throw(`Network Error: ${error.statusText} (${error.status})`));
    }

}