import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }

  updateUserData(editUser : User): Observable<any> {
    return this.http.put<User>(`${environment.apBaseURL}/User`, editUser);
  }
}
