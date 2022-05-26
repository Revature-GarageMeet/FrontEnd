import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private route: Router,
    private http: HttpClient
  ) { }

  //Registration calls
  existing(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apBaseURL}/User/Existing/${username}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${environment.apBaseURL}/User`, user);
  }

  //Login calls
  loginUser(user: string): Observable<any> {
    return this.http.get<User>(`${environment.apBaseURL}/User/Login/${user}`);
  }
}
