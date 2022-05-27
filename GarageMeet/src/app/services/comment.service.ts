import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  // Adding comment to postId
  addComment(comment: Partial<Comments>, postId: number): Observable<unknown> {
    return this.http.post(`http://garagemeet.azurewebsites.net/Comment/AddComment/${postId}`, comment);
  }

  // Getting comment from commentId
  getComment(commentId: number): Observable<HttpResponse<Comments>> {
    return this.http.get<Comments>(`http://garagemeet.azurewebsites.net/Comment/GetComment/${commentId}`, {
      'observe': 'response'
    });
  }

  // Getting all comments from postId
  getAllComments(postId: number): Observable<HttpResponse<any>> {
    return this.http.get<Comments>(`http://garagemeet.azurewebsites.net/Comment/GetAllComments/${postId}`, {
      'observe': 'response'
    });
  }

  // Updating comment
  updateComment(comment: Partial<Comments>): Observable<unknown> {
    return this.http.put('http://garagemeet.azurewebsites.net/Comment/UpdateComment', comment);
  }
}