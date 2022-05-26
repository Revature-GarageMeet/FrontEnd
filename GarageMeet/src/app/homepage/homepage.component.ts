import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user';

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
      postComments: []
    }
  
  private initPosts: Array<Post> = new Array<Post>();
  @Input() like!: number;
  @Output() likeChange = new EventEmitter<number>();
  clickedIndex: number = 0;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService) { }
  postType: string ='';
  userId: number = 0;
  posts: any = [];
  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    
    
    //async for some reason? what the fuck? --Tucker
    this.postService.getUserPost(0).subscribe((res: {results: any;})=>{ console.log(res); this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
        {
          this.posts[i].entry = this.posts[i].entry.replaceAll(`[ENTER]`, '\n');
          // console.log(this.posts[i]);
          this.postService.getPostById(this.posts[i].id).subscribe(result => {this.like = result.likes; this.likeChange.emit(this.like);});
        }
    });    
  }

  public GetPostType(name: string): void{
    this.postType = name;
    console.log(name);
    
  }
  onSubmit(): void
  {

  }

  GetPosts()
  {
    //console.log(this.posts);
  }

  GetPostID(id: number)
  {

    console.log(`${id}, ${this.userData.GetUser()}`);
    
    //this.postService.putLikePost(id).subscribe();
    this.postService.getPostById(id).subscribe(result => {this.like = result.likes; this.likeChange.emit(this.like);});
  }

  test(postid: number, i: number, posts: Array<Post>): boolean
  {
    return (posts.findIndex(x => x.id == postid)) == i;
  }


  private ChangeCharacters():void
  {
    for(let i = 0; i < this.posts.length; i++)
    {
      this.posts[i].entry.replaceAll("[ENTER]", '\n');
    }
  }
}
