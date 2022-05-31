import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Post } from '../post';

@Component({
  selector: 'app-posttype',
  templateUrl: './posttype.component.html',
  styleUrls: ['./posttype.component.css']
})
export class PosttypeComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<PosttypeComponent>) { }

  createPost!: Post;

  id!: number;
  entry!: string;
  userId!: number;
  likes: number = 0;
  dateCreated: Date = new Date();
  bandId!: number;
  type!: string;
  showComments: boolean = false;

  ngOnInit(): void {
    console.log(this.createPost.type);
  }

  close() {
    const opacity = "100%";
    this.modalRef.close(opacity);
  }
}
