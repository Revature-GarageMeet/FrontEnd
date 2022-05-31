import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { Post, Comments } from '../post';
import { PostService } from '../services/post.service';
import { UserdataService } from '../services/userdata.service';
import { StringconversionService } from '../services/stringconversion.service';
import { User } from '../user';
import { CommentService } from '../services/comment.service';
import { BandmemberService } from '../services/bandmember.service';
import { Bandmember } from '../models/bandmember';
import { resourceLimits } from 'worker_threads';
import { Band } from '../models/band';
import { BandService } from '../services/band.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  
    band: Band = 
    {
      id: 0,
      title: "",
      description: "",
      memberlimit: 0
    }

    member: Bandmember = 
    {
      id: 0,
      userId: 0,
      bandId: 0,
      DateJoined: new Date()
    }

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
  
  Meetup: string = "Meetup";
  Venue: string = "Venue Announcement";
  Update: string = "Update";
  LFB: string = "Looking For Band";


  constructor(private formBuilder: FormBuilder, private postService: PostService, private userData: UserdataService, 
    private postConvert: StringconversionService, private commentService: CommentService, private bandMemberService: BandmemberService,
    private bandService: BandService) { }
  postType: string ='';
  userId: number = 0;
  posts: Array<Post> = [];
  comments: Array<Comments> = [];
  displayArray: Array<Post> = [];

  //Going to load new posts here from top of the database --Tucker
  ngOnInit(): void {
    this.user = this.userData.GetUser();   
    
    this.postService.getAllPosts().subscribe(res => {
      this.posts = res;
      for(let i = 0; i < this.posts.length; i++)
      {
        this.posts[i].entry = this.postConvert.ChangeCharacter(this.posts[i].entry);
      }
      this.filterPosts(this.posts, this.user);
    });
  }

  public filterPosts(posts: Array<Post>, user: User)
  {
    this.bandMemberService.getBandMember(user.id).subscribe(res => {
      this.member = res;
      this.bandService.getBandMemberLimit(this.member.bandId).subscribe(result => {
      this.band.memberlimit = result;
      
      let tempArray = this.posts.filter(a => a.bandId == this.member.bandId);
      
      tempArray.forEach(element => {
        this.displayArray.push(element);
      });
            
      if (this.band.memberlimit < 4)
      {
        tempArray = this.posts.filter(a => a.type == this.LFB && a.type != "");
        tempArray.forEach(element => {
          this.displayArray.push(element);
        });
      }

      tempArray = this.posts.filter(a => a.type == this.Venue && a.type != "");
      tempArray.forEach(element => {
        this.displayArray.push(element);
      });

      this.posts = this.displayArray;
      })
    })
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

// public filterPosts(posts: Array<Post>, user: User)
//   {
//     // for(let i = 0; i < this.posts.length; i++)
//     // {
//     //   this.bandMemberService.getBandMember(posts[i].bandId).subscribe(res => {
//     //     this.member = res;
//     //     this.posts.filter((a => a.bandId != this.member.BandId))
//     //   })
//     // }

//     this.bandMemberService.getBandMember(user.id).subscribe(res => {
//       this.member = res;
//       this.bandService.getBandMemberLimit(this.member.bandId).subscribe(result => {
//       this.band.memberlimit = result;

//       console.log(this.member);
//       console.log(this.band.memberlimit);

//       console.log(this.posts)
      
//       let tempArray = this.posts.filter(a => a.bandId == this.member.bandId);
      
//       tempArray.forEach(element => {
//         this.displayArray.push(element);
//       });
      
//       console.log(this.displayArray);
      
//       if (this.band.memberlimit < 4)
//       {
//         tempArray = this.posts.filter(a => a.type == this.LFB && a.type != "");
//         tempArray.forEach(element => {
//           this.displayArray.push(element);
//         });
//       }

//       console.log(this.displayArray);

//       tempArray = this.posts.filter(a => a.type == this.Venue && a.type != "");
//       tempArray.forEach(element => {
//         this.displayArray.push(element);
//       });

//       console.log(this.displayArray);
//       this.posts = this.displayArray;
//       console.log(this.posts);
//       })
      
//     })
//   }
