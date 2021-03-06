import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, subscribeOn } from 'rxjs';
import { Post, Comments } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';
import { StringconversionService } from '../services/stringconversion.service';
import { User } from '../user';
import { CommentService } from '../services/comment.service';
import { BandmemberService } from '../services/bandmember.service';
import { Bandmember } from '../models/bandmember';
import { resourceLimits } from 'worker_threads';
import { Band } from '../models/band';
import { BandService } from '../services/band.service';
import { LoginService } from '../services/login.service';
import { resolve } from 'dns';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

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

  user: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  Meetup: string = "Meetup";
  Venue: string = "Venue Announcement";
  Update: string = "Update";
  LFB: string = "Looking For Band";


  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService,
    private postConvert: StringconversionService, private commentService: CommentService, private loginService: LoginService, private bandService: BandService, private bandMemberService: BandmemberService) { }
  postType: string = '';
  userId: number = 0;
  posts: Array<Post> = [];
  comments: Array<Comments> = [];
  filteredPosts: Array<Post> = [];
  displayArray: Array<Post> = [];
  nameArray: Array<string> = [];
  unFilteredNameArray: Array<string> = [];
  filteredNameArray: Array<string> = [];
  commentsNameArray: Array<string> = [];

  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    this.user = this.userData.GetUser();
    this.GetAllPost();
  }

  member: Bandmember = {
    id: 0,
    userId: 0,
    bandId: 0,
    dateJoined: new Date()
  }

  public async displayCorrectUsernameForPosts() {
    for (let i = 0; i < this.posts.length; i++) {
      await new Promise<void>(resolve => this.loginService.otherUserProfile(this.posts[i].userId).subscribe(res => {
        this.nameArray.push(res.username);
        this.unFilteredNameArray.push(res.username);
        resolve();
      }));
    }
  }

  public GetPostType(name: string): void {
    this.postType = name;
    console.log(name);

  }
  onSubmit(): void {

  }

  public GetUser(): User {
    return this.userData.GetUser();
  }

  GetPostID(post: Post) {

    console.log(`${post.id}, ${this.userData.GetUser().id}`);
    console.log(post);
    this.postService.SetLikes(post, this.user.id).subscribe((res) => {
      this.postService.getPostById(post.id).subscribe(result => {
        this.posts.find((obj) => {
          if (obj.id === post.id) {
            obj.likes = result.likes;
            console.log(obj.likes)
          }
        });
      });
    });
  }

  showComment(id: number) {
    this.postService.getPostById(id).subscribe(result => {
      this.posts.find((obj) => {
        if (obj.id === id) {
          this.post = obj;

          if (this.post.showComments == false)
            this.post.showComments = true;
          else if (this.post.showComments == true)
            this.post.showComments = false;
        }
      });
    });
  }

  public showComments(id: number) {
    this.commentsNameArray = [];
    this.comments = [];
    this.commentService.getAllComments(id).subscribe(async results => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].entry != "") {
          this.comments.push(results[i]);

          await new Promise<void>(resolve => this.loginService.otherUserProfile(results[i].userId).subscribe(res => {
            this.commentsNameArray.push(res.username);
            resolve();
          }))
        }
      }
    })
  }

  LikePost(postid: number, userid: number, likes: number) {
    let _post = new Post();
    _post.id = postid;
    _post.likes = likes;
    this.postService.SetLikes(_post, userid).subscribe((res) => {
      console.log(_post);
    });
  }

  // ==========================================
  //
  //          GETTING ALL POST THEN
  //        FILTERING BY USER RELEVANCE
  //         Authors: Jose M, Brandon C
  //
  // ==========================================

  userFilteredPosts: Array<Post> = [];
  unFilteredPosts: Array<Post> = [];

  currentUserBandMember: Bandmember = {
    id: 0,
    userId: 0,
    bandId: 0,
    dateJoined: new Date()
  }

  band: Band = {
    id: 0,
    title: '',
    description: '',
    memberLimit: 0
  }

  GetUserBandID(): void {
    this.bandMemberService.getBandMember(this.user.id).subscribe(res => {
      if (!res) { // USER IS NOT IN A BAND
        this.GetRelevantPost(0);
      }
      else { // USER IS IN A BAND
        this.currentUserBandMember = res;
        this.GetBandLimit(res.bandId);
      }
    });
  }


  GetBandLimit(bandid: number): void {
    this.bandService.getBandMemberLimit(bandid).subscribe(res => {
      this.band.memberLimit = res;
      this.GetRelevantPost(res);
    });
  }

  GetRelevantPost(memberlimit: number): void {
    let tempArray = this.unFilteredPosts.filter(a => a.bandId == 0); //this.currentUserBandMember.bandId);

    tempArray.forEach(element => {
      this.userFilteredPosts.push(element);
    });

    if (memberlimit < 4) {
      tempArray = this.unFilteredPosts.filter(a => a.type == this.LFB && a.type != "" && a.userId != 0);
      tempArray.forEach(element => {
        this.userFilteredPosts.push(element);
      });
    }

    tempArray = this.unFilteredPosts.filter(a => a.type == this.Venue && a.type != "" && a.userId != 0);
    tempArray.forEach(element => {
      this.userFilteredPosts.push(element);
    });

    this.posts = this.userFilteredPosts;
    this.displayCorrectUsernameForPosts();
  }

  GetAllPost(): void {
    this.postService.getAllPosts().subscribe(res => {
      this.unFilteredPosts = res;
      for (let i = 0; i < this.unFilteredPosts.length; i++) {
        this.unFilteredPosts[i].entry = this.postConvert.ChangeCharacter(this.unFilteredPosts[i].entry);
      }
      this.GetUserBandID();
    });
  }

  // ==========================================
  //
  //        FILTERING BY POST TYPE
  //                Jose M
  //
  // ==========================================

  selectedMeetup: boolean = false;
  selectedVenue: boolean = false;
  selectedUpdate: boolean = false;
  selectedLooking: boolean = false;

  activeColor: string = 'rgba(211, 211, 211, 0.5)';
  notActiveColor: string = 'transparent';

  meetupColor: string = this.notActiveColor;
  venueColor: string = this.notActiveColor;
  updateColor: string = this.notActiveColor;
  lookingColor: string = this.notActiveColor;

  GetColor(type: string): string {
    if (type === 'meetup')
      return this.meetupColor;
    if (type === 'venue')
      return this.venueColor;
    if (type === 'update')
      return this.updateColor;
    if (type === 'looking')
      return this.lookingColor;
    return 'transparent';
  }

  SelectedFilter(type: string): void {
    if (type === 'meetup') {
      if (this.selectedMeetup) {
        this.selectedMeetup = !this.selectedMeetup;
        this.meetupColor = this.notActiveColor;
      } else {
        this.selectedMeetup = !this.selectedMeetup;
        this.meetupColor = this.activeColor;
      }
    }
    if (type === 'venue') {
      if (this.selectedVenue) {
        this.selectedVenue = !this.selectedVenue;
        this.venueColor = this.notActiveColor;
      } else {
        this.selectedVenue = !this.selectedVenue;
        this.venueColor = this.activeColor;
      }
    }
    if (type === 'update') {
      if (this.selectedUpdate) {
        this.selectedUpdate = !this.selectedUpdate;
        this.updateColor = this.notActiveColor;
      } else {
        this.selectedUpdate = !this.selectedUpdate;
        this.updateColor = this.activeColor;
      }
    }
    if (type === 'looking') {
      if (this.selectedLooking) {
        this.selectedLooking = !this.selectedLooking;
        this.lookingColor = this.notActiveColor;
      } else {
        this.selectedLooking = !this.selectedLooking;
        this.lookingColor = this.activeColor;
      }
    }
    this.GetFilteredPosts();
  }

  GetFilteredPosts(): void {
    this.filteredPosts = [];
    this.filteredNameArray = [];

    let counter = 0;

    if (this.selectedMeetup || this.selectedVenue || this.selectedUpdate || this.selectedLooking) {
      this.userFilteredPosts.forEach((element) => {
        if (element.type == "Meetup" && this.selectedMeetup) {
          this.filteredPosts.push(element);
          this.filteredNameArray.push(this.unFilteredNameArray[counter]);
        }
        if (element.type == "Venue Announcement" && this.selectedVenue) {
          this.filteredPosts.push(element);
          this.filteredNameArray.push(this.unFilteredNameArray[counter]);
        }
        if (element.type == "Update" && this.selectedUpdate) {
          this.filteredPosts.push(element);
          this.filteredNameArray.push(this.unFilteredNameArray[counter]);
        }
        if (element.type == "Looking For Band" && this.selectedLooking) {
          this.filteredPosts.push(element);
          this.filteredNameArray.push(this.unFilteredNameArray[counter]);
        }
        counter++;
      })
      this.posts = this.filteredPosts;
      this.nameArray = this.filteredNameArray;
    } else {
      this.posts = this.userFilteredPosts;
      this.nameArray = this.unFilteredNameArray;
    }
  }
}
