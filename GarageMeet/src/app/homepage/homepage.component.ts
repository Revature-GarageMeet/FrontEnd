import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService) { }
  postType: string ='';
  userId: number = 0;
  posts: any = [];
  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    this.postService.getUserPost(0).subscribe((res: {results: any;})=>{ console.log(res); this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
        {
          this.posts[i].entry = this.posts[i].entry.replaceAll(`[ENTER]`, '\n');
        }
    });    
  }

  public GetPostType(name: string): void {
    this.postType = name;
    console.log(name);
    
  }
  onSubmit(): void
  {

  }

  GetPosts()
  {
  
  }

  GetPostID(id: number)
  {
    this.postService.putLikePost(id).subscribe(results => {
      this.postService.getPostById(id).subscribe(result => { 
        let holdPost: Post = this.posts.find((x: Post) => x.id === id);
        holdPost.likes = result.likes;
      });
    });
  }
}
