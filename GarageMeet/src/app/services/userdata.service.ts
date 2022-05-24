import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private user: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }
  constructor() { }

  GetUser(): User
  {
    this.user.id =  parseInt(sessionStorage.getItem('localUserId')!, 10);
     this.user.username = sessionStorage.getItem('localUserUserName')!;
     this.user.firstname = sessionStorage.getItem('localUserFirstName')!;
     this.user.lastname = sessionStorage.getItem('localUserLastName')!;
     this.user.email = sessionStorage.getItem('localUserEmail')!;
     this.user.bio = sessionStorage.getItem('localUserBio')!;
     return this.user;
  }

  SetUser(_id: number, _username: string, _firstname: string, _lastname: string, _email: string, _bio: string)
  {
    this.user.id = _id;
    console.log(`${this.user.id} ${_id}`);
    this.user.username = _username;
    this.user.firstname = _firstname;
    this.user.lastname = _lastname;
    this.user.email = _email;
    this.user.bio = _bio;
    sessionStorage.setItem('localUserId', `${this.user.id}`);
    
    sessionStorage.setItem('localUserUserName', `${this.user.username}`);
    sessionStorage.setItem('localUserFirstName', `${this.user.firstname}`);
    sessionStorage.setItem('localUserLastName', `${this.user.lastname}`);
    sessionStorage.setItem('localUserEmail', `${this.user.email}`);
    sessionStorage.setItem('localUserBio', `${this.user.bio}`);
  }
}
