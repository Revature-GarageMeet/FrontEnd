import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';
import { StringconversionService } from '../services/stringconversion.service';
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
    user: User = {
      id: -1,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      bio: ''
    }
  
  
  private initPosts: Array<Post> = new Array<Post>();
  @Input() like!: number;
  @Output() likeChange = new EventEmitter<number>();
  clickedIndex: number = 0;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService,
    private postConvert: StringconversionService) { }
  postType: string ='';
  userId: number = 0;
  posts: Array<Post> = [];

  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    
    this.user = this.userData.GetUser();
    console.log(this.user.id);
    

    // this.postService.getUserPost(this.userId).subscribe((res: {results: Array<Post>;})=>{ console.log(res); this.posts = res;
    //   for(let i = 0; i < this.posts.length; i++)
    //     {
    //       this.posts[i].entry = this.posts[i].entry.replaceAll(`[ENTER]`, '\n');
    //       // console.log(this.posts[i]);
    //       this.postService.getPostById(this.posts[i].id).subscribe(result => {this.like = result.likes; this.likeChange.emit(this.like);});
    //     }
    // });    
    this.postService.getUserPost(11).subscribe(res => {
      this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
      {
        //this.posts[i].entry = this.posts[i].entry.replaceAll(`[ENTER]`, '\n');
        this.posts[i].entry = this.postConvert.ChangeCharacter(this.posts[i].entry);
        //console.log(this.posts[i].entry);
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

  public GetUser(): User
  {
    return this.userData.GetUser();
  }

  GetPostID(id: number)
  {
    
    console.log(`${id}, ${this.userData.GetUser().id}`);
    
    this.postService.putLikePost(id, this.user.id).subscribe((res) =>{
        this.postService.getPostById(id).subscribe(result =>
          {
            this.like = result.likes; this.likeChange.emit(this.like);
            this.posts.find((obj) => {
              if(obj.id === id)
              {
                obj.likes = this.like;
                
              }
            });
          });
    });
    // this.postService.getPostById(id).subscribe(result => 
    //   {
    //     this.like = result.likes; this.likeChange.emit(this.like);
    //     this.posts.find((obj) => 
    //     {
    //       if(obj.id === id)
    //       {
    //         obj.likes = this.like;
    //         console.log(obj.likes);
    //       }
    //     });
    //   });
    

  }

  test(postid: number, i: number, posts: Array<Post>): boolean
  {
    console.log((posts.findIndex(x => x.id == postid)) == i);
    return (posts.findIndex(x => x.id == postid)) == i;
  }


  private ChangeCharacters():void
  {
    for(let i = 0; i < this.posts.length; i++)
    {
      this.posts[i].entry.replaceAll("[ENTER]", '\n');
    }
  }


  LikePost(postid: number, userid: number, likes: number)
  {
    let _post = new Post();
    _post.id = postid;
    _post.likes = likes;
    this.postService.SetLikes(_post, userid).subscribe((res) =>{
      console.log(_post);
    });
  }


 

  


}
