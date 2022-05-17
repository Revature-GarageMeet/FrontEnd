import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'; //interface for the user class ~Leo
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { HttpService } from 'wherever it is';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //constructor(private api: HttpService) {} when we get the http service made
  constructor(private router: Router) { }

  userToCheck: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }
  userToRegister: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  tryToRegister(){
    //needs http calls so imma just pseudocode
    /*
      check if username taken, if not just go

      call if existing

      make new user
    */

      if (this.userToCheck.username == 'test') {
        this.userToCheck.username = 'confirmed';
      }
      else {
        this.userToCheck.username = 'testfailed';
      }
      this.userToCheck.firstname = '';
      this.userToCheck.lastname = '';
      this.userToCheck.email = '';
      this.userToCheck.password = '';

  }

  ngOnInit(): void {
  }

}
