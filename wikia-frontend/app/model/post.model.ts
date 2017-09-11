export class Post {

     constructor(
            public title?: string,
            public content?: string,
            public visible?: boolean,
            public dateCreated?: Date,
            public comments?: any,
            public _links?: any) { }

}