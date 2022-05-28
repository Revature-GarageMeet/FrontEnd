export class Post {
    id: number = 0;
    entry: string = "";
    userId: number = 0;
    likes: number = 0;
    dateCreated: Date = new Date();
    bandId: number = 0;
    type: string = "";
    postComments: Array<Comments> = new Array<Comments>();
    showComments: boolean = false;
}

export class Comments {
    commentId: number = 0;
    userId: number = 0;
    postId: number = 0;
    entry: string = "";
    likes: number = 0;
    dateCreated: Date = new Date();
}