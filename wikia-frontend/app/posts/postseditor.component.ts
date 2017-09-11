import {Component, Inject} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {Post} from '../model/post.model';
import {DataService} from '../model/data.service';
import {Observer} from 'rxjs/Observer';

@Component({
    selector: "post-edit-form",
    moduleId: module.id,
    templateUrl: "postseditor.component.html",
    styleUrls: ["postseditor.component.css"]
})
export class PostEditorComponent {

    post: Post = new Post("","",false);

    editing: boolean = false;
    viewing: boolean = false;
    creating: boolean = false;

    id: string = null;

    newComment: string;

    constructor(private model: DataService, private activeRoute: ActivatedRoute, private router: Router, @Inject("postObserver") private postObserver: Observer<Post>) {
        activeRoute.params.subscribe(params => {
            this.editing = this.activeRoute.snapshot.params["mode"] == "update";
            this.viewing = this.activeRoute.snapshot.params["mode"] == "view";
            this.creating = this.activeRoute.snapshot.params["mode"] == "create";
            if (this.editing || this.viewing) {
                let id = this.activeRoute.snapshot.params["id"];
                model.getPost('/posts/view/'+id).subscribe(post => this.post=post);
            }
        });
    }

    addCommentToPost(){
        let comment = {authorName: this.model.getUsername(), content: this.newComment};
        if(this.post.comments == undefined){
            this.post.comments = [];
        }
        this.post.comments.push(comment);
        this.model.addComment(this.post._links["comment_self"]["href"],comment)
            .subscribe(newPost => this.post = newPost);
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            if ( this.editing ) {
                this.model.updatePost(this.post._links["update_self"]["href"],this.post).subscribe(newPost => this.postObserver.next(newPost));
                this.router.navigateByUrl("/posts");
            } else if ( this.creating ) {
                this.model.savePost(this.post).subscribe(newPost => this.postObserver.next(newPost));
                this.router.navigateByUrl("/posts");
            }
        }
    }

}
