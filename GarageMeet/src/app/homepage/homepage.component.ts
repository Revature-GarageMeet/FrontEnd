import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, subscribeOn } from 'rxjs';
import { Post, Comments } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';
import { StringconversionService } from '../services/stringconversion.service';
import { User } from '../user';
import { CommentService } from '../services/comment.service';

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
    private postConvert: StringconversionService, private commentService: CommentService) { }
  postType: string = '';
  userId: number = 0;
  posts: Array<Post> = [];
  comments: Array<Comments> = [];
  filteredPosts: Array<Post> = [];

  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    this.user = this.userData.GetUser();
    this.postService.getUserPost(this.user.id).subscribe(res => {
      this.posts = res;
      this.filteredPosts = res;
      for (let i = 0; i < this.posts.length; i++) {
        this.posts[i].entry = this.postConvert.ChangeCharacter(this.posts[i].entry);
      }
    });
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

  GetPostID(id: number) {

    console.log(`${id}, ${this.userData.GetUser().id}`);

    this.postService.putLikePost(id, this.user.id).subscribe((res) => {
      this.postService.getPostById(id).subscribe(result => {
        this.posts.find((obj) => {
          if (obj.id === id) {
            obj.likes = result.likes;
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

  stuff(id: number) {
    this.comments = [];
    this.commentService.getAllComments(id).subscribe(results => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].entry != "") {
          this.comments.push(results[i]);
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
    // refactor to use filter
    this.filteredPosts = [];

    if (this.selectedMeetup || this.selectedVenue || this.selectedUpdate || this.selectedLooking) {
      console.log("at least one selected! filtering!");
      this.posts.forEach((element) => {
        if (element.type == "Meetup" && this.selectedMeetup)
          this.filteredPosts.push(element);
        if (element.type == "Venue Announcement" && this.selectedVenue)
          this.filteredPosts.push(element);
        if (element.type == "Update" && this.selectedUpdate)
          this.filteredPosts.push(element);
        if (element.type == "Looking For Band" && this.selectedLooking)
          this.filteredPosts.push(element);
      })
      console.log(this.filteredPosts);
    } else {
      console.log("none selected");
      this.filteredPosts = this.posts;
    }
  }
}
