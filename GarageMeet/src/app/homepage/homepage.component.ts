import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../services/post.service';

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

  constructor(private formBuilder: FormBuilder, private postService: PostService) { }
  postType: string ='';

  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    this.postService.getuserposts().subscribe((data: any) =>
    {
      console.log(data);
      
    });
    
  }

  public GetPostType(name: string): void{
    this.postType = name;
    console.log(name);
    
  }
  onSubmit(): void
  {

  }
}
