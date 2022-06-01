import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';

import { catchError } from 'rxjs';
import { User } from '../models/user';
import { map, tap } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { NumberValueAccessor } from '@angular/forms';

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

    createBandPost(post: Post): Observable<any>
    {
      return this.http.post(`${environment.apBaseURL}/Post/PostForBandMembers/${post.bandId}/${post.entry}/${post.userId}`, post);
    }

    getPostById(id: number): Observable<Post>
    {
      //console.log(id);
      return this.http.get<Post>(`${environment.apBaseURL}/Post/GetPostByPostID/${id}`);
    }

    getPostsByBandId(bandId: number): Observable<Post[]>
    {
      return this.http.get<Post[]>(`${environment.apBaseURL}/Post/GetPostByBandID/${bandId}`);
    }

    getUserPost(userid: number): Observable<Post[]>
    {

     return this.http.get<Post[]>(`${environment.apBaseURL}/Post/GetPostbyUID/${userid}`);
    //  return this.http.get<Array<Post>>(`${environment.apBaseURL}/Post/GetPostbyUID/${userid}`);
    }

    getAllPosts(): Observable<Post[]>
    {
      return this.http.get<Post[]>(`${environment.apBaseURL}/Post/GetAllPosts`)
    }

    putLikePost(postId: number, userId: number)
    {
      return this.http.put(`${environment.apBaseURL}/Post/LikePost/${postId}/${userId}`, postId);
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


    GetLikes(postid: number): Observable<any>
    {
      return this.http.get<Post>(`${environment.apBaseURL}/Post/GetPostByPostID/${postid}`);
    }

    SetLikes(_post: Post, userid: number): Observable<any>
    {
      return this.http.put<Post>(`${environment.apBaseURL}/Post/LikePost/${_post.id}/${userid}`, _post);
    }



}
