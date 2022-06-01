import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Band } from '../models/band';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-create-band-post',
  templateUrl: './create-band-post.component.html',
  styleUrls: ['./create-band-post.component.css']
})
export class CreateBandPostComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<CreateBandPostComponent>,
    private postService: PostService,
    private userData: UserdataService
  ) { }

  postCurrBand: Band = {
    id: 0,
    title: '',
    description: '',
    memberLimit: 0
  }

  newPost: Post = {
    type: '',
    entry: '',
    userId: 0,
    bandId: 0,
    id: 0,
    likes: 0,
    dateCreated: new Date(),
    postComments: [],
    showComments: false
  }

  ngOnInit(): void {
    this.newPost.userId = this.userData.GetUser().id;
    this.newPost.bandId = this.postCurrBand.id;
    this.newPost.type = "Band";
  }

  attemptToClose() {
    const dateCreated = new Date();
    this.newPost.dateCreated = dateCreated;
    this.postService.createBandPost(this.newPost).subscribe((res) => {
      this.modalRef.close();
    });
  }

}
