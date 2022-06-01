import { Component, OnInit } from '@angular/core';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserdataService } from '../services/userdata.service';
import { User } from '../models/user';
import { PostService } from '../services/post.service';
import { EditProfileService } from '../services/edit-profile.service';
import { Post } from '../models/post';
import { StringconversionService } from '../services/stringconversion.service';
import { BandmemberService } from '../services/bandmember.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  modalRef: MdbModalRef<EditprofileComponent> | null = null;

  user: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  post: Post = {
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

  posts: Array<Post> = [];
  opacity: string = "100%";
  ownsProfile: boolean = true;
  inABand!: boolean;

  // Used to notify user of no posts to show or show posts if there are any ~Bailey
  hasNoPosts: boolean = true;

  constructor(private modalService: MdbModalService,
    private userData: UserdataService, private postData: PostService, private editProfileData: EditProfileService,
    private entryChange: StringconversionService, private bandMemService: BandmemberService) { }

  openEditModal() {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(EditprofileComponent, {
      modalClass: 'modal-dialog-centered',
      data: { editUser: this.user }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
      this.editProfileData.updateUserData(this.user).subscribe();
    });
  }

  ngOnInit(): void {
    this.user = this.userData.GetUser();
    // this.postData.getUserPost(this.user.id)
    // .subscribe((res: {results: Post[];})=>{

    //   this.posts = res;
    //   console.log(this.posts);
    //   for(let i = 0; i < this.posts.length; i++)
    //     {
    //       this.posts[i].entry = this.posts[i].entry.replaceAll(`[ENTER]`, '\n');
    //       //console.log(this.posts[i].entry);
    //     }
    // });
    this.postData.getUserPost(this.user.id).subscribe(res => {
      this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
      {
        this.posts[i].entry = this.entryChange.ChangeCharacter(this.posts[i].entry);
      }
      console.log(this.posts.length);
      if(this.posts.length > 0) {
        this.hasNoPosts = false;
      }
      this.bandMemService.isInABand(this.user.id).subscribe((message) => {
        this.inABand = message;
      });
    });
  }

}
