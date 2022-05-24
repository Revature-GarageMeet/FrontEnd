import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { Post} from '../post';
import { User } from '../user';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

    returnPost = {
      next: (x: number) => console.log(x),
      error: (err: Error) => console.log(err),
      complete: () => console.log("Complete"),
    };
    
    responseCode: number = 0;
    postuser(post: Post): Observable<HttpResponse<Post>>
    {
      return this.http.post<Post>(`${environment.apBaseURL}/Post/PostForUserId/${post.userId}/${post.entry}/${post.type}`, post, {observe: 'response'})
    }
    


    getPostById(id: number): Observable<HttpResponse<Post>>
    {
      return new Observable<HttpResponse<Post>>();
    }

    getUserPost(userid: number): Observable<any>
    {

     return this.http.get<any>(`${environment.apBaseURL}/Post/GetPostbyUID/${userid}`);
    //  return this.http.get<Array<Post>>(`${environment.apBaseURL}/Post/GetPostbyUID/${userid}`);
    }

    private handleError<T>(operation = 'operation', result?: T)
    {
      return (error: any): Observable<T> =>{
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        
        return of(result as T);
      }
    }

    private log(message: string){
      console.log(message);
    }
}
