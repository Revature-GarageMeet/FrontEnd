import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
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
    private route: Router)
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

  ngOnInit(): void {
    this.loginService.otherUserProfile(this.userId).subscribe((res) => {
      this.profUser = res;
      this.postData.getUserPost(this.profUser.id).subscribe(res => {
        this.posts = res;
        for(let i = 0; i < this.posts.length; i++)
        {
          this.posts[i].entry = this.entryChange.ChangeCharacter(this.posts[i].entry);
        }
        if(this.posts.length > 0) {
          this.hasNoPosts = false
        }
      });
    });
  }



}
