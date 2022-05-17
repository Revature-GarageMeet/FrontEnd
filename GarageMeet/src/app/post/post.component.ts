import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  userPost = this.formBuilder.group({
    type: '',
    text: '',
    userId: 0,
  });
  private post: Post = new Post();
  postType: string ='';

  constructor(private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
    
  }

  public GetPostType(name: string): void{
    this.postType = name;
    
  }
  
  private SetPostType(name: string)
  {
    this.userPost.value.type = name;
  }

  public onSubmit(): void
  {
    //No current user ID, as the site does not currently detect if user is logged in --Tucker
    this.SetPostType(this.postType);
    this.post.userId = this.userPost.value.userId;
    this.post.text = this.userPost.value.text;
    this.post.type = this.userPost.value.type;
    this.ChangeCharacters();
    console.log(this.userPost.value);
    this.postService.postuser(this.post).subscribe();
    
  }

  private ChangeCharacters(): void
  {
    //#region replace spaces
    this.post.text = this.post.text.replaceAll(' ', '%20');
    this.post.type = this.post.type.replaceAll(' ', '%20');
    //#endregion
  }

}
