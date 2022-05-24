import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  isSubmitted : boolean = false;

  userPost = this.formBuilder.group({
    type: '',
    text: '',
    userId: 0,
  });
  private response: number = 0;

  private post: Post = new Post();
  postType: string ='';

  constructor(private formBuilder: FormBuilder, private postService: PostService, http: HttpClient, private userdata: UserdataService) { }

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
    this.post.userId = this.userdata.GetUser().id;
    this.post.entry = document.getElementById("postText")!.innerText;
    console.log("Post: " + this.post.entry);
    this.post.type = this.userPost.value.type;
    this.ChangeCharacters();
    //console.log(this.userPost.value);
    
      this.postService.postuser(this.post).subscribe((res) => {
        console.log(res.status);
        this.response = res.status;
      });

      //response is between 200-299 (success)
      
  }

  //  addPokemon() {
  //    this.pokemonService.getPokemonById(this.pokemonId).subscribe((res) => {
  //      this.pokemonRetrieved.emit(res.body!); // Trigger an actual pokemonRetrieved event, where the object will represent
  //      // an actual Pokemon
  //    });
  //  }



  private ChangeCharacters(): void
  {
    //#region replace spaces
    this.post.entry = this.post.entry.replaceAll(' ', '%20');
    this.post.entry = this.post.entry.replaceAll('\n', '[ENTER]' );
    this.post.type = this.post.type.replaceAll(' ', '%20');
    //#endregion
  }

  public GetCode(): number
  {
    return this.response;
  }

  public GetType(): string
  {
    return this.postType;
  }
  public CheckPost(): boolean
  {
    
    if (this.userPost.value.type != null || this.userPost.value.text != null || this.userPost.value.userId != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
