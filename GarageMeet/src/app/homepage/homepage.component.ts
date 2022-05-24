import { Component, OnInit } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService) { }
  postType: string ='';
  userId: number = 0;
  posts: any = [];
  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    
    
    //async for some reason? what the fuck? --Tucker
    this.postService.getUserPost(0)
    .subscribe((res: {results: any;})=>{
      console.log(res);
      this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
        {
          this.posts[i].entry = this.posts[i].entry.replaceAll(`[ENTER]`, '\n');
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

  GetPosts()
  {
    //console.log(this.posts);
  }

  GetPostID(id: number)
  {
    console.log(`${id}, ${this.userData.GetUser()}`);
  }


  private ChangeCharacters():void
  {
    for(let i = 0; i < this.posts.length; i++)
    {
      this.posts[i].entry.replaceAll("[ENTER]", '\n');
    }
  }
}
