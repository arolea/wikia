import {Component, Inject} from "@angular/core";
import {DataService} from '../model/data.service';
import {Post} from '../model/post.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: "posts-component",
    moduleId: module.id,
    templateUrl: "posts.component.html"
})
export class PostsComponent {

    private pageIndex: number;
    private pageSize: number;
    private postCount: number;
    private content: string;

    private posts: Post[] = [];

    constructor(private dataService: DataService, private router: Router, @Inject("postObserver") private postSubject: Observable<Post>){
        this.pageIndex = 0;
        this.pageSize = 10;
        this.getPostsPage();
        this.postSubject.subscribe(newPost => { this.getPostsPage(); });
    }

    getPosts(): Post[] {
        return this.posts;
    }

    update() {
        this.pageIndex = 0;
        this.getPostsPage();
    }

    deletePost(post: Post){
        this.dataService
            .deletePost(post._links["delete_self"]["href"])
            .subscribe(res => this.getPostsPage());
    }

    viewPost(post: Post){
        this.router.navigateByUrl(post._links["get_self"]["href"]);
    }

    canUpdate(post: Post): boolean{
        return post._links["update_self"] != null;
    }

    canDelete(post: Post): boolean{
        return post._links["delete_self"] != null;
    }

    getUpdateLink(post: Post): string{
        return post._links["update_self"]["href"];
    }

    getViewLink(post: Post): string{
        return post._links["get_self"]["href"];
    }

    getPageRange(): number{
        let numberOfPages = this.postCount%this.pageSize == 0 ? this.postCount/this.pageSize : this.postCount/this.pageSize+1;
        return Array.apply(null, {length: numberOfPages}).map(Function.call, Number);
    }

    updatePageIndex(index: number){
        this.pageIndex = index;
        this.getPostsPage();
    }

    private getPostsPage() {
        this.dataService.countPosts(this.content).subscribe(counter => this.postCount = counter);
        this.dataService.getPosts(this.pageIndex, this.pageSize, this.content).subscribe(data => {
            this.posts = data;
        });
    }

}