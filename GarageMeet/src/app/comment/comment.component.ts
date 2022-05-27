import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comments, Post } from '../post';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  post!: Post;

  textEntry!: string;

  comment: Comments = {
    commentId: 0,
    userId: 0,
    postId: 0,
    entry: "",
    likes: 0,
    dateCreated: new Date()
  }

  constructor(private api: CommentService) { }

  ngOnInit(): void {
  }

  submitComment(): void {
    this.comment.entry = this.textEntry;
    this.comment.userId = this.post.userId;
    this.api.addComment(this.comment, this.post.id).subscribe((res) => {
      this.textEntry = "";
    }
    )
  }

}
