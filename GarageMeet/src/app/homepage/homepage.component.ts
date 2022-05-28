import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';
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
  
  blah: string = "Looking For Band";

  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService, 
    private postConvert: StringconversionService, private commentService: CommentService) { }
  postType: string ='';
  userId: number = 0;
  posts: Array<Post> = [];
  comments: Array<Comments> = [];

  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    
<<<<<<< HEAD
    this.user = this.userData.GetUser();   
    this.postService.getUserPost(this.user.id).subscribe(res => {
=======
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
>>>>>>> main
      this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
      {
        this.posts[i].entry = this.postConvert.ChangeCharacter(this.posts[i].entry);
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
    this.stuff(id);  
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

  stuff(id: number)
  {
    this.comments = [];
    this.commentService.getAllComments(id).subscribe(results => {
      for(let i = 0; i < results.length; i++)
      {
        if(results[i].entry != "")
        {
          this.comments.push(results[i]);
        }
      }
    })
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
