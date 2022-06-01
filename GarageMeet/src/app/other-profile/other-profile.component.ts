import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { BandmemberService } from '../services/bandmember.service';
import { LoginService } from '../services/login.service';
import { PostService } from '../services/post.service';
import { StringconversionService } from '../services/stringconversion.service';
import { User } from '../user';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private loginService: LoginService,
    private postData: PostService,
    private entryChange: StringconversionService,
    private route: Router,
    private bandMemService: BandmemberService)
  { // Grabbing user ID passed from band page when clicking on a member's name
    this.router.params.subscribe(params => {
      this.userId = params['userN'];
    });
  }

  userId!: number;
  profUser: User = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  };
  posts: Array<Post> = [];
  hasNoPosts: boolean = true;
  inABand!: boolean;

  ngOnInit(): void {
    this.loginService.otherUserProfile(this.userId).subscribe((res) => {
      this.profUser = res;
      this.postData.getUserPost(this.profUser.id).subscribe(res => {
        this.posts = res;
        this.posts = this.posts.filter(post => post.type != "Band");
        for(let i = 0; i < this.posts.length; i++)
        {
          this.posts[i].entry = this.entryChange.ChangeCharacter(this.posts[i].entry);
        }
        if(this.posts.length > 0) {
          this.hasNoPosts = false
        }
        this.bandMemService.isInABand(this.profUser.id).subscribe((message) => {
          this.inABand = message;
        });
      });
    });
  }



}
