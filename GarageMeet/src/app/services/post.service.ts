import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Post} from '../post';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


    postuser(post: Post)
    {
      return this.http.post<Post>(`${environment.apBaseURL}/Post/PostForUserId/${post.userId}/${post.entry}/${post.type}`, post);
    }
    
    getuserposts()
    {
      //2 IS JUST A PLACEHOLDER --Tucker
      return this.http.get<Array<Post>>(`${environment.apBaseURL}/Post/GetPostbyUID/2`);
    }



}
