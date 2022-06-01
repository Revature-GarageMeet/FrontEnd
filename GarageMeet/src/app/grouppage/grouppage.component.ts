import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreateBandPostComponent } from '../create-band-post/create-band-post.component';
import { Band } from '../models/band';
import { User } from '../models/user';
import { Comments, Post } from '../post';
import { BandService } from '../services/band.service';
import { BandmemberService } from '../services/bandmember.service';
import { CommentService } from '../services/comment.service';
import { LoginService } from '../services/login.service';
import { PostService } from '../services/post.service';
import { StringconversionService } from '../services/stringconversion.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})

export class GrouppageComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private bandmemberService: BandmemberService,
    private userService: UserdataService,
    private bandService: BandService,
    private route: Router,
    private postService: PostService,
    private postConvert: StringconversionService,
    private modalService: MdbModalService,
    private commentService: CommentService,
    private loginService: LoginService)
    {
      this.router.params.subscribe(params => {
        this.bandTitle = params['band'];
      });
    }

  modalRef: MdbModalRef<CreateBandPostComponent> | null = null;

  bandmembers: User[] = [];
  currBand: Band = {
    id: 0,
    title: '',
    description: '',
    memberLimit: 0
  };

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
  };

  currUser!: User;
  bandTitle!: string;
  posts: Post[] = [];
  comments: Array<Comments> = [];
  commentsNameArray: Array<string> = [];
  opacity: string = "100%";
  hasLiked: boolean = false;

  ngOnInit(): void {
    this.currUser = this.userService.GetUser();
    this.bandService.getBandDetails(this.bandTitle).subscribe((message) => {
      this.currBand = message;
      this.bandmemberService.getAllBandMems(this.currBand.id).subscribe((res) => {
        this.bandmembers = res;
        this.postService.getPostsByBandId(this.currBand.id).subscribe(res => {
          this.posts = res;
          for(let i = 0; i < this.posts.length; i++)
          {
            this.posts[i].entry = this.postConvert.ChangeCharacter(this.posts[i].entry);
            console.log(this.posts.length);
          }
        });
      });
    });
  }

  showUsername(userId: number) {
    console.log(userId);
    if(userId === this.currUser.id) {
      return this.currUser.username;
    } else {
      const index = this.bandmembers.findIndex(mem => mem.id === userId)
      return this.bandmembers[index].username;
    }
  }

  openPostModal() {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CreateBandPostComponent, {
      modalClass: 'modal-dialog-centered',
      data: { postCurrBand: this.currBand }
    })
    this.modalRef.onClose.subscribe((message) => {
      this.opacity = "100%";
      this.ngOnInit();
    });
  }

  goToProfile(user: User) {
    if(this.currUser.id === user.id)
    {
      this.route.navigate(['userprofile']);
    }
    else
    {
      this.route.navigate(['otherprofile', user.id]);
    }
  }

  leaveBand() {
    this.bandmemberService.getBandMember(this.currUser.id).subscribe((res) => {
      this.bandmemberService.removeBandMem(res.id).subscribe((res) => {
        this.currBand.memberLimit += 1;
        this.bandService.updateBand(this.currBand).subscribe((res) => {
          this.bandmemberService.getAllBandMems(this.currBand.id).subscribe((message) => {
            if (message.length > 0) {
              this.route.navigate(['bandPage']);
            }
            else
            {
              this.bandService.removeBand(this.currBand.id).subscribe((res) => {
                this.route.navigate(['bandPage']);
              });
            }
          });
        });
      });
    });
  }

  checkIfLiked(postId: number) {
    return false;
  }

  GetPostID(id: number)
  {

    // console.log(`${id}, ${this.userData.GetUser().id}`);

    this.postService.putLikePost(id, this.currUser.id).subscribe((res) =>{
        this.postService.getPostById(id).subscribe(result =>
          {
            this.posts.find((obj) => {
              if(obj.id === id)
              {
                obj.likes = result.likes;
              }
            });
          });
    });
  }

  showComment(id: number)
  {
    this.postService.getPostById(id).subscribe(result => {
      this.posts.find((obj) => {
        if (obj.id === id)
        {
          this.post = obj;

          if (this.post.showComments == false)
            this.post.showComments = true;
          else if (this.post.showComments == true)
            this.post.showComments = false;
        }
      });
    });
  }

  showComments(id: number) {
    this.commentsNameArray = [];
    this.comments = [];
    this.commentService.getAllComments(id).subscribe(results => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].entry != "") {
          this.comments.push(results[i]);

          this.loginService.otherUserProfile(results[i].userId).subscribe(res => {
            this.commentsNameArray.push(res.username);
          })
        }
      }
    })
  }

}
