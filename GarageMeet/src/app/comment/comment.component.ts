import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comments, Post } from '../post';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user';

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

  user: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  constructor(private api: CommentService, private userData: UserdataService) { }

  ngOnInit(): void {
    this.user = this.userData.GetUser();
  }

  submitComment(): void {
    this.comment.entry = this.textEntry;
    this.comment.userId = this.user.id;
    this.api.addComment(this.comment, this.post.id).subscribe((res) => {
      this.textEntry = "";
    }
    )
  }

}
